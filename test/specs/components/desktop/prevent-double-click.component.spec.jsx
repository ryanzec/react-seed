var React = require('react/addons');
var _ = require('lodash');
var nock = require('nock');
var reactTestUtils = React.addons.TestUtils;
var PreventDoubleClick = require('../../../../web/app/components/desktop/prevent-double-click.component.jsx');
var testHelper = require('../../../test-helper');
var userStore = require('../../../../web/app/stores/user.store');

var scope = nock('http://localhost:80');

var getPreventDoubleClickPageComponent = function(mainElement) {
  return reactTestUtils.findRenderedComponentWithType(mainElement, PreventDoubleClick);
};

describe('prevent double click page', function() {
  before(function(){
    testHelper.mockNockRequest(scope, 'users', 'get', '124');
  });

  after(function() {
    expect(scope.pendingMocks().length).to.equal(0);
  });

  beforeEach(function() {
    testHelper.resetStoresCachedData('Menu', 'Application');
  });

  it('should have correct menu', function(done) {
    testHelper.testPage('/prevent-double-click', function(mainElement) {
      testHelper.testMenu(mainElement, [{
        href: 'desktop',
        display: 'Desktop',
        className: 'header-desktop-link'
      }, {
        href: 'prevent-double-click',
        display: 'Prevent Double Click',
        className: 'header-prevent-double-click-link'
      }, {
        href: 'with-resolves',
        display: 'With Resolves',
        className: 'header-with-resolves-link'
      }]);
      done();
    });
  });

  it('should have h1', function(done) {
    testHelper.testPage('/prevent-double-click', function(mainElement) {
      var preventDoubleClickPageComponent = getPreventDoubleClickPageComponent(mainElement);
      var h1 = reactTestUtils.findRenderedDOMComponentWithTag(preventDoubleClickPageComponent, 'h1');

      expect(h1).to.be.defined;
      expect(h1.props.children).to.equal('Prevent Double Click');
      done();
    });
  });

  it('should rendered the 2 buttons', function(done) {
    testHelper.testPage('/prevent-double-click', function(mainElement) {
      var preventDoubleClickPageComponent = getPreventDoubleClickPageComponent(mainElement);
      expectedData = [{
        disabled: false,
        children: 'test'
      }, {
        onClick: function(){},
        children: 'Prevent Double Click Other Buttons'
      }];

      var buttons = reactTestUtils.scryRenderedDOMComponentsWithTag(preventDoubleClickPageComponent, 'button');

      expect(buttons).to.be.defined;
      expect(buttons.length).to.equal(expectedData.length);

      _.forEach(buttons, function(button, key) {
        expect(button.props.length).to.equal(expectedData[key].length);

        _.forEach(expectedData[key], function(propertyValue, propertyName) {
          if(_.isFunction(propertyValue)) {
            expect(_.isFunction(button.props[propertyName])).to.be.true;
          } else {
            expect(button.props[propertyName]).to.equal(propertyValue);
          }
        });
      });
      done();
    });
  });

  it('should disable first button when clicking on second button', function(done) {
    testHelper.testPage('/prevent-double-click', function(mainElement) {
      var preventDoubleClickPageComponent = getPreventDoubleClickPageComponent(mainElement);
      var buttons = reactTestUtils.scryRenderedDOMComponentsWithTag(preventDoubleClickPageComponent, 'button');

      reactTestUtils.Simulate.click(buttons[1]);

      expect(buttons[0].props.disabled).to.be.true;
      done();
    });
  });

  it('should enable first button when when it is already disabled when clicking on second button', function(done) {
    testHelper.testPage('/prevent-double-click', function(mainElement) {
      var preventDoubleClickPageComponent = getPreventDoubleClickPageComponent(mainElement);
      var buttons = reactTestUtils.scryRenderedDOMComponentsWithTag(preventDoubleClickPageComponent, 'button');

      reactTestUtils.Simulate.click(buttons[1]);
      reactTestUtils.Simulate.click(buttons[1]);

      expect(buttons[0].props.disabled).to.be.false;
      done();
    });
  });

  it('should have link to prevent double click page', function(done) {
    testHelper.testPage('/prevent-double-click', function(mainElement) {
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

    testHelper.testPage('/prevent-double-click', steps);
  });

  it('should have link to with resolves page', function(done) {
    var steps = [];

    steps.push(function(mainElement) {
      var link = reactTestUtils.findRenderedDOMComponentWithClass(mainElement, 'header-with-resolves-link');

      testHelper.simulateRouterLinkClick(link);
    });

    steps.push(function(mainElement) {
      var userId = reactTestUtils.findRenderedDOMComponentWithClass(mainElement, 'user-id');

      expect(userId.props.children).to.equal(124);
      done();
    });

    testHelper.testPage('/prevent-double-click', steps);
  });
});
