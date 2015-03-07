var React = require('react/addons');
var menuStore = require('../menu/menu.store');
var bluebird = require('bluebird');

var WithResolves = React.createClass({
  statics: {
    willTransitionTo: function withResolvesComponentWillTransitionTo(transition, params) {
      var defer = bluebird.defer();
      var defer2 = bluebird.defer();
      setTimeout(function timeout1() {
        defer.resolve('test');
      }, 1000);
      setTimeout(function timeout2() {
        defer2.resolve('test');
      }, 3000);
      transition.wait(bluebird.all([defer.promise, defer2.promise]));
    }
  },

  componentDidMount: function withResolvesComponentComponentDidMount() {
    menuStore.update({
      menuName: 'desktop'
    });
  },

  render: function withResolvesComponentRender() {
    return (
      <h1 id="test" className="test">{window.i18n['desktop/with-resolves'].header()}</h1>
    );
  }
});

module.exports = WithResolves;
