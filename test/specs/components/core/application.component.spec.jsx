var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Application = require('../../../../web/app/components/core/application.component.jsx');
var testHelper = require('../../../test-helper');

describe('application component', function(done) {
  it('should have header', function(done) {
    testHelper.testPage('/', function(mainElement) {
      var header = reactTestUtils.findRenderedDOMComponentWithTag(mainElement, 'header');

      expect(header).to.be.defined;
      done();
    });
  });

  it('should have application element', function(done) {
    testHelper.testPage('/', function(mainElement) {
      var mainContent = reactTestUtils.findRenderedDOMComponentWithClass(mainElement, 'application');

      expect(mainContent).to.be.defined;
      done();
    });
  });
});
