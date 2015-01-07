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
  sourceFiles: {
    javascript: [
      'web/app/application.js',
      'web/app/**/*.js',
      //TODO: need to add support for JSX here
      //'web/app/**/*.jsx'
    ],
    html: [
      'web/*.html',
      'web/components/**/*.html',
      'web/app/components/**/*.html'
    ],
    sass: [
      'web/app/**/*.scss',
      'web/components/**/*.scss'
    ],
    jade: [
      'web/app/components/**/*.jade',
      'web/*.jade'
    ]
  },
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
      manualAssets: []
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
