var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Desktop = require('../../../../web/app/components/desktop/desktop.component.jsx');
var testHelper = require('../../../test-helper');

describe('desktop component', function() {
  beforeEach(function() {
    testHelper.resetStores('Menu');
    var div = document.createElement('div');

    this.component = React.render(<Desktop />, div);
  });

  it('should have h1', function() {
    var h1 = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'h1');

    expect(h1).to.be.defined;
    expect(h1.props.id).to.equal('test');
    expect(h1.props.className).to.equal('test');
    expect(h1.props.children).to.equal('Desktop');
  });
});
