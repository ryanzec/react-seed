var storeGenerator = require('../core/store-generator');

module.exports = storeGenerator({
  getMenu: function menuStoreGetMenu() {
    return this._internalData.menus[this._internalData.activeMenu];
  },

  update: function menuStoreUpdate(options) {
    this._internalData.activeMenu = options.menuName;
    this.emit('activeMenuUpdated');
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
  }
});
