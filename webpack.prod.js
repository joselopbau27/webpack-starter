const htmlWebpack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const cssMinimizer = require('css-minimizer-webpack-plugin');
const terser = require('terser-webpack-plugin');

module.exports = {

    mode: 'production',// Para que el archivo que se crea en dist este en modo de desarrollo

    output: {
        clean: true,//Cada que compilamos borra los archivos anteriores
        filename: 'main.[contenthash].js'
    }, 

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }    
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new cssMinimizer(),
            new terser()
        ]
    },

    plugins: [
        new htmlWebpack({
            title: 'My webpack App',
            //filename:'index.html'
            template: './src/index.html'
        }),

        new MiniCssExtractPlugin({
            filename:'[name].[fullhash].css',
            ignoreOrder:false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}