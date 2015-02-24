var store = require('../../../../web/app/components/core/application.store');
var testHelper = require('../../../test-helper');

describe('application store', function() {
  beforeEach(function() {
    testHelper.resetStores('Application');
  });

  it('should have default data set properly', function() {
    expect(Object.keys(store._internalData).length).to.equal(1);
    expect(store._internalData.preventDoubleClick).to.be.false;
  });

  it('should be able to get prevent double click status', function() {
    expect(store.getPreventDoubleClick()).to.be.false;
  });

  it('shoud be able to enable prevent double click', function() {
    store.enablePreventDoubleClick();
    expect(store.getPreventDoubleClick()).to.be.true;
  });

  it('should be able to disable prevent double click', function() {
    store.enablePreventDoubleClick();
    store.disablePreventDoubleClick();
    expect(store.getPreventDoubleClick()).to.be.false;
  });

  it('enablePreventDoubleClick method', function() {
    store.enablePreventDoubleClick();

    expect(store.getPreventDoubleClick()).to.be.true;
  });

  it('disablePreventDoubleClick method', function() {
    store.enablePreventDoubleClick();
    store.disablePreventDoubleClick();

    expect(store.getPreventDoubleClick()).to.be.false;
  });
});
