module.exports = function(browser) {
  browser.addCommand('waitIsVisible', function(selector) {
    this.waitForExist(selector);
    return this.isVisible(selector);
  });

  browser.addCommand('waitClick', function(selector) {
    this.waitForExist(selector);
    this.click(selector);
  });

  browser.addCommand('waitElements', function(selector) {
    this.waitForExist(selector);
    return this.elements(selector);
  });

  browser.addCommand('waitGetAttribute', function(selector, attribute) {
    this.waitForExist(selector);
    return this.getAttribute(selector, attribute);
  });

  browser.addCommand('waitSetValue', function(selector, value) {
    this.waitForExist(selector);
    this.setValue(selector, value);
  });

  browser.addCommand('waitGetText', function(selector) {
    this.waitForExist(selector);
    return this.getText(selector);
  });
};
