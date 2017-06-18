const webpack = require("webpack");
const path = require("path");

const outputPath = path.resolve("dll");

module.exports = {
  devtool: "source-map",
  entry: {
    react: ["react", "react-dom"],
    reactContrib: ["react-hot-loader"]
  },

  output: {
    filename: "[name].dll.js",
    path: outputPath,
    library: "[name]_dll"
  },

  plugins: [
    new webpack.DllPlugin({
      path: "dll/[name]-manifest.json",
      name: "[name]_dll"
    })
  ]
};
