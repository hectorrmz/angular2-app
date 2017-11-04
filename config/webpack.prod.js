const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const webpackMerge = require('webpack-merge');
const helpers = require('./helpers');
const commonConfig = require('./webpack.common.js');

const cwd = process.cwd();

const GLOBALS = {
    'process.env.ENV': JSON.stringify('Production')
};

module.exports = webpackMerge(commonConfig, {
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        }),
        new webpack.DefinePlugin(GLOBALS)
    ]
});
