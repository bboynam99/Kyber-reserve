var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// loaders.push({
//   test: /\.scss$/,
//   loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded' }),
//   exclude: ['node_modules']
// });
loaders.push({
  test: /\.scss$/,
  loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
  exclude: ['node_modules']
});

module.exports = function(env){
  return {
    entry: 
    {
      main: [
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
    // [
    //   './src/index.jsx',
    //   './styles/index.scss'
    // ],
    output: {
      publicPath: './',
      path: path.join(__dirname, 'public'),
      filename: '[chunkhash].js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      loaders
    },
    plugins: [
      new WebpackCleanupPlugin(),
      new webpack.DefinePlugin({
        'env': env && env.chain ? '"' + env.chain + '"' : '"kovan"',
        'process.env': {
          NODE_ENV: '"production"',
          chain: '"mainnet"',
          // HTTP_ENDPOINT: '\"' + process.env.HTTP_ENDPOINT + '\"',
          // EVALUTATE_ENDPOINT: '\"' + process.env.EVALUTATE_ENDPOINT + '\"'
        }
      }),
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false,
      //     screw_ie8: true,
      //     drop_console: true,
      //     drop_debugger: true
      //   }
      // }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new ExtractTextPlugin({
        filename: 'style.css',
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        title: 'Reserve - kyber.network',
        favicon: './src/assets/img/favicon.png',
        template: './src/template.html',
        styleFile: 'style.css?v=' + Date.now(),
        chunks: [
          'chart',
          'main',
        ],
        chunksSortMode: 'manual'
      })
    ]
  }
};
