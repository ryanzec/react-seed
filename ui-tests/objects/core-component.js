var coreComponent = {};
var assign = require('lodash.assign');

coreComponent.baseSelector = '';

coreComponent.selectors = {};

//utilities
coreComponent.addSelectors = function(selectors) {
  this.selectors = assign(this.selectors, selectors);
};

coreComponent.getSelector = function(selectorName, prependBaseSelector) {
  if (!this.selectors[selectorName]) {
    return '';
  }

  var selector = '';

  if (prependBaseSelector !== false) {
    selector += this.baseSelector + ' ';
  }

  selector += this.selectors[selectorName];

  return selector.trim();
};

module.exports = {
  create: function(baseSelector) {
    return Object.create(coreComponent);
  }
};
