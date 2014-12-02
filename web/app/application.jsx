require('./fluxe-loader');
var React = require('react/addons');
var Application = require('./components/core/application.component.jsx');
var Desktop = require('./components/desktop/desktop.component.jsx');
var PreventDoubleClick = require('./components/desktop/prevent-double-click.component.jsx');
var WithResolves = require('./components/desktop/with-resolves.component.jsx');
var router = require('./components/core/router.js');
var bluebird = require('bluebird');

//add the main application component
React.render(<Application />, document.body);

//set default route
router.setDefaultRoute('/desktop');

//add routes
router.addRoute({
  route: '/desktop',
  callback: function() {
    React.render(<Desktop />, document.querySelector('.main-content'));
  }
});

router.addRoute({
  route: '/prevent-double-click',
  callback: function() {
    React.render(<PreventDoubleClick />, document.querySelector('.main-content'));
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
    React.render(<WithResolves />, document.querySelector('.main-content'));
  }
})

//start the router
router.start();
