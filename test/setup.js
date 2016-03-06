//NOTE: setup expect as global
import {expect} from 'chai';

global.expect = expect;

//NOTE: setup JSDOM for test running
import * as jsdom from 'jsdom';

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom.jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

//NOTE: need to include the i18n testing file
global.window.i18n = require('./i18n-node.js');

//NOTE: include all files that should have coverage numbers on them in-case there are files the specs don't trigger inclusion
import globArray from 'glob-array';

//NOTE: if you want to exclude a files that is include by the tests itself, you need to define that exclude in a .istanbul.yml file
var filesForCoverage = [
  process.cwd() + '/web/app/**/*.js',
  process.cwd() + '/web/app/**/*.jsx',

  //NOTE: pages are tested through ui tests, not unit tests
  '!' + process.cwd() + '/web/app/pages/**/*.js',
  '!' + process.cwd() + '/web/app/pages/**/*.jsx',

  //NOTE: mocks are not that important to coverage test
  '!' + process.cwd() + '/web/app/mock/**/*.js',

  //NOTE: 3rd party libraries that there is no point in testing
  '!' + process.cwd() + '/web/app/misc/ua-parser.js',

  //router based stuff seems to cause issue with needing the history location for react-router so just skip those file
  '!' + process.cwd() + '/web/app/application.jsx',
  '!' + process.cwd() + '/web/app/router.jsx',
  '!' + process.cwd() + '/web/app/routes.jsx'
];

globArray.sync(filesForCoverage).forEach(function(filePath) {
  require(filePath);
});
