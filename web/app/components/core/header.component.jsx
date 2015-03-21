var React = require('react/addons');
var menuStore = require('../../stores/menu.store');
var Link = require('react-router').Link;

var Header = React.createClass({
  getInitialState: function headerComponentGetInitialState() {
    return {
      menu: menuStore.getMenu()
    };
  },

  onChange: function headerComponentOnChange() {
    this.setState({
      menu: menuStore.getMenu()
    });
  },

  componentDidMount: function headerComponentComponentDidMount() {
    menuStore.on('activeMenuUpdated', this.onChange);
  },

  componentWillUnmount: function headerComponentComponentWillUnmount() {
    menuStore.removeListener('activeMenuUpdated', this.onChange);
  },

  render: function headerComponentRender() {
    return (
      <header>
        <ul>
          {this.state.menu.map(function headerComponentMapMenu(menuItem) {
            return (<li key={menuItem.href}>
              <Link to={menuItem.href}>{menuItem.display}</Link>
            </li>);
          })}
        </ul>
      </header>
    );
  }
});

module.exports = Header;
