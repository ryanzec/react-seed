var menus = {
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

module.exports = function(state, action) {
  if (typeof state === 'undefined') {
    return menus.desktop;
  }

  switch(action.type) {
    case 'Menu::setActive':
      return menus[action.menuName];
      break;

    default:
      return state;
  }
};
