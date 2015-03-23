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
        href: 'desktop',
        display: 'Desktop',
        className: 'header-desktop-link'
      }, {
        href: 'prevent-double-click',
        display: 'Prevent Double Click',
        className: 'header-prevent-double-click-link'
      }],
      preventDoubleClick: [{
        href: 'desktop',
        display: 'Desktop',
        className: 'header-desktop-link'
      }, {
        href: 'prevent-double-click',
        display: 'Prevent Double Click',
        className: 'header-prevent-double-click-link'
      }, {
        href: 'with-resolves',
        display: 'With Resolves',
        className: 'header-with-resolves-link'
      }]
    },
    activeMenu: 'desktop'
  }
});
