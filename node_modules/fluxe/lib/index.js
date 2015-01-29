var Dispatcher = require('flux').Dispatcher;
var EventEmitter = require('eventemitter3');
var objectAssign = require('object-assign');
var _ = require('lodash');
var applicationDispatcher = new Dispatcher();
var stores = {};
var actions = {};

var fluxe = {
  /**
   * Add a store and its actions to the system.
   *
   * @method addStore
   *
   * @param object store An object of the methods and properties of the store
   */
  addStore: function(store) {
    if(!store.storeName) {
      throw new Error('You must provide the storeName property for a store');
    }

    if(stores[store.storeName]) {
      throw new Error('You can not define a store with the same storeName');
    }

    if(_.isArray(store._dispatcherEvents) && store._dispatcherEvents.length > 0) {
      throw new Error('You must provide at least 1 dispatcher event for a store');
    }

    //setup dispatcher for this store
    applicationDispatcher.register(function(payload) {
      if(payload.eventModule === store.storeName) {
        var functionName = store._dispatcherEvents[payload.eventName];

        if(typeof store[functionName] === 'function') {
          store[functionName](payload.options);
        }
      }

      return true;
    });

    //give the store the ability to listen to and emit events
    objectAssign(store, EventEmitter.prototype);

    //store store for later use
    stores[store.storeName] = store;

    storeActions = {};

    _.forEach(store._dispatcherEvents, function(method, action) {
      storeActions[action] = function(options) {
        applicationDispatcher.dispatch({
          eventModule: store.storeName,
          eventName: action,
          options: options
        });
      }
    });

    //store stor actions for later use
    actions[store.storeName] = storeActions;
  },

  /**
   * Retrieves a store.
   *
   * @method  getStore
   *
   * @param string storeName The name of the store to retrieve
   *
   * @return object The store
   */
  getStore: function(storeName) {
    if(!stores[storeName]) {
      throw new Error('Could not find the ' + storeName + ' store');
    }

    return stores[storeName];
  },

  /**
   * Retrieves a store.
   *
   * @method  getActions
   *
   * @param string storeName The name of the store to retrieve
   *
   * @return object An object of actions
   */
  getActions: function(storeName) {
    if(!stores[storeName]) {
      throw new Error('Could not find the ' + storeName + ' store');
    }

    return actions[storeName];
  },

  /**
   * The dispatcher object.
   *
   * @property object dispatcher
   */
  dispatcher: applicationDispatcher
};


module.exports = fluxe;
