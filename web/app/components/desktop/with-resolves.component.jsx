var React = require('react/addons');
var menuStore = require('../../stores/menu.store');
var userStore = require('../../stores/user.store');

var preLoadedData = {};
var withResolves = {};

withResolves.displayName = 'WithResolves';

withResolves.statics = {
  willTransitionTo: function withResolvesComponentWillTransitionTo(transition, params, query, callback) {
    userStore.getUser(124).then(function withResolvesComponentWillTransitionToSuccess(user) {
      preLoadedData.user = user;
      callback();
    });
  }
};

withResolves.getInitialState = function desktopComponentGetInitialState() {
  return {
    user: preLoadedData.user
  };
};

withResolves.componentDidMount = function withResolvesComponentComponentDidMount() {
  menuStore.update({
    menuName: 'desktop'
  });
};

withResolves.renderUserData = function desktopComponentRenderUserData() {
  var userData = null;

  /*istanbul ignore else*/
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
};

withResolves.render = function withResolvesComponentRender() {
  return (
    <span className="p-with-resolves">
      <h1 id="test" className="test">{window.i18n['desktop/with-resolves'].header()}</h1>
      {this.renderUserData()}
    </span>
  );
};

module.exports = React.createClass(withResolves);
