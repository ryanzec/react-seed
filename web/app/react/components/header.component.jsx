var React = require('react');
var reactRedux = require('react-redux');
var Link = require('react-router').Link;

var header = {};

header.displayName = 'Header';

header.render = function headerComponentRender() {
  return (
    <header>
      <ul>
        {this.props.menu.map(function headerComponentMapMenu(menuItem) {
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

var mapStateToProps = function(state) {
  return {
    menu: state.menu
  };
};

module.exports = reactRedux.connect(mapStateToProps)(React.createClass(header));
