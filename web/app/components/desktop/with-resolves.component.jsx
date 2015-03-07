var React = require('react/addons');
var menuStore = require('../menu/menu.store');
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
    menuStore.update({
      menuName: 'desktop'
    });
  },
  render: function() {
    return (
      <h1 id="test" className="test">{window.i18n['desktop/with-resolves'].header()}</h1>
    );
  }
});

module.exports = WithResolves;
