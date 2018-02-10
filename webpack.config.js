const { join } = require('path')
const webpack = require('webpack')
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')

const productionDevtool = 'cheap-module-source-map'
const developmentDevtool = 'cheap-module-eval-source-map'

const include = [join(__dirname, 'example'), join(__dirname, 'material-react')]

let config = {
  devtool: (process.env.NODE_ENV === 'production') ? productionDevtool : developmentDevtool,

  devServer: {
    contentBase: './',
    publicPath: 'http://localhost:8080/build/'
  },

  output: {
    path: join(__dirname, 'example/public/build'),
    filename: '[name].bundle.js'
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
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
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

let appConfig = {
  target: 'web',
  devtool: (process.env.NODE_ENV === 'production') ? productionDevtool : developmentDevtool,

  entry: {
    example: './example/bootstrap.jsx'
  }
}

appConfig = Object.assign(appConfig, config)

module.exports = [appConfig]
