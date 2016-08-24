import * as utilities from '../../../utilities';
import DesktopPage from '../../../objects/pages/desktop/desktop';

describe('desktop page', function() {
  it('should render desktop', function() {
    let page = new DesktopPage();

    utilities.url('/desktop');

    let header = page.getHeader();

    header.menuItemsAreRendered([{
      textContent: 'Desktop',
      href: '/desktop'
    }, {
      textContent: 'Prevent Double Click',
      href: '/prevent-double-click'
    }, {
      textContent: 'With Param',
      href: '/with-param'
    }]);

    utilities.saveScreenshot('fu');

    page.isOnPage('desktop');
  });

  it('should get able to load user data', function() {
    let page = new DesktopPage();

    utilities.url('/desktop');

    page.userDataNotRendered();

    page.clickGetUser();

    page.userDataIsRendered({
      id: 123,
      username: 'test.user',
      firstName: 'Test',
      lastName: 'User'
    });
  });

  it('should be able to get to the prevent double click page', function() {
    let page = new DesktopPage();

    utilities.url('/desktop');

    let header = page.getHeader();

    header.clickMenuItem(1);

    page.isOnPage('preventDoubleClick');
  });
});
