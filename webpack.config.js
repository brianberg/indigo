const path    = require("path");
const glob    = require("glob");
const webpack = require("webpack");

// Plugins
const CleanWebpackPlugin        = require("clean-webpack-plugin");
const CopyWebpackPlugin         = require("copy-webpack-plugin");
const ExtractTextWebpackPlugin  = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin         = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const WriteFilePlugin           = require("write-file-webpack-plugin");

// const extractAppStyles    = new ExtractTextWebpackPlugin("[name].[hash].css");
// const extractVendorStyles = new ExtractTextWebpackPlugin("vendor.[hash].css");

module.exports = {
  entry  : [
    // TODO add hot loader support
    // "react-hot-loader/patch",
    // "webpack/hot/only-dev-server",
    "./src/index.tsx",
  ],
  output : {
    filename : "[name].[hash].js",
    path     : path.join(__dirname, "dist"),
  },

  // Enable souremaps for debugging webpack's output
  devtool   : "source-map",
  devServer : {
    contentBase        : path.join(__dirname, "dist"),
    historyApiFallback : true,
    // TODO add hot loader support
    // hot             : true,
  },

  resolve : {
    // Add '.ts' and '.tsx' as resolvable extensions
    extensions : [ ".ts", ".tsx", ".js" ],
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
        test    : /\.scss$/,
        include : path.join(__dirname, "src"),
        use     : ExtractTextWebpackPlugin.extract({
          use      : [
            "css-loader",
            {
              loader  : "sass-loader",
              options : {
                includePaths : ['node_modules', 'node_modules/@material/*']
                  .map((d) => path.join(__dirname, d))
                  .map((g) => glob.sync(g))
                  .reduce((a, c) => a.concat(c), []),
                importer : function(url, prev) {
                  if(url.indexOf("~@material") === 0) {
                    const filePath = url.split("~@material")[1];
                    const nodeModulePath = `./node_modules/@material/${filePath}`;
                    return { file : path.resolve(nodeModulePath) };
                  }
                  return { file : url };
                }
              }
            }
          ],
          fallback : "style-loader",
        }),
      },
      {
        test    : /\.scss$/,
        include : path.join(__dirname, "node_modules"),
        use     : [
          {
            loader: "sass-loader",
            options: {
              importer: function(url, prev) {
                if(url.indexOf("~@material") === 0) {
                  const filePath = url.split("~@material")[1];
                  const nodeModulePath = `./node_modules/@material/${filePath}`;
                  return { file : path.resolve(nodeModulePath) };
                }
                return { file : url };
              }
            }
          }
        ]
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
  },
  
  plugins : [
    new CleanWebpackPlugin(["dist"]),

    // TODO add hot loader support
    // new webpack.HotModuleReplacementPlugin(),
    
    new webpack.NamedModulesPlugin(),
    
    new webpack.optimize.CommonsChunkPlugin({
      name      : "vendor",
      minChunks : Infinity,
    }),
    
    new ExtractTextWebpackPlugin("[name].[hash].css"),
    
    new HtmlWebpackPlugin({
      template          : "./index.html",
      alwaysWriteToDisk : true,
    }),
    
    new HtmlWebpackHarddiskPlugin(),
    
    new CopyWebpackPlugin([
      {
        context : "src/assets",
        from    : "**/*",
        to      : "assets",
        ignore  : ["styles/**/*"]
      }
    ]),
    
    new WriteFilePlugin(),
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries
  // between builds
  // externals : {
  //   "react"     : "React",
  //   "react-dom" : "ReactDOM",
  // },
}