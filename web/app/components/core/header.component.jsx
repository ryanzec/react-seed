var React = require('react/addons');
var menuStore = require('../menu/menu.store');
var Link = require('react-router').Link;

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
    /* jshint ignore:start */
    return (
      <header>
        <ul>
          {this.state.menu.map(function(menuItem) {
            return (<li key={menuItem.href}>
              <Link to={menuItem.href}>{menuItem.display}</Link>
            </li>);
          })}
        </ul>
      </header>
    );
    /* jshint ignore:end */
  }
});

module.exports = Header;
