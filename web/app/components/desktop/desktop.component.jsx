var React = require('react/addons');
var menuStore = require('../../stores/menu.store');
var userStore = require('../../stores/user.store');

var desktop = {};

desktop.displayName = 'Desktop';

desktop.getInitialState = function desktopComponentGetInitialState() {
  return {
    user: null
  };
};

desktop.componentDidMount = function desktopComponentComponentDidMount() {
  menuStore.update({
    menuName: 'desktop'
  });
};

desktop.onClickGetUser = function desktopComponentOnClickGetUser() {
  userStore.getUser(123).then(function desktopComponentOnGetUserSuccess(user) {
    this.setState({
      user: user
    });
  }.bind(this));
};

desktop.renderUserData = function desktopComponentRenderUserData() {
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
};

desktop.render = function desktopComponentRender() {
  return (
    <div className="p-desktop">
      <h1 id="test" className="test">{window.i18n['desktop/desktop'].header()}</h1>
      <div>
        <button className="load-user-data" onClick={this.onGetUser}>Get User Data</button>
        {this.renderUserData()}
      </div>
    </div>
  );
};

module.exports = React.createClass(desktop);
