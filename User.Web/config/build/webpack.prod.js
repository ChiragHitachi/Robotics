const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('../helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
                ie8: false,
                ecma: 6,
                sourceMap: false,
                output: {
                    beautify: false,
                    comments: false
                },
                mangle: true,
                warnings: true,
                compress: {
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    negate_iife: false
                },
            },
      }),
   new CompressionPlugin({
       asset: '[path].gz[query]',
       algorithm: 'gzip',
       test: /\.js$|\.css$|\.html$/,
       threshold: 10240,
       minRatio: 0.8
   }),

//    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
//     mangle: {
//         keep_fnames: true
//     }
// }),
        new ExtractTextPlugin('styles.[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                htmlLoader: {
                    minimize: false // workaround for ng2
                }
            }
        })
    ]
});