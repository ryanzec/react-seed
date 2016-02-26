import * as utilities from '../../../utilities';
import DesktopPage from '../../../objects/pages/desktop/desktop';

describe('desktop page', function() {
  it('should render desktop', function*() {
    let page = new DesktopPage();

    yield utilities.url('/desktop');

    let header = page.getHeader();

    yield header.menuItemsAreRendered([{
      textContent: 'Desktop',
      href: testParameters.baseUrl + '/desktop'
    }, {
      textContent: 'Prevent Double Click',
      href: testParameters.baseUrl + '/prevent-double-click'
    }, {
      textContent: 'With Param',
      href: testParameters.baseUrl + '/with-param'
    }]);
  });

  it('should get able to load user data', function*() {
    let page = new DesktopPage();

    yield utilities.url('/desktop');

    yield page.userDataNotRendered();

    yield page.clickGetUser();

    yield page.userDataIsRendered({
      id: 123,
      username: 'test.user',
      firstName: 'Test',
      lastName: 'User'
    });
  });
});
