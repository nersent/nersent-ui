const webpack = require('webpack');
const path = require('path');

const productionDevtool = 'source-map';
const developmentDevtool = 'eval-source-map';

const INCLUDE = [path.resolve(__dirname, 'src')];
const EXCLUDE = [/node_modules/];

const PORT = 8080;

const OUTPUT_DIR = path.resolve(__dirname, 'build');

const config = {
  target: 'web',

  devtool: process.env.NODE_ENV === 'production' ? productionDevtool : developmentDevtool,

  output: {
    path: OUTPUT_DIR,
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },

  entry: {
    index: './src',
  },

  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|woff2|ttf|svg)$/,
        include: INCLUDE,
        exclude: EXCLUDE,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.(tsx|ts|jsx|js)$/,
        include: INCLUDE,
        exclude: EXCLUDE,
        use: [
          {
            loader: 'ts-loader',
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
    modules: ['node_modules'],
    extensions: ['.js', '.tsx', '.ts', '.json'],
  },

  plugins: [],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }));
}

module.exports = [config];
