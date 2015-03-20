var _ = require('lodash');
var storeLocations = {
  Application: '../web/app/components/core/application.store',
  Menu: '../web/app/components/menu/menu.store'
};
var initialStores = {};
var Router = require('react-router');
var Route = Router.Route;
var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var TestLocation = require('react-router/lib/locations/TestLocation');
var fibers = require('fibers');

//store the original state of all the stores
_.forEach(storeLocations, function(path, storeName) {
  initialStores[storeName] = _.clone(require(path), true);
});

module.exports = {
  resetStores: function() {
    var storeNames = Array.prototype.slice.call(arguments);

    storeNames.forEach(function(storeName) {
      //get the store
      var store = require(storeLocations[storeName]);

      //reset all the initial store properties
      store = _.extend(store, _.clone(initialStores[storeName], true));
    });
  },

  getRouterComponent: function(Component, path, attachComponentTo, callback) {
    var component;
    var div = document.createElement('div');
    var routes = require('../web/app/components/core/routes.jsx');
    var location = new TestLocation([path]);

    Router.run(routes, location, function (Handler) {
      var mainComponent = React.render(React.createFactory(Handler)({}), div);
      attachComponentTo.component = reactTestUtils.findRenderedComponentWithType(mainComponent, Component);
      callback();
    }.bind(this));
  },

  unmountComponent: function(component) {
    if(component && component.isMounted()) {
      React.unmountComponentAtNode(component.getDOMNode().parentNode);
    }
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
    return sinon.spy(component.type.prototype.__reactAutoBindMap, eventHandlerName);
  },

  restoreEventHandler: function(component, eventHandlerName) {
    //using weird syntax here to prevent issue with ReactJS auto binding of events
    component.type.prototype.__reactAutoBindMap[eventHandlerName].restore();
  }
};
