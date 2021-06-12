const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: { contentBase: path.join(__dirname, "src") }, // tells the webpack-dev-server what files are needed to be served. Everything from our src folder needs to be served,
  devtool: "eval-source-map",
});
