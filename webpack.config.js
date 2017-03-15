const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: "eval-source-map",

    entry: {
        entry: './example/entry.js'
    },
    
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },

    devServer: {
        contentBase: './',
        publicPath: 'http://localhost:8282/dist/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "src/resources/css"),
                use: ['style-loader', 'css-loader']
            }, {
                test: /(\.js$|\.jsx$)/,
                include: path.resolve(__dirname, "/"),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015', 'stage-0']
                    }
                }]
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    }
}
