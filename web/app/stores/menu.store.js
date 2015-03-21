var storeGenerator = require('./store-generator');

module.exports = storeGenerator({
  getMenu: function menuStoreGetMenu() {
    return this._cachedData.menus[this._cachedData.activeMenu];
  },

  update: function menuStoreUpdate(options) {
    this._cachedData.activeMenu = options.menuName;
    this.emit('activeMenuUpdated');
  },

  _cachedData: {
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
  }
});
