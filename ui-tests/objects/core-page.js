var headerComponent = require('./react/components/header');
var coreComponent = require('./core-component');
var corePage = coreComponent.create();

corePage.addSelectors({
  header: 'header.header'
});

//utilities
corePage.getHeader = function() {
  return headerComponent.create(this.getSelector('header', false));
};

module.exports = {
  create: function(baseSelector) {
    var newObject = Object.create(corePage);

    if (baseSelector) {
      newObject.baseSelector = baseSelector;
    }

    return newObject;
  }
};
