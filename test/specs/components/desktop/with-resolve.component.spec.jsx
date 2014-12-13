var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var WithResolves = require('../../../../web/app/components/desktop/with-resolves.component.jsx');
var testHelper = require('../../../test-helper');

describe('with resolves component', function() {
  beforeEach(function() {
    testHelper.resetStores('Menu');
    var div = document.createElement('div');

    this.component = React.render(<WithResolves />, div);
  });

  it('should have h1', function() {
    var h1 = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'h1');

    expect(h1).to.be.defined;
    expect(h1.props.children).to.equal('With Resolves');
  });
});
