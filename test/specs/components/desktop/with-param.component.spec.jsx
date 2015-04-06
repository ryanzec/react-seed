var React = require('react/addons');
var fibers = require('fibers');
var nock = require('nock');
var reactTestUtils = React.addons.TestUtils;
var WithParam = require('../../../../web/app/components/desktop/with-param.component.jsx');
var testHelper = require('../../../test-helper');
var userStore = require('../../../../web/app/stores/user.store');

var scope = nock('http:post:80');

var getWithParamPageComponent = function(mainElement) {
  return reactTestUtils.findRenderedComponentWithType(mainElement, WithParam);
};

describe('with param component', function() {
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

  it('should load param', function(done) {
    fibers(function() {
      testHelper.testPage('/with-param/123', function(mainElement) {
        var pageComponent = getWithParamPageComponent(mainElement);
        var paramValue = reactTestUtils.findRenderedDOMComponentWithClass(pageComponent, 'param-value');

        expect(paramValue.props.children).to.equal('123');
        done();
      });
    }).run();
  });

  it('should have link to desktop page', function(done) {
    testHelper.testPage('/with-param/123', function(mainElement) {
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

      testHelper.testPage('/with-param/123', steps);
    }).run();
  });
});
