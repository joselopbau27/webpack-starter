const htmlWebpack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',// Para que el archivo que se crea en dist este en modo de desarrollo

    output: {
        clean: true//Cada que compilamos borra los archivos anteriores
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
            }
        ]
    },

    optimization: {},

    plugins: [
        new htmlWebpack({
            title: 'My webpack App',
            //filename:'index.html'
            template: './src/index.html'
        }),

        new MiniCssExtractPlugin({
            filename:'[name].css',
            ignoreOrder:false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}