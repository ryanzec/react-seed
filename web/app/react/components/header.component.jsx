import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createSelector} from 'reselect';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
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
  menu: React.PropTypes.array
};

// NOTE: this is a trivial example that does not need a selector as no calculations are being performed on the state's data however this is just an ecample to
// NOTE: show the use of reselect to create a memoized selected that will not be recalculated if its data does not change
const menuSelector = (state) => state.menu;

const testSelector = createSelector(
  menuSelector,
  (menu) => {
    //NOTE: expensive calculations would be done here
    console.log('header map state to props');
    return {
      menu: menu
    };
  }
);

export default connect(testSelector)(Header);
