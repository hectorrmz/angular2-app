const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('wwwroot'),
        filename: 'js/[name].js',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    }
});
