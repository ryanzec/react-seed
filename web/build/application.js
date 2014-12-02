(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./fluxe-loader');
var React = require('react/addons');
var Application = require('./components/core/application.component.jsx');
var Desktop = require('./components/desktop/desktop.component.jsx');
var PreventDoubleClick = require('./components/desktop/prevent-double-click.component.jsx');
var WithResolves = require('./components/desktop/with-resolves.component.jsx');
var router = require('./components/core/router.js');
var bluebird = require('bluebird');

//add the main application component
React.render(React.createElement(Application, null), document.body);

//set default route
router.setDefaultRoute('/desktop');

//add routes
router.addRoute({
  route: '/desktop',
  callback: function() {
    React.render(React.createElement(Desktop, null), document.querySelector('.main-content'));
  }
});

router.addRoute({
  route: '/prevent-double-click',
  callback: function() {
    React.render(React.createElement(PreventDoubleClick, null), document.querySelector('.main-content'));
  }
});

router.addRoute({
  route: '/with-resolves',
  resolves: {
    data: function(parameters) {
      var defer = bluebird.defer();

      setTimeout(function() {
        defer.resolve(true);
      }, 1000);

      return defer.promise;
    },
    data2: function(parameters) {
      var defer = bluebird.defer();

      setTimeout(function() {
        defer.resolve(true);
      }, 2000);

      return defer.promise;
    }
  },
  callback: function() {
    React.render(React.createElement(WithResolves, null), document.querySelector('.main-content'));
  }
})

//start the router
router.start();

},{"./components/core/application.component.jsx":2,"./components/core/router.js":5,"./components/desktop/desktop.component.jsx":6,"./components/desktop/prevent-double-click.component.jsx":7,"./components/desktop/with-resolves.component.jsx":8,"./fluxe-loader":10,"bluebird":"bluebird","react/addons":"react/addons"}],2:[function(require,module,exports){
var React = require('react/addons');
var Header = require('./header.component.jsx');

var Application = React.createClass({displayName: 'Application',
  render: function() {
    return (
      React.createElement("div", {className: "application"}, 
        React.createElement(Header, null), 
        React.createElement("div", {className: "main-content"})
      )
    );
  }
});

module.exports = Application;

},{"./header.component.jsx":4,"react/addons":"react/addons"}],3:[function(require,module,exports){
module.exports = {
  getPreventDoubleClick: function() {
    return this._internalData.preventDoubleClick;
  },

  storeName: 'Application',

  _dispatcherEvents: {
    'enablePreventDoubleClick': '_onEnablePreventDoubleClick',
    'disablePreventDoubleClick': '_onDisablePreventDoubleClick'
  },

  _internalData: {
    preventDoubleClick: false
  },

  _onEnablePreventDoubleClick: function() {
    this._internalData.preventDoubleClick = true;
    this.emit('preventDoubleClickChanged');
  },

  _onDisablePreventDoubleClick: function() {
    this._internalData.preventDoubleClick = false;
    this.emit('preventDoubleClickChanged');
  }
};

},{}],4:[function(require,module,exports){
var React = require('react/addons');
var menuStore = require('fluxe').getStore(require('../menu/menu.store').storeName);

var Header = React.createClass({displayName: 'Header',
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
    return (
      React.createElement("header", null, 
        React.createElement("ul", null, 
          this.state.menu.map(function(menuItem) {
            return (React.createElement("li", {key: menuItem.href}, 
              React.createElement("a", {href: menuItem.href}, menuItem.display)
            ));
          })
        )
      )
    );
  }
});

module.exports = Header;

},{"../menu/menu.store":9,"fluxe":"fluxe","react/addons":"react/addons"}],5:[function(require,module,exports){
var routes = require('routes');
var myRoutes = routes();
var blurbird = require('bluebird');
var _ = require('lodash');
var resolves = {};
var defaultRoute;
var routeInProgress = false;

function showPage(path) {
  var result = myRoutes.match(path);
  var resolvePromises = [];
  routeInProgress = true;

  if(resolves[result.route]) {
    _.forEach(resolves[result.route], function(resolve) {
      resolvePromises.push(resolve(result.params));
    });
  }

  blurbird.all(resolvePromises).then(function() {
    //prevent a resolvable route from being applied if we have already change the route since the promise were executed
    if(routeInProgress === true) {
      result.fn();
      history.pushState({}, document.title, path);
      routeInProgress = false;
    }
  });
}

function onPopStateEvent(e) {
  if(e.state) {
    var path = e.state.path;
    showPage(path);
  }
}

function onClickEvent(e) {
  function which(e) {
    e = e || window.event;

    return null === e.which
    ? e.button
    : e.which;
  }

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if(location.port) {
      origin += ':' + location.port;
    }

    return (href && (0 === href.indexOf(origin)));
  }

  if(
    (1 !== which(e))
    || (e.metaKey || e.ctrlKey || e.shiftKey)
    || (e.defaultPrevented)
  ) {
    return;
  }

  //ensure link
  var el = e.target;

  while(el && 'A' !== el.nodeName) {
    el = el.parentNode;
  }

  if(!el || 'A' !== el.nodeName) {
    return;
  }

  //Ignore if tag has a "download" attribute
  if(el.getAttribute("download")) {
    return;
  }

  //ensure non-hash for the same path
  var link = el.getAttribute('href');

  if(el.pathname === location.pathname && (el.hash || '#' === link)) {
    return;
  }

  //Check for mailto: in the href
  if(link && link.indexOf("mailto:") > -1) {
    return;
  }

  //check target
  if(el.target) {
    return;
  }

  //x-origin
  if(!sameOrigin(el.href)) {
    return;
  }

  //rebuild path
  var path = el.pathname + el.search + (el.hash || '');

  //ensure not same page
  if(path === location.pathname) {
    e.preventDefault();
    return;
  }

  e.preventDefault();
  showPage(path);
}

var router = {
  setDefaultRoute: function(route) {
    defaultRoute = route;
  },

  addRoute: function(options) {
    myRoutes.addRoute(options.route, options.callback);
    resolves[options.route] = options.resolves;
  },

  start: function(options) {
    window.addEventListener('popstate', onPopStateEvent, false);
    window.addEventListener('click', onClickEvent, false);

    if(location.pathname === '/' && defaultRoute) {
      showPage(defaultRoute);
    } else if(location.pathname !== '/') {
      showPage(location.pathname);
    }
  },

  stop: function() {
    window.removeEventListener('click', onClickEvent, false);
    window.removeEventListener('popstate', onPopStateEvent, false);
  }
};

module.exports = router;

},{"bluebird":"bluebird","lodash":"lodash","routes":"routes"}],6:[function(require,module,exports){
var React = require('react/addons');
var menuActions = require('fluxe').getActions(require('../menu/menu.store').storeName);

var Desktop = React.createClass({displayName: 'Desktop',
  componentDidMount: function() {
    menuActions.update({
      menuName: 'desktop'
    });
  },
  render: function() {
    return (
      React.createElement("h1", {id: "test", className: "test"}, "Desktop")
    );
  }
});

module.exports = Desktop;

},{"../menu/menu.store":9,"fluxe":"fluxe","react/addons":"react/addons"}],7:[function(require,module,exports){
var React = require('react/addons');
var applicationStore = require('fluxe').getStore(require('../core/application.store').storeName);
var applicationActions = require('fluxe').getActions(require('../core/application.store').storeName);
var menuActions = require('fluxe').getActions(require('../menu/menu.store').storeName);

var PreventDoubleClick = React.createClass({displayName: 'PreventDoubleClick',
  getInitialState: function() {
    return {
      preventDoubleClick: applicationStore.getPreventDoubleClick()
    };
  },

  preventDoubleClickClick: function() {
    if(applicationStore.getPreventDoubleClick() === false) {
      applicationActions.enablePreventDoubleClick();
    } else {
      applicationActions.disablePreventDoubleClick();
    }
  },

  componentDidMount: function() {
    menuActions.update({
      menuName: 'preventDoubleClick'
    });
    applicationStore.on('preventDoubleClickChanged', this._callback);
  },

  componentWillUnmount: function() {
    applicationStore.removeListener('preventDoubleClickChanged', this._callback);
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", {id: "test", className: "test"}, "Prevent Double Click"), 
        React.createElement("div", null, 
          React.createElement("button", {disabled: this.state.preventDoubleClick}, "Test"), 
          React.createElement("button", {onClick: this.preventDoubleClickClick}, "Prevent Double Click Other Buttons")
        )
      )
    );
  },

  _callback: function() {
    this.setState({
      preventDoubleClick: applicationStore.getPreventDoubleClick()
    });
  }
});

module.exports = PreventDoubleClick;

},{"../core/application.store":3,"../menu/menu.store":9,"fluxe":"fluxe","react/addons":"react/addons"}],8:[function(require,module,exports){
var React = require('react/addons');
var menuActions = require('fluxe').getActions(require('../menu/menu.store').storeName);

var WithResolves = React.createClass({displayName: 'WithResolves',
  componentDidMount: function() {
    menuActions.update({
      menuName: 'desktop'
    });
  },
  render: function() {
    return (
      React.createElement("h1", {id: "test", className: "test"}, "With Resolves")
    );
  }
});

module.exports = WithResolves;

},{"../menu/menu.store":9,"fluxe":"fluxe","react/addons":"react/addons"}],9:[function(require,module,exports){
module.exports = {
  getMenu: function() {
    return this._internalData.menus[this._internalData.activeMenu];
  },

  storeName: 'Menu',

  _dispatcherEvents: {
    'update': '_onUpdateMenu'
  },

  _internalData: {
    menus: {
      desktop: [{
        href: '/desktop',
        display: 'Desktop'
      }, {
        href: '/prevent-double-click',
        display: 'Prevent Double Click'
      }],
      preventDoubleClick: [{
        href: '/desktop',
        display: 'Desktop'
      }, {
        href: '/prevent-double-click',
        display: 'Prevent Double Click'
      }, {
        href: '/with-resolves',
        display: 'With Resolves'
      }]
    },
    activeMenu: 'desktop'
  },

  _onUpdateMenu: function(options) {
    this._internalData.activeMenu = options.menuName;
    this.emit('activeMenuUpdated');
  }
};

},{}],10:[function(require,module,exports){
var fluxe = require('fluxe');

fluxe.addStore(require('./components/core/application.store'));
fluxe.addStore(require('./components/menu/menu.store'));

},{"./components/core/application.store":3,"./components/menu/menu.store":9,"fluxe":"fluxe"}]},{},[1]);
