var storeGenerator = require('../core/store-generator');

module.exports = storeGenerator({
  getPreventDoubleClick: function() {
    return this._internalData.preventDoubleClick;
  },

  enablePreventDoubleClick: function() {
    this._internalData.preventDoubleClick = true;
    this.emit('preventDoubleClickChanged');
  },

  disablePreventDoubleClick: function() {
    this._internalData.preventDoubleClick = false;
    this.emit('preventDoubleClickChanged');
  },

  _internalData: {
    preventDoubleClick: false
  }
});
