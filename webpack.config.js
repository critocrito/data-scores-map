import fs from "fs";
import {join} from "path";
import url from "url";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import HtmlWebPackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import CopyPlugin from "webpack-copy-plugin";
import escapeStringRegexp from "escape-string-regexp";
import {DefinePlugin} from "webpack";
import {homepage} from "./package.json";

class InterpolateHtmlPlugin {
  constructor(replacements) {
    this.replacements = replacements;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("InterpolateHtmlPlugin", compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
        "InterpolateHtmlPlugin",
        data => {
          // Run HTML through a series of user-specified string replacements.
          Object.keys(this.replacements).forEach(key => {
            const value = this.replacements[key];
            // eslint-disable-next-line no-param-reassign
            data.html = data.html.replace(
              new RegExp(`%${escapeStringRegexp(key)}%`, "g"),
              value,
            );
          });
        },
      );
    });
  }
}

const ensureSlash = path => {
  const hasSlash = path.endsWith("/");
  if (hasSlash) return path;
  return `${path}/`;
};

const {NODE_ENV} = process.env;
if (!NODE_ENV) {
  throw new Error(
    "The NODE_ENV environment variable is required but was not specified.",
  );
}

const dotenvFiles = [
  `.env.${NODE_ENV}.local`,
  `.env.${NODE_ENV}`,
  NODE_ENV !== "test" && ".env.local",
  ".env",
].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand(
      dotenv.config({
        path: dotenvFile,
      }),
    );
  }
});

const servedUrl = ensureSlash(
  process.env.PUBLIC_URL || (homepage ? url.parse(homepage).pathname : "/"),
);

const getClientEnvironment = publicUrl => {
  const REACT_APP = /^REACT_APP_/i;
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => Object.assign({}, env, {[key]: process.env[key]}), {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: process.env.NODE_ENV || "development",
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      PUBLIC_URL: publicUrl,
    });
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    "process.env": Object.keys(raw).reduce(
      (env, key) => Object.assign({}, env, {[key]: JSON.stringify(raw[key])}),
      {},
    ),
  };
  return {raw, stringified};
};

const appEnv = getClientEnvironment(servedUrl);

module.exports = {
  bail: true,
  entry: ["./src/client.js"],
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
  },
  devServer: {
    contentBase: join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  module: {
    noParse: [/dtrace-provider/, /source-map-support/],
    rules: [
      {
        oneOf: [
          {
            test: /\.bmp$|\.gif$|\.jpe?g$|\.png$|\.svg$/,
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              babelrc: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {minimize: true},
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader?url=false", // Append url=false to make leaflet render correctly.
          "postcss-loader",
        ],
      },
      {
        loader: "file-loader?name=[name].[ext]",
        test: /\.json$|\.ico$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      dirs: [
        {from: "./public", to: "./dist"},
        // This was the only way to make the leaflet marker icons load.
        {from: "./public/images", to: "./dist/static/css/images"},
      ],
      options: {},
    }),
    new HtmlWebPackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new InterpolateHtmlPlugin(appEnv.raw),
    new DefinePlugin(appEnv.stringified),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash:8].css",
      chunkFilename: "static/css/[name].[chunkhash:8].css",
    }),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
    }),
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    leaflet: "L",
  },
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
};
