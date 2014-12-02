var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Desktop = require('../../../../web/app/components/desktop/desktop.component.jsx');
var storeHelper = require('../../../store-helper');

describe('desktop component', function() {
  beforeEach(function() {
    storeHelper.resetStores('Menu');

    this.component = reactTestUtils.renderIntoDocument(
      <Desktop />
    );
  });

  it('should have h1', function() {
    var h1 = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'h1');

    expect(h1).to.be.defined;
    expect(h1.props.id).to.equal('test');
    expect(h1.props.className).to.equal('test');
    expect(h1.props.children).to.equal('Desktop');
  });
});
