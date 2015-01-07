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

chai.use(sinonChai);
chai.config.includeStack = true;

//setup fluxe
require('../web/app/fluxe-loader');
