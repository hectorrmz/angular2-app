var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            helpers.root('src'),
            helpers.root('src', 'assets'),
            helpers.root('node_modules')
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['angular2-template-loader', {
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: helpers.root('src', 'tsconfig.json') }
                }]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'

            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null-loader'
            },
            {
                test: /\.scss$/,
                exclude: helpers.root('src', 'app'),
                loader: 'null-loader'
            },
            {
                test: /\.scss$/,
                include: helpers.root('src', 'app'),
                loader: ['raw-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        )
    ]
}
