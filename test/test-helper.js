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
var TestLocation = require('react-router/modules/locations/TestLocation');

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

  getRouterComponent: function(Component) {
    var component;
    var div = document.createElement('div');
    var routes = [
      React.createFactory(Route)({
        name: "test",
        handler:Component
      })
    ];
    TestLocation.history = ['/test'];

    Router.run(routes, TestLocation, function (Handler) {
      var mainComponent = React.render(React.createFactory(Handler)({}), div);
      component = reactTestUtils.findRenderedComponentWithType(mainComponent, Component);
    });

    return component;
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
}
};
