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

header.componentDidMount = function headerComponentComponentDidMount() {
  menuStore.on('activeMenuUpdated', this.onChange);
};

header.componentWillUnmount = function headerComponentComponentWillUnmount() {
  menuStore.removeListener('activeMenuUpdated', this.onChange);
};

header.onChange = function headerComponentOnChange() {
  this.setState({
    menu: menuStore.getMenu()
  });
};

header.render = function headerComponentRender() {
  return (
    <header>
      <ul>
        {this.state.menu.map(function headerComponentMapMenu(menuItem) {
          var link;

          if (menuItem.params) {
            link = (
              <Link className={menuItem.className} to={menuItem.href} params={menuItem.params}>{menuItem.display}</Link>
            );
          } else {
            link = (
              <Link className={menuItem.className} to={menuItem.href}>{menuItem.display}</Link>
            );
          }
          return (
            <li key={menuItem.href}>
              {link}
            </li>
          );
        })}
      </ul>
    </header>
  );
};

module.exports = React.createClass(header);
