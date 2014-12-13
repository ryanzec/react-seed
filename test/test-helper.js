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
  }
};
