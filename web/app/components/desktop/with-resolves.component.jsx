var React = require('react/addons');
var menuStore = require('../menu/menu.store');
var bluebird = require('bluebird');
var userStore = require('../stores/user.store');

var preLoadedData = {};

var WithResolves = React.createClass({
  statics: {
    willTransitionTo: function withResolvesComponentWillTransitionTo(transition, params, query, callback) {
      userStore.getUser(124).then(function(user) {
        preLoadedData.user = user;
        callback();
      });
    }
  },

  getInitialState: function desktopComponentGetInitialState() {
    return {
      user: preLoadedData.user
    };
  },

  componentDidMount: function withResolvesComponentComponentDidMount() {
    menuStore.update({
      menuName: 'desktop'
    });
  },

  renderUserData: function desktopComponentRenderUserData() {
    var userData = null;

    if (this.state.user) {
      userData = (
        <ul>
          <li className="user-id">{this.state.user.id}</li>
          <li className="user-username">{this.state.user.username}</li>
          <li className="user-first-name">{this.state.user.firstName}</li>
          <li className="user-last-name">{this.state.user.lastName}</li>
        </ul>
      );
    }

    return userData;
  },

  render: function withResolvesComponentRender() {
    return (
      <span>
        <h1 id="test" className="test">{window.i18n['desktop/with-resolves'].header()}</h1>
        {this.renderUserData()}
      </span>
    );
  }
});

module.exports = WithResolves;
