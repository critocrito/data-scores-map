require("@babel/register")({
  babelrc: false,
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-flow",
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-transform-flow-strip-types",
    "@babel/plugin-syntax-flow",
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: true}],
    "@babel/plugin-proposal-object-rest-spread",
    "syntax-trailing-function-commas",
    "istanbul",
  ],
});
