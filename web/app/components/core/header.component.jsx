var React = require('react/addons');
var menuStore = require('../../stores/menu.store');
var Link = require('react-router').Link;

var header = {};

header.displayName = 'Header';

header.getInitialState = function headerComponentGetInitialState() {
  return {
    menu: menuStore.getMenu()
  };
};

header.onChange = function headerComponentOnChange() {
  this.setState({
    menu: menuStore.getMenu()
  });
};

header.componentDidMount = function headerComponentComponentDidMount() {
  menuStore.on('activeMenuUpdated', this.onChange);
};

header.componentWillUnmount = function headerComponentComponentWillUnmount() {
  menuStore.removeListener('activeMenuUpdated', this.onChange);
};

header.render = function headerComponentRender() {
  return (
    <header>
      <ul>
        {this.state.menu.map(function headerComponentMapMenu(menuItem) {
          return (
            <li key={menuItem.href}>
              <Link className={menuItem.className} to={menuItem.href}>{menuItem.display}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

module.exports = React.createClass(header);
