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
            test: /\.scss$/,
            loader: extractSass.extract(['css', 'sass'])
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
        new webpack.optimize.CommonsChunkPlugin({
          names: ['libraries-react', 'libraries-core']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
          minimize: true,
          compress: {
            warnings: false
          }
        })
    ],
    entry: {
        //3rd party libraries
        'libraries-core': [
          'lodash',
          'superagent',
          'bluebird',
          'eventemitter3',
          'object-assign',
          'schema-inspector',
          'jsuri',
          'store-cacheable',
          'immutable'
        ],

        'libraries-react': [
          'react',
          'react-dom',
          'react-router'
        ],

        //application code
        application: './web/app/application.jsx',

        //mocks
        'mocked-api': './web/app/mock/api.js',
        'mocked-local-storage': './web/app/mock/local-storage.js'
    },
    output: {
        path: './web/build',
        publicPath: '/build',
        filename: '[name].js'
    }
}
