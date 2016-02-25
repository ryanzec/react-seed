module.exports = function(browser) {
  browser.addCommand('waitIsVisible', function(selector) {
    return this.waitForExist(selector).then(function() {
      return this.isVisible(selector).then(function(isVisible) {
        return isVisible;
      });
    })
  });

  browser.addCommand('waitClick', function(selector) {
    return this.waitForExist(selector).then(function() {
      return this.click(selector).then(function() {
        return;
      });
    })
  });

  browser.addCommand('waitElements', function(selector) {
    return this.waitForExist(selector).then(function() {
      return this.elements(selector).then(function(elements) {
        return elements;
      });
    })
  });

  browser.addCommand('waitGetAttribute', function(selector, attribute) {
    return this.waitForExist(selector).then(function() {
      return this.getAttribute(selector, attribute).then(function(attribute) {
        return attribute;
      });
    })
  });

  browser.addCommand('waitSetValue', function(selector, value) {
    return this.waitForExist(selector).then(function() {
      return this.setValue(selector, value).then(function() {
        return;
      });
    })
  });

  browser.addCommand('waitGetText', function(selector) {
    return this.waitForExist(selector).then(function() {
      return this.getText(selector).then(function(text) {
        return text;
      });
    })
  });
};
