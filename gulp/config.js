var globArray = require('glob-array');
var gulpConfig = {
  webPath: 'web',
  appPath: 'web/app',
  buildPath: 'web/build',
  vendorComponentsPath: 'web/components',
  compileFiles: {
    sass: {
      'web/app/styles/main.scss': 'web/build/main.css'
    }
  },
  jsHintFiles: [
    'web/app/**/*.js',
    'web/app/**/*.jsx',
  ],
  sassFiles: [
    'web/app/**/*.scss',
    'web/components/**/*.scss'
  ],
  htmlFiles: [
    'web/*.html',
    'web/components/**/*.html',
    'web/app/components/**/*.html'
  ],
  tasks: {
    staticRewrite: {
      fileTypesToRewrite: ['svg', 'eot', 'ttf', 'woff', 'png', 'gif', 'jpeg', 'jpg', 'js', 'css', 'map', 'html'],
      fileTypesToProcess: ['html', 'css', 'js'],
      assetPaths: ['app', 'components', 'build'],
      prependSlash: true,
      domains: [],
      //any resources that ends in .html that can't be found will search for a file of the same name that ends in .jade for meta data (to determine hash)
      preprocessors: {
        '.html': '.jade'
      },
      assetPatterns: [
        'web/*.html',
        'web/app/**/*.*',
        'web/components/**/*.*',
        //test files should not trigger static rewrite
        '!web/app/**/*.spec.js'
      ]
    },
    copyStaticAssets: {
      staticAssetExtensions: ['svg', 'eot', 'ttf', 'woff', 'png', 'gif', 'jpeg', 'jpg', 'css'],
      staticAssetFolders: [
        'web/components',
        'web/app/components'
      ],
      manualAssets: {}
    },
    browserify: {
      transformers: [
        'reactify'
      ],
      libraries: [{
        name: 'react/addons'
      }, {
        name: 'react/lib/merge'
      }, {
        name: 'lodash'
      }, {
        name: 'fluxe'
      }, {
        name: 'superagent'
      }, {
        name: 'bluebird'
      }, {
        name: 'react-router'
      }]
    },
    bowerClean: []
  }
};

module.exports = gulpConfig;
