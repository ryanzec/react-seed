var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin('main.css');

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: [
        path.resolve(__dirname, "node_modules")
      ],
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.scss$/,
      loader: extractSass.extract(['css?sourceMap', 'sass?sourceMap'])
    }, {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\/misc\/.*\.js$/,
      loader: 'file?name=/misc/[name].[ext]'
    }, {
      test: /\.(png|jpg|jpeg|)$/,
      loader: 'file?name=/images/[hash].[ext]'
    }]
  },
  plugins: [
    extractSass,
    //NOTE: this is in specific order so that the libraries-core defines the webpackJsonp function (multiple common chunk does not seem to work)
    new webpack.optimize.CommonsChunkPlugin({
      names: ['libraries-react', 'libraries-core']
    })
  ],
  entry: {
    //3rd party libraries
    'libraries-core': [
      'bluebird',
      'immutable',
      'jsuri',
      'lodash.foreach',
      'moment',
      'redux',
      'reselect',
      'store-cacheable',
      'superagent'
    ],

    'libraries-react': [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'react-router-redux'
    ],

    //application code
    application: './web/app/application.jsx',

    //mocks
    'mocked-api': './web/app/mock/api.js',
    'mocked-local-storage': './web/app/mock/local-storage.js'
  },
  devtool: 'source-map',
  output: {
    path: './web/build',
    publicPath: '/build',
    filename: '[name].js'
  }
}
