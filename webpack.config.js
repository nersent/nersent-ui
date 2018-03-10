const webpack = require('webpack');
const path = require("path");
const { spawn } = require("child_process");
const DtsBundleWebpack = require('dts-bundle-webpack');
const fs = require("fs");

const productionDevtool = "source-map";
const developmentDevtool = "eval-source-map";

const INCLUDE = [path.resolve(__dirname, "src")];
const EXCLUDE = [/node_modules/];

const PORT = 8080;

const OUTPUT_DIR = path.resolve(__dirname, "build");

const config = {
  target: "web",

  devtool:
    process.env.NODE_ENV === "production"
      ? productionDevtool
      : developmentDevtool,

  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
    libraryTarget: "umd"
  },

  entry: {
    index: "./src"
  },

  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|woff2|tff|svg)$/,
        include: INCLUDE,
        exclude: EXCLUDE,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
      {
        test: /\.(tsx|ts|jsx|js)$/,
        include: INCLUDE,
        exclude: EXCLUDE,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".tsx", ".ts"],
  },

  plugins: [
    new DtsBundleWebpack({
      name: 'nersent-ui',
      main: './build/build/index.d.ts',
      baseDir: './build',
      out: './index.d.ts',
    }),
    new WebpackShellPlugin({
      onBuildEnd: () => {
        /*setTimeout(() => {
          cleanEmptyFoldersRecursively('./build/build');
        }, 1000);*/
      }
    })
  ],

  externals: {
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components'
    },
  },
};

function cleanEmptyFoldersRecursively(folder) {
  const isDir = fs.statSync(folder).isDirectory();
  if (!isDir) {
    return;
  }
  let files = fs.readdirSync(folder);
  if (files.length > 0) {
    files.forEach(function(file) {
      var fullPath = path.join(folder, file);
      cleanEmptyFoldersRecursively(fullPath);
    });

    files = fs.readdirSync(folder);
  }

  if (files.length == 0) {
    fs.rmdirSync(folder);
    return;
  }
}

var exec = require('child_process').exec;

function WebpackShellPlugin(options) {
  this.options = options;
}

WebpackShellPlugin.prototype.apply = function(compiler) {
  const options = this.options;

  compiler.plugin("compilation", compilation => {
    if (options.onBuildStart != null) {
      options.onBuildStart()
    }
  });

  compiler.plugin("after-emit", (compilation, callback) => {
    if (options.onBuildEnd != null) {
      options.onBuildEnd();
    }
    callback();
  });
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  )
}

module.exports = [config];
