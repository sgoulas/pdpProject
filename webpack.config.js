const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"), //https://stackoverflow.com/questions/35048686/whats-the-difference-between-path-resolve-and-path-join
    clean: true, // clean dist folder before each build
  },
  resolve: { modules: [path.resolve(__dirname, "src"), "node_modules"] }, // so that we can import anything from the src folder in relative paths rather than the absolute ones
  devServer: { contentBase: path.join(__dirname, "src") }, // tells the webpack-dev-server what files are needed to be served. Everything from our src folder needs to be served
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"), // the html-webpack-plugin tells the server that the index.bundle.js should be injected to our index.html file
    }),
  ],
};
