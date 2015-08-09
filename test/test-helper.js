var _ = require('lodash');
var storeLocations = {
  Application: '../web/app/stores/application.store',
  Menu: '../web/app/stores/menu.store',
  User: '../web/app/stores/user.store'
};
var initialStoresCachedData = {};
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var TestLocation = require('react-router/lib/locations/TestLocation');
var fibers = require('fibers');
var mockedData = require('../web/app/mock/data/index');
var mockedRequests = require('../web/app/mock/requests/index');
var applicationReact = require('../web/app/react/index');
var Header = applicationReact.components.Header;

//store the original state of all the stores
_.forEach(storeLocations, function(path, storeName) {
  initialStoresCachedData[storeName] = _.clone(require(path)._cachedData, true);
});

module.exports = {
  resetStoresCachedData: function() {
    var storeNames = Array.prototype.slice.call(arguments);

    storeNames.forEach(function(storeName) {
      //get the store
      var store = require(storeLocations[storeName]);

      //reset all the initial store properties
      store._cachedData = _.clone(initialStoresCachedData[storeName], true);
    });
  },

  createNativeClickEvent: function() {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', false, true);

    return evt;
  },

  createNativeMouseEvent: function(options) {
    var evt = document.createEvent('MouseEvents');
    evt.initEvent(options.action, false, true);

    return evt;
  },

  createNativeKeyboardEvent: function(options) {
    var evt = document.createEvent('HTMLEvents');
    var keyEvent = options.event || 'keyup';
    evt.which = options.which;
    evt.keycode = options.which;
    evt.initEvent(keyEvent, false, true);

    return evt;
  },

  noop: function() {},

  sleep: function(ms) {
    var fiber = fibers.current;

    setTimeout(function() {
      fiber.run();
    }, ms);

    fibers.yield();
  },

  keyCodes: {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46,
    COMMA: 188,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18
  },

  getSpyForEventHandler: function(component, eventHandlerName) {
    //using weird syntax here to prevent issue with ReactJS auto binding of events
    return sinon.spy(component.prototype.__reactAutoBindMap, eventHandlerName);
  },

  restoreEventHandler: function(component, eventHandlerName) {
    //using weird syntax here to prevent issue with ReactJS auto binding of events
    component.prototype.__reactAutoBindMap[eventHandlerName].restore();
  },

  mockedData: mockedData,

  mockedRequests: mockedRequests,

  mockNockRequest: function(scope, resource, verb, key, options) {
    var mockedRequestMetaData = mockedRequests[resource][verb][key];
    var body = mockedRequestMetaData.requestPayload ? mockedRequestMetaData.requestPayload : undefined;
    var mock = scope[verb](mockedRequestMetaData.url, body);
    var replyHeaders;

    if (mockedRequestMetaData.requestHeaders) {
      _.forEach(mockedRequestMetaData.requestHeaders, function(value, header) {
        mock.matchHeader(header, value);
      });
    }

    if (options) {
      if (options.responseHeaders) {
        replyHeaders = options.responseHeaders;
      }

      if (options.times) {
        mock.times(options.times);
      }

      if (options.delay) {
        mock.delay = options.delay;
      }
    }

    mock.reply(mockedRequestMetaData.httpCode, mockedRequestMetaData.response, replyHeaders);
  }
};
