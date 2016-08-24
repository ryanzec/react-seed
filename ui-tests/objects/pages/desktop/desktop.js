import CorePage from '../../core-page';

class DesktopPage extends CorePage {
  constructor() {
    super('.p-desktop');

    this.addSelectors({
      getUserButton: '.load-user-data',
      userDataContainer: '.user-data',
      userId: '.user-id',
      userUsername: '.user-username',
      userFirstName: '.user-first-name',
      userLastName: '.user-last-name'
    });
  }

  //actions
  clickGetUser() {
    browser.waitClick(this.getSelector('getUserButton'));
  }

  //assertions
  userDataNotRendered() {
    browser.pause(100);

    expect(browser.isVisible(this.getSelector('userDataContainer'))).to.be.false;
  }

  userDataIsRendered(userData) {
    expect(browser.waitIsVisible(this.getSelector('userDataContainer'))).to.be.true;
    expect(browser.waitGetText(this.getSelector('userId'))).to.equal(userData.id + '');
    expect(browser.waitGetText(this.getSelector('userUsername'))).to.equal(userData.username);
    expect(browser.waitGetText(this.getSelector('userFirstName'))).to.equal(userData.firstName);
    expect(browser.waitGetText(this.getSelector('userLastName'))).to.equal(userData.lastName);
  }
}

export default DesktopPage;
