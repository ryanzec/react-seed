var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Header = require('../../../../web/app/components/core/header.component.jsx');
var menuActions = require('fluxe').getActions(require('../../../../web/app/components/menu/menu.store').storeName);
var storeHelper = require('../../../store-helper');
var _ = require('lodash');

describe('header component', function() {
  beforeEach(function() {
    storeHelper.resetStores('Menu');

    this.component = reactTestUtils.renderIntoDocument(
      <Header />
    );
  });

  it('should have correct initial state', function() {
    expect(this.component.state.menu).to.deep.equal([{
      href: '/desktop',
      display: 'Desktop'
    }, {
      href: '/prevent-double-click',
      display: 'Prevent Double Click'
    }]);
  });

  it('should update menu when menu store changes', function() {
    menuActions.update({
      menuName: 'preventDoubleClick'
    });

    expect(this.component.state.menu).to.deep.equal([{
      href: '/desktop',
      display: 'Desktop'
    }, {
      href: '/prevent-double-click',
      display: 'Prevent Double Click'
    }, {
      href: '/with-resolves',
      display: 'With Resolves'
    }]);
  });

  it('should render the menu elements', function() {
    expectedMenuData = [{
      href: '/desktop',
      display: 'Desktop'
    }, {
      href: '/prevent-double-click',
      display: 'Prevent Double Click'
    }];
    var ulElement = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'ul');

    expect(ulElement).to.be.defined;

    liElements = reactTestUtils.scryRenderedDOMComponentsWithTag(ulElement, 'li');

    expect(liElements.length).to.equal(expectedMenuData.length);

    _.forEach(liElements, function(liElement, key) {
      var liProps = reactTestUtils.findRenderedDOMComponentWithTag(liElement, 'a').props;

      expect(liProps.href).to.equal(expectedMenuData[key].href);
      expect(liProps.children).to.equal(expectedMenuData[key].display);
    });
  });
});
