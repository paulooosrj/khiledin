const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: "inline-sourcemap",
    entry: {
        app: "./public/src/js/app.js",
        login: "./public/src/js/login.js"
    },
    output: {
        path: __dirname + "/public/src/js/min",
        filename: "[name].js"
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: true
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        })
    ]
};