var React = require('react/addons');
var menuActions = require('fluxe').getActions(require('../menu/menu.store').storeName);
var bluebird = require('bluebird');

var WithResolves = React.createClass({
  statics: {
    willTransitionTo: function (transition, params) {
      var defer = bluebird.defer();
      var defer2 = bluebird.defer();
      setTimeout(function() {
        defer.resolve('test');
      }, 1000);
      setTimeout(function() {
        defer2.resolve('test');
      }, 3000);
      transition.wait(bluebird.all([defer.promise, defer2.promise]));
    }
  },

  componentDidMount: function() {
    menuActions.update({
      menuName: 'desktop'
    });
  },
  render: function() {
    return (
      <h1 id="test" className="test">With Resolves</h1>
    );
  }
});

module.exports = WithResolves;
