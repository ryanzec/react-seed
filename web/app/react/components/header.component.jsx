import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createSelector} from 'reselect';

const generateLinkWithParams = (path, params) => {
  if (!params) {
    return path;
  }

  paramPath = path;

  params.forEach((param) => {
    paramPath += `/${param}`;
  });

  return paramPath;
}

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <ul>
          {this.props.menu.map(function(menuItem) {
            return (
              <li key={menuItem.href}>
                <Link className={menuItem.className} to={generateLinkWithParams(menuItem.href, menuItem.params)}>{menuItem.display}</Link>
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
