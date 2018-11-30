const path = require("path");
// Plugins
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = env => {
  // const { MODE } = env;
  // console.log(MODE);

  return {
    entry: {
      app: ["./src/js/app.js", "./src/sass/app.sass"],
      admin: ["./src/js/admin.js", "./src/sass/admin.sass"]
    },
    output: {
      filename: "js/[name].js",
      path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-export-namespace-from",
                "@babel/plugin-proposal-throw-expressions",
                "@babel/plugin-syntax-dynamic-import"
              ]
            }
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]"
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]"
          }
        },
        {
          test: /\.sass$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../"
              }
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("autoprefixer")]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCssAssetsPlugin() // defaults to cssnano
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].css"
      }),
      new CleanWebpackPlugin(["dist"])
    ]
  };
};
