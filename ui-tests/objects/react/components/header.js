require('string.format');

var coreComponent = require('../../core-component');
var headerComponent = coreComponent.create();

headerComponent.addSelectors({
  menuLinks: 'a',
  menuLink: 'li:nth-child({0}) a'
});

//actions
headerComponent.clickMenuItem = function*(index) {
  yield browser.waitClick(this.getSelector('menuLink').format(index + 1));
};

//assertions
headerComponent.menuItemsAreRendered = function*(linksData) {
  var items = yield browser.waitElements(this.getSelector('menuLinks'));

  expect(items.value.length).to.equal(linksData.length);

  var count = linksData.length;

  for (var x = 0; x < count; x += 1) {
    expect(yield browser.waitIsVisible(this.getSelector('menuLink').format([x + 1]))).to.be.true;
    expect(yield browser.waitGetText(this.getSelector('menuLink').format([x + 1]))).to.equal(linksData[x].textContent);
    expect(yield browser.waitGetAttribute(this.getSelector('menuLink').format([x + 1]), 'href')).to.equal(linksData[x].href);
  }
};

module.exports = {
  create: function(baseSelector) {
    var newObject =  Object.create(headerComponent);

    newObject.baseSelector = baseSelector;

    return newObject;
  }
};
