import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <ul>
          {this.props.menu.map(function(menuItem) {
            let link;

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
  }
}

Header.displayName = 'Header';

Header.propTypes = {
  menu: React.propTypes.array
};

let mapStateToProps = function(state) {
  return {
    menu: state.menu
  };
};

module.exports = connect(mapStateToProps)(Header);
