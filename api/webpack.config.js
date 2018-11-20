const path = require('path');
var NpmInstallPlugin = require("npm-install-webpack-plugin");
var StartServerPlugin = require("start-server-webpack-plugin");
var webpack = require("webpack");

module.exports = {
  devtool: "inline-sourcemap",

  entry: {
    server: [
     "webpack/hot/poll?1000",
      "./src/server.js",
    ],
  },

  externals: [
    // Every non-relative module is external
    /^[a-z\-0-9]+$/,
  ],

  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },

  node: {
    __filename: true,
    __dirname: true,
  },

  output: {
    chunkFilename: "[id].[hash:5]-[chunkhash:7].js",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    filename: "[name].js",
    libraryTarget: "commonjs2",
    path:     path.join(__dirname, './server-bundle'),
  },

  plugins: [
    new StartServerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  target: "async-node",
};