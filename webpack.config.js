const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8080;
const sourcePath = path.join(__dirname, "./src");
const buildDirectory = path.join(__dirname, "./dist");

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: "\u001b[32m"
  }
};

module.exports = function(env) {
  const nodeEnv = env && env.prod ? "production" : "development";
  const isProd = nodeEnv === "production";

  const htmlTemplate = isProd ? "index.prod.ejs" : "index.dev.ejs";
  const publicPath = isProd ? "/cv/" : "/";
  let cssLoader;

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2
    }),

    // setting production environment will strip out
    // some of the development code from the app
    // and libraries
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(nodeEnv) }
    }),

    // create css bundle
    new ExtractTextPlugin("style-[contenthash:8].css"),

    // create index.html
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      inject: true
    }),

    // make sure script tags are async to avoid blocking html render
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async"
    }),

    // preload chunks
    new PreloadWebpackPlugin()
  ];

  if (isProd) {
    plugins.push(
      // minify remove some of the dead code
      new UglifyJSPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        }
      })
    );

    cssLoader = ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: "css-loader",
          options: {
            //module: true, // css-loader 0.14.5 compatible
            //modules: true,
            localIdentName: "[hash:base64:5]"
          }
        },
        {
          loader: "sass-loader",
          options: {
            outputStyle: "collapsed",
            sourceMap: true,
            includePaths: [sourcePath]
          }
        }
      ]
    });
  } else {
    plugins.push(
      // make hot reloading work
      new webpack.HotModuleReplacementPlugin(),
      // show module names instead of numbers in webpack stats
      new webpack.NamedModulesPlugin(),
      // don't spit out any errors in compiled assets
      new webpack.NoEmitOnErrorsPlugin(),
      // load DLL files
      /* eslint-disable global-require */
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("./dll/react-manifest.json")
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("./dll/reactContrib-manifest.json")
      }),
      /* eslint-enable global-require */

      // make DLL assets available for the app to download
      new AddAssetHtmlPlugin([
        { filepath: require.resolve("./dll/react.dll.js") },
        { filepath: require.resolve("./dll/reactContrib.dll.js") }
      ])
    );

    cssLoader = [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader",
        options: {
          //module: true,
          localIdentName: "[path][name]-[local]"
        }
      },
      {
        loader: "sass-loader",
        options: {
          outputStyle: "expanded",
          sourceMap: false,
          includePaths: [sourcePath]
        }
      }
    ];
  }

  const entryPoint = isProd
    ? "./index.js"
    : [
        // activate HMR for React
        "react-hot-loader/patch",

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        `webpack-dev-server/client?http://${host}:${port}`,

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        "webpack/hot/only-dev-server",

        "./index.js"
      ];

  return {
    devtool: isProd ? "source-map" : "cheap-module-source-map",
    context: sourcePath,
    entry: {
      main: entryPoint
    },
    output: {
      path: buildDirectory,
      publicPath: publicPath,
      filename: "[name]-[hash:8].js",
      chunkFilename: "[name]-[chunkhash:8].js"
    },
    module: {
      rules: [
        {
          test: /\.(html|svg|jpe?g|png|ttf|woff2?)$/,
          exclude: /node_modules/,
          use: {
            loader: "file-loader",
            options: {
              name: "static/[name]-[hash:8].[ext]"
            }
          }
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: cssLoader

          //loader: "style-loader!css-loader!sass-loader"
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        }
      ]
    },
    resolve: {
      extensions: [
        ".webpack-loader.js",
        ".web-loader.js",
        ".loader.js",
        ".js",
        ".jsx"
      ],
      modules: [path.resolve(__dirname, "node_modules"), sourcePath]
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 300000,
      maxEntrypointSize: 300000,
      hints: "warning"
    },

    stats: stats,

    devServer: {
      contentBase: "./src",
      publicPath: "/",
      historyApiFallback: true,
      port: port,
      host: host,
      hot: !isProd,
      compress: isProd,
      stats: stats
    }
  };
};
