var storeGenerator = require('./store-generator');

module.exports = storeGenerator({
  getPreventDoubleClick: function applicationStoreGetPreventDoubleClick() {
    return this._cachedData.preventDoubleClick;
  },

  enablePreventDoubleClick: function applicationStoreEnablePreventDoubleClick() {
    this._cachedData.preventDoubleClick = true;
    this.emit('preventDoubleClickChanged');
  },

  disablePreventDoubleClick: function applicationStoreDisablePreventDoubleClick() {
    this._cachedData.preventDoubleClick = false;
    this.emit('preventDoubleClickChanged');
  },

  _cachedData: {
    preventDoubleClick: false
  }
});
