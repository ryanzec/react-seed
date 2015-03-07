var storeGenerator = require('../core/store-generator');

module.exports = storeGenerator({
  getPreventDoubleClick: function applicationStoreGetPreventDoubleClick() {
    return this._internalData.preventDoubleClick;
  },

  enablePreventDoubleClick: function applicationStoreEnablePreventDoubleClick() {
    this._internalData.preventDoubleClick = true;
    this.emit('preventDoubleClickChanged');
  },

  disablePreventDoubleClick: function applicationStoreDisablePreventDoubleClick() {
    this._internalData.preventDoubleClick = false;
    this.emit('preventDoubleClickChanged');
  },

  _internalData: {
    preventDoubleClick: false
  }
});
