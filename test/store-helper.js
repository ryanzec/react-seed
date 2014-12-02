var _ = require('lodash');
var storeLocations = {
  Application: '../web/app/components/core/application.store',
  Menu: '../web/app/components/menu/menu.store'
};
var initialStores = {};

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
  }
};
