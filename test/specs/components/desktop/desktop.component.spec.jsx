var React = require('react/addons');
var fibers = require('fibers');
var nock = require('nock');
var reactTestUtils = React.addons.TestUtils;
var Desktop = require('../../../../web/app/components/desktop/desktop.component.jsx');
var testHelper = require('../../../test-helper');
var userStore = require('../../../../web/app/stores/user.store');

var scope = nock('http://localhost:80');

var getDesktopPageComponent = function(mainElement) {
  return reactTestUtils.findRenderedComponentWithType(mainElement, Desktop);
};

describe('desktop component', function() {
  before(function(){
    testHelper.mockNockRequest(scope, 'users', 'get', '123');
  });

  after(function() {
    expect(scope.pendingMocks().length).to.equal(0);
  });

  beforeEach(function() {
    testHelper.resetStoresCachedData('Menu');
  });

  it('should have correct menu', function(done) {
    testHelper.testPage('/desktop', function(mainElement) {
      testHelper.testMenu(mainElement, [{
        href: 'desktop',
        display: 'Desktop',
        className: 'header-desktop-link'
      }, {
        href: 'prevent-double-click',
        display: 'Prevent Double Click',
        className: 'header-prevent-double-click-link'
      }, {
        href: 'with-param',
        display: 'With Param',
        className: 'with-param-link'
      }]);
      done();
    });
  });

  it('should have h1', function(done) {
    testHelper.testPage('/desktop', function(mainElement) {
      var desktopPageComponent = getDesktopPageComponent(mainElement);
      var h1 = reactTestUtils.findRenderedDOMComponentWithTag(desktopPageComponent, 'h1');

      expect(h1).to.be.defined;
      expect(h1.props.id).to.equal('test');
      expect(h1.props.className).to.equal('test');
      expect(h1.props.children).to.equal('Desktop');
      done();
    });
  });

  it('should load user data when clicking button', function(done) {
    fibers(function() {
      testHelper.testPage('/desktop', function(mainElement) {
        var desktopPageComponent = getDesktopPageComponent(mainElement);
        var button = reactTestUtils.findRenderedDOMComponentWithClass(desktopPageComponent, 'load-user-data');

        reactTestUtils.Simulate.click(button);

        testHelper.sleep(5);

        var userId = reactTestUtils.findRenderedDOMComponentWithClass(desktopPageComponent, 'user-id');
        var userUsername = reactTestUtils.findRenderedDOMComponentWithClass(desktopPageComponent, 'user-username');
        var userFirstName = reactTestUtils.findRenderedDOMComponentWithClass(desktopPageComponent, 'user-first-name');
        var userLastName = reactTestUtils.findRenderedDOMComponentWithClass(desktopPageComponent, 'user-last-name');

        expect(userId.props.children).to.equal(123);
        expect(userUsername.props.children).to.equal('test.user');
        expect(userFirstName.props.children).to.equal('Test');
        expect(userLastName.props.children).to.equal('User');

        done();
      });
    }).run();
  });

  it('should have link to desktop page', function(done) {
    testHelper.testPage('/desktop', function(mainElement) {
      var link = reactTestUtils.scryRenderedDOMComponentsWithClass(mainElement, 'header-desktop-link');

      expect(link.length).to.equal(1);
      done();
    });
  });

  it('should have link to prevent double click page', function(done) {
    fibers(function() {
      var steps = [];

      steps.push(function(mainElement) {
        var link = reactTestUtils.findRenderedDOMComponentWithClass(mainElement, 'header-prevent-double-click-link');

        testHelper.simulateRouterLinkClick(link);
      });

      steps.push(function(mainElement) {
        var page = reactTestUtils.scryRenderedDOMComponentsWithClass(mainElement, 'p-prevent-double-click');

        expect(page.length).to.equal(1);
        done();
      });

      testHelper.testPage('/desktop', steps);
    }).run();
  });
});
