const { join } = require('path')
const webpack = require('webpack')
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')

const productionDevtool = 'source-map'
const developmentDevtool = 'eval-source-map'

const include = [join(__dirname, 'src')]

let config = {
  devtool: (process.env.NODE_ENV === 'production') ? productionDevtool : developmentDevtool,

  entry: {
    index: './src/index.jsx'
  },

  devServer: {
    contentBase: './',
    publicPath: 'http://localhost:8080/build/',
    hot: true
  },

  output: {
    path: join(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        include: include,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }
        ]
      }, {
        test: /\.(png|gif|jpg|woff2|tff|svg)$/,
        include: include,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }, {
        test: /\.(jsx|js)$/,
        include: include,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },

  plugins: [],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJSWebpackPlugin({
    uglifyOptions: {
      output: {
        comments: false
      }
    }
  }))
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }))
}

module.exports = [config]
