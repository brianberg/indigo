const path    = require("path");
const webpack = require("webpack");
// Plugins
const CleanWebpackPlugin       = require("clean-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry  : {
    app : "./src/index.tsx",
  },
  output : {
    filename : "bundle.js",
    path     : path.join(__dirname, "dist"),
  },

  // Enable souremaps for debugging webpack's output
  devtool   : "source-map",
  devServer : {
    contentBase        : __dirname,
    historyApiFallback : true,
    hot                : true,
  },

  resolve : {
    // Add '.ts' and '.tsx' as resolvable extensions
    extensions : [ ".ts", ".tsx", ".js", ".json" ],
  },

  module : {
    rules : [
      {
        test   : /\.tsx?$/,
        loader : [ "awesome-typescript-loader" ],
      },
      {
        test   : /\.(png|jpg|gif|svg)$/,
        loader : "file-loader",
      },
      {
        test : /\.scss$/,
        use  : ExtractTextWebpackPlugin.extract({
          use      : [ "css-loader", "sass-loader" ],
          fallback : "style-loader",
        }),
      },
      // All output '.js' files will have any sourcemaps
      // re-processed by 'source-map-loader'.
      {
        enforce : "pre",
        test    : /\.js$/,
        exclude : /data/,
        loader  : "source-map-loader",
      },
    ],
    loaders : [
      {
        test    : /\.json$/,
        loader  : "json",
      },
    ],
  },
  
  plugins : [
    new ExtractTextWebpackPlugin("styles.css"),
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries
  // between builds
  externals : {
    "react"     : "React",
    "react-dom" : "ReactDOM",
  },
}