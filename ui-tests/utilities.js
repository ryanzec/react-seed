module.exports = {
  url: function(path) {
    if (path.indexOf('?') === -1) {
      path += '?uiTesting=true';
    } else {
      path += '&uiTesting=true';
    }

    return browser.url(path);
  },

  saveScreenshot: function(fileName) {
    return browser.saveScreenshot('./ui-tests/screenshots/' + fileName + '.png');
  }
}
