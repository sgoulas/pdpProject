const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"), //https://stackoverflow.com/questions/35048686/whats-the-difference-between-path-resolve-and-path-join
    clean: true, // clean dist folder before each build
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"], // so that we can import anything from the src and node_modules folders in relative paths rather than the absolute ones
    extensions: [".tsx", ".ts", ".js"], //Attempt to resolve these extensions in order. If multiple files share the same name but have different extensions, webpack will resolve the one with the extension listed first in the array and skip the rest.
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"), // the html-webpack-plugin tells the server that the index.bundle.js should be injected to our index.html file
    }),
  ],
  module: {
    rules: [
      // which loaders to use for specific file types
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
};
