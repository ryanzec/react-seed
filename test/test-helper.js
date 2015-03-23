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
var mockedData = require('../web/mocked-api/data/index');
var Header = require('../web/app/components/core/header.component.jsx');

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

  testPage: function(initialPath, steps) {
    if (!_.isArray(steps)) {
      steps = [steps];
    };

    var component;
    var routerMainComponent;
    var div = document.createElement('div');
    var routes = require('../web/app/components/core/routes.jsx');
    var location = new TestLocation([initialPath]);

    Router.run(routes, location, function (Handler) {
      var step = steps.shift();

      //TODO: research: not sure why or if I need this here (https://github.com/rackt/react-router/issues/991)
      this.unmountComponent(routerMainComponent);

      routerMainComponent = React.render(React.createFactory(Handler)({}), div);
      step(routerMainComponent);
    }.bind(this));
  },

  unmountComponent: function(component) {
    if(component && component.isMounted()) {
      //console.log('unmounted: ' + component.constructor.displayName);
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
  },

  mockedData: mockedData,

  simulateRouterLinkClick: function(linkComponent) {
    reactTestUtils.Simulate.click(linkComponent, {button: 0});
  },

  //TODO: remove: this is specific to the menu setup that is in place so either remove this method (if you are using a different menu system) or remove this
  //TODO: remove: comment if you are using the provided menu system
  testMenu: function(mainElement, expectedMenuData) {
    var headerComponent = reactTestUtils.findRenderedComponentWithType(mainElement, Header);
    var ulElement = reactTestUtils.findRenderedDOMComponentWithTag(headerComponent, 'ul');

    expect(ulElement).to.be.defined;

    liElements = reactTestUtils.scryRenderedDOMComponentsWithTag(ulElement, 'li');

    expect(liElements.length).to.equal(expectedMenuData.length);

    _.forEach(liElements, function(liElement, key) {
      var linkProps = reactTestUtils.findRenderedComponentWithType(liElement, Link).props;

      expect(linkProps.to).to.equal(expectedMenuData[key].href);
      expect(linkProps.children).to.equal(expectedMenuData[key].display);
      expect(linkProps.className).to.equal(expectedMenuData[key].className);
    });
  }
};
