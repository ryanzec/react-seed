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
    this.emit('preventDoubleClickChanged');
  },

  _onDisablePreventDoubleClick: function() {
    this._internalData.preventDoubleClick = false;
    this.emit('preventDoubleClickChanged');
  }
};
