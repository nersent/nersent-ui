const { join } = require("path");
const webpack = require("webpack");
const UglifyJSWebpackPlugin = require("uglifyjs-webpack-plugin");

const productionDevtool = "source-map";
const developmentDevtool = "eval-source-map";

const include = [join(__dirname, "src")];
const exclude = /node_modules/;

const config = {
  target: "web",

  entry: {
    index: "./src/index"
  },

  devtool:
    process.env.NODE_ENV === "production"
      ? productionDevtool
      : developmentDevtool,

  output: {
    path: join(__dirname, "build"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },

  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|woff2|tff|svg)$/,
        include,
        exclude,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /\.(tsx|ts)$/,
        include,
        exclude,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  },

  plugins: [],

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".tsx", ".ts"]
  }
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new UglifyJSWebpackPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  );
}

module.exports = [config];
