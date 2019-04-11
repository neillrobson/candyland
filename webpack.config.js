const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PwaManifestPlugin = require('webpack-pwa-manifest');

module.exports = (env, argv) => ({
    entry: {
        main: './src/main.jsx'
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!.git']
        }),
        new WorkboxPlugin.GenerateSW({
            skipWaiting: true,
            clientsClaim: true
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html',
            filename: 'index.html',
            meta: {
                description: "A simulator of a Candyland card deck."
            }
        }),
        new PwaManifestPlugin({
            name: "Card Deck for Lifesize Candyland",
            short_name: "Candyland",
            theme_color: "#e393c2",
            background_color: "#ffffff",
            display: "standalone",
            orientation: "portrait",
            scope: "/candyland",
            start_url: "/candyland",
            icons: [
                {
                    src: path.resolve("res/ico-1024.png"),
                    sizes: [96, 128, 192, 256, 384, 512, 1024]
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: argv.mode === 'production'
            ? '[name].[contentHash].css'
            : '[name].css'
        }),
    ],
    devServer: {
        contentBase: 'dist',
        watchContentBase: true,
        port: 8080
    }
});