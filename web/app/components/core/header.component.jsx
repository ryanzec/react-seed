var React = require('react/addons');
var menuStore = require('fluxe').getStore(require('../menu/menu.store').storeName);

var Header = React.createClass({
  getInitialState: function() {
    return {
      menu: menuStore.getMenu()
    };
  },

  onChange: function(menu) {
    this.setState({
      menu: menuStore.getMenu()
    });
  },

  componentDidMount: function() {
    menuStore.on('activeMenuUpdated', this.onChange);
  },

  componentWillUnmount: function() {
    menuStore.removeListener('activeMenuUpdated', this.onChange);
  },

  render: function() {
    return (
      <header>
        <ul>
          {this.state.menu.map(function(menuItem) {
            return (<li key={menuItem.href}>
              <a href={menuItem.href}>{menuItem.display}</a>
            </li>);
          })}
        </ul>
      </header>
    );
  }
});

module.exports = Header;
