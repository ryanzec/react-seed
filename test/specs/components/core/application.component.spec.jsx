var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Application = require('../../../../web/app/components/core/application.component.jsx');
var storeHelper = require('../../../store-helper');

describe('application component', function() {
  beforeEach(function() {
    storeHelper.resetStores('Menu');

    this.component = reactTestUtils.renderIntoDocument(
      <Application />
    );
  });

  it('should have header', function() {
    var header = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'header');

    expect(header).to.be.defined;
  });

  it('should have main-content', function() {
    var mainContent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'main-content');

    expect(mainContent).to.be.defined;
  });
});
