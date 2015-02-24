var store = require('../../../../web/app/components/menu/menu.store');
var testHelper = require('../../../test-helper');

describe('menu data', function() {
  beforeEach(function() {
    testHelper.resetStores('Menu');
  });

  it('should have default data set', function() {
    expect(Object.keys(store._internalData).length).to.equal(2);
    expect(store._internalData.menus).to.deep.equal({
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
    });
    expect(store._internalData.activeMenu).to.equal('desktop');
  });

  it('should be able to set active menu', function() {
    store.update({
      menuName: 'preventDoubleClick'
    });

    expect(store._internalData.activeMenu).to.equal('preventDoubleClick');
  });

  it('should be able to get the active menu set', function() {
    expect(store.getMenu()).to.deep.equal([{
      href: '/desktop',
      display: 'Desktop'
    }, {
      href: '/prevent-double-click',
      display: 'Prevent Double Click'
    }]);
  });

  it('update method', function() {
    store.update({
      menuName: 'preventDoubleClick'
    });

    expect(store.getMenu()).to.deep.equal([{
      href: '/desktop',
      display: 'Desktop'
    }, {
      href: '/prevent-double-click',
      display: 'Prevent Double Click'
    }, {
      href: '/with-resolves',
      display: 'With Resolves'
    }]);
  });
});
