var corePage = require('../../core-page');
var desktopPage = corePage.create();

desktopPage.baseSelector = '.p-desktop';

desktopPage.addSelectors({
  getUserButton: '.load-user-data',
  userDataContainer: '.user-data',
  userId: '.user-id',
  userUsername: '.user-username',
  userFirstName: '.user-first-name',
  userLastName: '.user-last-name',
});

//actions
desktopPage.clickGetUser = function*() {
  yield browser.waitClick(this.getSelector('getUserButton'));
};

//assertions
desktopPage.userDataNotRendered = function*() {
  yield browser.pause(100);

  expect(yield browser.isVisible(this.getSelector('userDataContainer'))).to.be.false;
};

desktopPage.userDataIsRendered = function*(userData) {
  expect(yield browser.waitIsVisible(this.getSelector('userDataContainer'))).to.be.true;
  expect(yield browser.waitGetText(this.getSelector('userId'))).to.equal(userData.id + '');
  expect(yield browser.waitGetText(this.getSelector('userUsername'))).to.equal(userData.username);
  expect(yield browser.waitGetText(this.getSelector('userFirstName'))).to.equal(userData.firstName);
  expect(yield browser.waitGetText(this.getSelector('userLastName'))).to.equal(userData.lastName);
};

module.exports = {
  create: function() {
    return Object.create(desktopPage);
  }
};
