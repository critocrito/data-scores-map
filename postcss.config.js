const autoprefixer = require("autoprefixer");
const atImport = require("postcss-import");
const assets = require("postcss-assets");

module.exports = {
  plugins: [assets, atImport, autoprefixer],
};
