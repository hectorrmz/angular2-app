const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');

const ENV = process.env.ASPNETCORE_ENVIRONMENT || 'Production';

const cwd = process.cwd();

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: ENV.toLowerCase() === 'local'
});

module.exports = {
    entry: {
        'polyfills': helpers.root('src', 'polyfills.ts'),
        'vendor': helpers.root('src', 'vendor.ts'),
        'app': helpers.root('src', 'main.ts')
    },

    output: {
        path: helpers.root('wwwroot'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].[hash].js'
    },

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
                }, 'angular-router-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.scss$/,
                exclude: helpers.root('src', 'app'),
                loader: extractSass.extract({
                    use: [
                        'raw-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer],
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.scss$/,
                include: helpers.root('src', 'app'),
                loader: extractSass.extract({
                    use: [
                        'raw-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer],
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new ProgressBarPlugin({
            format: chalk.magenta.bold('Building') + ' [' + chalk.green(':bar') + '] ' + chalk.green.bold(':percent') + ' ' + chalk.yellow.bold(':elapsed seconds') + ' ' + chalk.white(':msg'),
            clear: false
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(cwd, 'src', 'index.html')
        }),

        extractSass
    ]
};
