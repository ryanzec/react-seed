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
      manualGlobs: [
        'web/locale/**/*.js'
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
        name: 'superagent'
      }, {
        name: 'bluebird'
      }, {
        name: 'react-router'
      }, {
        name: 'eventemitter3'
      }, {
        name: 'object-assign'
      }]
    },
    bowerClean: [
      'backend/lib',
      'backend/test',
      'backend/*.*',
      'backend/.*',
      '!backend/backend.js',
    ],
    i18n: {
      languages: ['en'],
      nodeLanguage: 'en'
    }
  }
};

module.exports = gulpConfig;
