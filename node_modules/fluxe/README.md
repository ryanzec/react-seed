# Fluxe

Fluxe is a wrapper built on top of Facebook's dispatcher to make it easy to work with stores and action within the Flux architecture.

# Installation

```npm install fluxe```

# Documentation

First, fluxe extends the functionality of eventemitter3 in order to provide the ability to listen for events directly on a store instead of having a global event bus.

Fluxe exposes a very simple API.

The first is a `addStore(store)` method that takes an object of the store methods and properties.  This object must provide a `storeName` property that must be unique to all stores.  It must also provide a `_dispatcherEvents` property that is a key => value object of action names => store method names **(this property must begin with an underscore to indicate that it should not be used in a public manner, this property is designed to only be used by fluxe internally)**.

So if we have a store define in its own file that looks like this:

```javascript
//file: application.store.js
module.exports = {
  getPreventDoubleClick: function() {
    return this._internalData.preventDoubleClick;
  },

  storeName: 'Application',

  _dispatcherEvents: {
    'enablePreventDoubleClick': '_onEnablePreventDoubleClick',
    'disablePreventDoubleClick': '_onDisablePreventDoubleClick'
  },

  _internalData: {
    preventDoubleClick: false
  },

  _onEnablePreventDoubleClick: function() {
    this._internalData.preventDoubleClick = true;
    this.emit('afterPreventDoubleClickChange');
  },

  _onDisablePreventDoubleClick: function() {
    this._internalData.preventDoubleClick = false;
    this.emit('afterPreventDoubleClickChange');
  }
};
```

you would add the store like this:

```javascript
var fluxe = require('fluxe');
fluxe.addStore(require('application.store'));
```

To retrive the store to access its data, you call the `getStore(storeName)` method passing the name of the `storeName` property of the store you wish to retrieve.

```javascript
var applicationStore = fluxe.getStore(require('application.store').storeName);
```

The `_dispatcherEvents` property of the store is used to build an actions object automatically.  The keys are the action methods to expose on the actions object and the values are the methods on the store to execute when the action methods is called.  This actions object is designed to be a cleaner way of running command through the dispatcher.

```javascript
var applicationActions = fluxe.getStore(require('application.store').storeName);

applicationAction.enablePreventDoubleClick(); //would execute the applicationStore._onEnablePreventDoubleClick() method
applicationAction.disablePreventDoubleClick(); //would execute the applicationStore._onDisablePreventDoubleClick() method
```

Fluxe also directly exposes the global dispatcher object if direct access is needed.

```javascript
fluxe.dispatcher; //global Flux dispatcher object
```

# License

MIT
