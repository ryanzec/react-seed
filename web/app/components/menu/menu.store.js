module.exports = {
  getMenu: function() {
    return this._internalData.menus[this._internalData.activeMenu];
  },

  storeName: 'Menu',

  _dispatcherEvents: {
    'update': '_onUpdateMenu'
  },

  _internalData: {
    menus: {
      desktop: [{
        href: '/desktop',
        display: 'Desktop'
      }, {
        href: '/prevent-double-click',
        display: 'Prevent Double Click'
      }],
      preventDoubleClick: [{
        href: '/desktop',
        display: 'Desktop'
      }, {
        href: '/prevent-double-click',
        display: 'Prevent Double Click'
      }, {
        href: '/with-resolves',
        display: 'With Resolves'
      }]
    },
    activeMenu: 'desktop'
  },

  _onUpdateMenu: function(options) {
    this._internalData.activeMenu = options.menuName;
    this.emit('activeMenuUpdated');
  }
};
