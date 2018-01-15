"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";




loaders.push({
  test: /\.scss$/,
  loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
  exclude: ['node_modules']
});

var config = function(env){
  return {
    entry: 
    // [
    //   './src/assets/chart/amcharts.js',
    //     './src/assets/chart/dataloader.min.js',
    //     './src/assets/chart/export.min.js',
    //     './src/assets/chart/light.js',
    //     './src/assets/chart/serial.js',
    //     'react-hot-loader/patch',
    //     './src/index.jsx'
    // ]
    {
      main: [
        'react-hot-loader/patch',
        './src/index.jsx'
      ],
      chart: [
        './src/assets/chart/amcharts.js',
        './src/assets/chart/dataloader.min.js',
        './src/assets/chart/export.min.js',
        './src/assets/chart/light.js',
        './src/assets/chart/serial.js'
      ]
    },
      
    
    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
    output: {
      publicPath: '/',
      filename: '[name].js',
      path: path.join(__dirname, 'public'),
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      loaders
    },
    devServer: {
      contentBase: "./public",
      // do not print bundle build stats
      // noInfo: true,
      // enable HMR
      hot: true,
      // embed the webpack-dev-server runtime into the bundle
      inline: true,
      // serve index.html in place of 404 responses to allow HTML5 history
      historyApiFallback: true,
      port: PORT,
      host: HOST
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin({
        filename: 'style.css',
        allChunks: true
      }),
      new DashboardPlugin(),
      new HtmlWebpackPlugin({
        title: 'Reserve - kyber.network',
        favicon: './src/assets/img/favicon.png',
        template: './src/template.html',
        // files: {
        //   css: ['style.css'],
        //   js: ["app.js"],
        // },
        chunks: [
          'chart',
          'main',
        ],
        chunksSortMode: 'manual'
      }),
      new webpack.DefinePlugin({
        'env': env && env.chain ? '"' + env.chain + '"' : '"kovan"',
        'process.env': {
          HTTP_ENDPOINT: '\"' + process.env.HTTP_ENDPOINT + '\"',
          EVALUTATE_ENDPOINT: '\"' + process.env.EVALUTATE_ENDPOINT + '\"'
        }
      })
    ]
  }
}

module.exports = config
