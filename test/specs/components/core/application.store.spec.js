var store = require('fluxe').getStore(require('../../../../web/app/components/core/application.store').storeName);
var actions = require('fluxe').getActions(require('../../../../web/app/components/core/application.store').storeName);
var testHelper = require('../../../test-helper');

describe('application data', function() {
  beforeEach(function() {
    testHelper.resetStores('Application');
  });

  describe('store', function() {
    it('should have default data set properly', function() {
      expect(Object.keys(store._internalData).length).to.equal(1);
      expect(store._internalData.preventDoubleClick).to.be.false;
    });

    it('should be able to get prevent double click status', function() {
      expect(store.getPreventDoubleClick()).to.be.false;
    });

    it('shoud be able to enable prevent double click', function() {
      store._onEnablePreventDoubleClick();
      expect(store.getPreventDoubleClick()).to.be.true;
    });

    it('should be able to disable prevent double click', function() {
      store._onEnablePreventDoubleClick();
      store._onDisablePreventDoubleClick();
      expect(store.getPreventDoubleClick()).to.be.false;
    });
  });

  describe('actions', function() {
    it('enablePreventDoubleClick method', function() {
      actions.enablePreventDoubleClick();

      expect(store.getPreventDoubleClick()).to.be.true;
    });

    it('disablePreventDoubleClick method', function() {
      actions.enablePreventDoubleClick();
      actions.disablePreventDoubleClick();

      expect(store.getPreventDoubleClick()).to.be.false;
    });
  });
});
