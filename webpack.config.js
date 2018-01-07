<<<<<<< HEAD
const webpack = require('webpack');
const ENV = "dev";
const { join } = require('path')

module.exports = {
    context: __dirname,
    watch: true,
    devtool: false,
    entry: {
        app: './public/src/js/app.js',
        login: './public/src/js/login.js',
        bots: './public/src/js/bots.js'
    },
    output: {
        path: join(__dirname, 'public', 'src', 'js', 'min'),
        filename: '[name].js'
    },
    plugins: ((ENV === "production") ? [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                ecma: 8
            }
        })
    ] : []),
    module: {
        rules: [{
            test: /\.(js)$/,
            loader: 'babel-loader'
        }]
    }
};
=======
const webpack = require('webpack');
const ENV = "production";
const { join } = require('path')

module.exports = {
    context: __dirname,
    watch: true,
    devtool: false,
    entry: {
        app: './public/src/js/app.js',
        login: './public/src/js/login.js',
        bots: './public/src/js/bots.js'
    },
    output: {
        path: join(__dirname, 'public', 'src', 'js', 'min'),
        filename: '[name].js'
    },
    plugins: ((ENV === "production") ? [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                ecma: 8
            }
        })
    ] : []),
    module: {
        rules: [{
            test: /\.(js)$/,
            loader: 'babel-loader'
        }]
    }
}
>>>>>>> 837f5ca07b1d8f9fbefac2cd9301058fe174b4cd
