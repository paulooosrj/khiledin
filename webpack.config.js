const webpack = require('webpack');
const { join } = require('path');
const dotenv = require('dotenv').config({ path: __dirname + '/env/local/.env' });

const ENV = "dev";

module.exports = {
    context: __dirname,
    watch: true,
    devtool: false,
    entry: {
        app: './app/public/src/js/app.js',
        react: './app/public/src/js/react.js'
        /*,
          login: './app/public/src/js/login.js',
          bots: './app/public/src/js/bots.js'
        */
    },
    output: {
        path: join(__dirname, 'app', 'public', 'src', 'js', 'min'),
        filename: '[name].js'
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          }
        ]
    },
    plugins: ((ENV === "production") ? [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                ecma: 8
            }
        })
    ] : [
        new webpack.DefinePlugin({
            "process.env.GOOGLE_API_KEY": JSON.stringify(dotenv.parsed.GOOGLE_API_KEY)
        })
    ])
};
