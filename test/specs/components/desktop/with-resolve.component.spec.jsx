var React = require('react/addons');
var nock = require('nock');
var reactTestUtils = React.addons.TestUtils;
var WithResolves = require('../../../../web/app/components/desktop/with-resolves.component.jsx');
var testHelper = require('../../../test-helper');
var userStore = require('../../../../web/app/stores/user.store');

var scope = nock('http://localhost:80');

var getWithResolvesPageComponent = function(mainElement) {
  return reactTestUtils.findRenderedComponentWithType(mainElement, WithResolves);
};

describe('with resolves component', function(done) {
  before(function(){
    testHelper.mockNockRequest(scope, 'users', 'get', '124', {
      times: 5
    });
  });

  after(function() {
    expect(scope.pendingMocks().length).to.equal(0);
  });

  beforeEach(function() {
    testHelper.resetStoresCachedData('Menu');
  });

  it('should have correct menu', function(done) {
    testHelper.testPage('/with-resolves', function(mainElement) {
      testHelper.testMenu(mainElement, [{
        href: 'desktop',
        display: 'Desktop',
        className: 'header-desktop-link'
      }, {
        href: 'prevent-double-click',
        display: 'Prevent Double Click',
        className: 'header-prevent-double-click-link'
      }]);
      done();
    });
  });

  it('should have h1', function(done) {
    testHelper.testPage('/with-resolves', function(mainElement) {
      var withResolvePageComponent = getWithResolvesPageComponent(mainElement);
      var h1 = reactTestUtils.findRenderedDOMComponentWithTag(withResolvePageComponent, 'h1');

      expect(h1).to.be.defined;
      expect(h1.props.children).to.equal('With Resolves');
      done();
    });
  });

  it('should have user data', function(done) {
    testHelper.testPage('/with-resolves', function(mainElement) {
      var withResolvePageComponent = getWithResolvesPageComponent(mainElement);
      var userId = reactTestUtils.findRenderedDOMComponentWithClass(withResolvePageComponent, 'user-id');
      var userUsername = reactTestUtils.findRenderedDOMComponentWithClass(withResolvePageComponent, 'user-username');
      var userFirstName = reactTestUtils.findRenderedDOMComponentWithClass(withResolvePageComponent, 'user-first-name');
      var userLastName = reactTestUtils.findRenderedDOMComponentWithClass(withResolvePageComponent, 'user-last-name');

      expect(userId.props.children).to.equal(124);
      expect(userUsername.props.children).to.equal('test2.user2');
      expect(userFirstName.props.children).to.equal('Test2');
      expect(userLastName.props.children).to.equal('User2');
      done();
    });
  });

  it('should have link to with resolves page', function(done) {
    testHelper.testPage('/with-resolves', function(mainElement) {
      var link = reactTestUtils.scryRenderedDOMComponentsWithClass(mainElement, 'header-prevent-double-click-link');

      expect(link.length).to.equal(1);
      done();
    });
  });

  it('should have link to desktop page', function(done) {
    var steps = [];

    steps.push(function(mainElement) {
      var link = reactTestUtils.findRenderedDOMComponentWithClass(mainElement, 'header-desktop-link');

      testHelper.simulateRouterLinkClick(link);
    });

    steps.push(function(mainElement) {
      var page = reactTestUtils.scryRenderedDOMComponentsWithClass(mainElement, 'p-desktop');

      expect(page.length).to.equal(1);
      done();
    });

    testHelper.testPage('/with-resolves', steps);
  });
});
