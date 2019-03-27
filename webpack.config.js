const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env, argv) => ({
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: argv.mode === 'production' ? '[name].[chunkhash].js' : '[name].js',
        chunkFilename: 
            argv.mode === 'production' ? 'chunks/[name].[chunkhash].js' : 'chunks/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './index.html',
            filename: 'index.html'
        }),
        new WorkboxPlugin.GenerateSW({
            skipWaiting: true,
            clientsClaim: true
        })
    ],
    devServer: {
        contentBase: 'dist',
        watchContentBase: true,
        port: 1000
    }
});