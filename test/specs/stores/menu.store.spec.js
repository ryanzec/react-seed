var store = require('../../../web/app/stores/menu.store');
var testHelper = require('../../test-helper');

describe('menu data', function() {
  beforeEach(function() {
    testHelper.resetStoresCachedData('Menu');
  });

  it('should have default data set', function() {
    expect(Object.keys(store._cachedData).length).to.equal(2);
    expect(store._cachedData.menus).to.deep.equal({
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
    });
    expect(store._cachedData.activeMenu).to.equal('desktop');
  });

  it('should be able to set active menu', function() {
    store.update({
      menuName: 'preventDoubleClick'
    });

    expect(store._cachedData.activeMenu).to.equal('preventDoubleClick');
  });

  it('should be able to get the active menu set', function() {
    expect(store.getMenu()).to.deep.equal([{
      href: 'desktop',
      display: 'Desktop',
        className: 'header-desktop-link'
    }, {
      href: 'prevent-double-click',
      display: 'Prevent Double Click',
        className: 'header-prevent-double-click-link'
    }]);
  });

  it('update method', function() {
    store.update({
      menuName: 'preventDoubleClick'
    });

    expect(store.getMenu()).to.deep.equal([{
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
    }]);
  });
});
