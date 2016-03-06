import * as constants from './menu.constants';

let menus = {
  desktop: [{
    href: 'desktop',
    display: 'Desktop',
    className: 'header-desktop-link'
  }, {
    href: 'prevent-double-click',
    display: 'Prevent Double Click',
    className: 'header-prevent-double-click-link'
  }, {
    href: 'with-param',
    display: 'With Param',
    className: 'with-param-link',
    params: {
      p1: 123
    }
  }],
  preventDoubleClick: [{
    href: 'desktop',
    display: 'Desktop',
    className: 'header-desktop-link'
  }, {
    href: 'prevent-double-click',
    display: 'Prevent Double Click',
    className: 'header-prevent-double-click-link'
  }, {
    href: 'with-resolves',
    display: 'With Resolves',
    className: 'header-with-resolves-link'
  }]
};

export default function(state, action) {
  if (typeof state === 'undefined') {
    return menus.desktop;
  }

  let newState;

  switch (action.type) {
    case constants.SET_ACTIVE:
      newState = menus[action.menuName];
      break;

    default:
      newState = state;
  }

  return newState;
};
