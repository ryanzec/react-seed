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
