const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ["react-hot-loader/patch", "./src/index"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css",
      disable: process.env.NODE_ENV === "development"
    })
  ],
  devServer: {
    hot: true
  }
};
