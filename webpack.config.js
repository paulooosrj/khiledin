//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const Uglify = require("uglifyjs-webpack-plugin");
const StripWhitespace = require('strip-whitespace-plugin');

module.exports = {
    context: __dirname,
    watch: true,
    devtool: false,
    entry: {
        app: "./public/src/js/app.js",
        login: "./public/src/js/login.js",
        bots: "./public/src/js/bots.js"/**/
    },
    output: {
        path: __dirname + "/public/src/js/min",
        filename: "[name].js"
    },
    plugins: [
        new MinifyPlugin({}, {
            sourceMap: false,
            comments: false,
            mangle: { topLevel: true }
        }),
        new Uglify({
            sourceMap: false,
            output: {
                comments: false
            }
        }),
        new BabiliPlugin({}, {
            sourceMap: false,
            comments: false,
            mangle: { topLevel: true }
        }),
        new StripWhitespace()
    ],
    module: {
        loaders: [{
            test: /\.(js)$/,
            loader: "babel-loader"
          }
        ]
    }
};