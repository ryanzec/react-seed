import HeaderComponent from './react/components/header';
import CoreComponent from './core-component';

class CorePage extends CoreComponent {
  constructor(baseSelector) {
    super(baseSelector);

    this.addSelectors({
      header: 'header.header',
      desktopPage: '.p-desktop',
      preventDoubleClickPage: '.p-prevent-double-click'
    });
  }

  getHeader() {
    return new HeaderComponent(this.getSelector('header', false));
  }

  isOnPage(selectorName) {
    expect(browser.waitIsVisible(this.getSelector(`${selectorName}Page`, false))).to.be.true;
  }
}

export default CorePage;
