//setup jsdom
var jsdom = require('jsdom');

global.document = jsdom.jsdom('<html><body></body></html>');
global.window = document.parentWindow;
global.navigator = {
 userAgent: 'node.js'
};

//setup testing tools
global.chai = require('chai');
global.expect = chai.expect;
global.sinonChai = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.config.includeStack = true;

//need the i18n object when testing
global.window.i18n = require('./i18n-node.js');

