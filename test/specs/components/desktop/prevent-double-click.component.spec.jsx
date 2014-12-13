var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var PreventDoubleClick = require('../../../../web/app/components/desktop/prevent-double-click.component.jsx');
var testHelper = require('../../../test-helper');
var _ = require('lodash');

describe('prevent double click page', function() {
  beforeEach(function() {
    testHelper.resetStores('Menu', 'Application');
    var div = document.createElement('div');

    this.component = React.render(<PreventDoubleClick />, div);
  });

  it('should have h1', function() {
    var h1 = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'h1');

    expect(h1).to.be.defined;
    expect(h1.props.children).to.equal('Prevent Double Click');
  });

  it('should rendered the 2 buttons', function() {
    expectedData = [{
      disabled: false,
      children: 'Test'
    }, {
      onClick: function(){},
      children: 'Prevent Double Click Other Buttons'
    }];

    var buttons = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'button');

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
  });

  it('should disable first button when clicking on second button', function() {
    var buttons = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'button');

    reactTestUtils.Simulate.click(buttons[1]);

    expect(buttons[0].props.disabled).to.be.true;
  });

  it('should enable first button when when it is already disabled when clicking on second button', function() {
    var buttons = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'button');

    reactTestUtils.Simulate.click(buttons[1]);
    reactTestUtils.Simulate.click(buttons[1]);

    expect(buttons[0].props.disabled).to.be.false;
  });
});
