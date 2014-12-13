var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Application = require('../../../../web/app/components/core/application.component.jsx');
var testHelper = require('../../../test-helper');

describe('application component', function() {
  beforeEach(function() {
    testHelper.resetStores('Menu');

    this.component = testHelper.getRouterComponent(Application);
  });

  it('should have header', function() {
    var header = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'header');

    expect(header).to.be.defined;
  });

  it('should have application element', function() {
    var mainContent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'application');

    expect(mainContent).to.be.defined;
  });
});
