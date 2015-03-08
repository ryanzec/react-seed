var React = require('react/addons');
var menuStore = require('../menu/menu.store');
var request = require('superagent');

var Desktop = React.createClass({
  getInitialState: function desktopComponentGetInitialState() {
    return {
      user: null
    };
  },

  componentDidMount: function desktopComponentComponentDidMount() {
    menuStore.update({
      menuName: 'desktop'
    });
  },

  onGetUser: function desktopComponentOnGetUser() {
    request.get('/api/users/1', function desktopComponentOnGetUserRequest(response) {
      this.setState({
        user: response.body
      });
    }.bind(this));
  },

  renderUserData: function desktopComponentRenderUserData() {
    var userData = null;

    if (this.state.user) {
      userData = (
        <ul>
          <li>{this.state.user.id}</li>
          <li>{this.state.user.username}</li>
          <li>{this.state.user.firstName}</li>
          <li>{this.state.user.lastName}</li>
        </ul>
      );
    }

    return userData;
  },

  render: function desktopComponentRender() {
    return (
      <div className="p-desktop">
        <h1 id="test" className="test">{window.i18n['desktop/desktop'].header()}</h1>
        <div>
          <button onClick={this.onGetUser}>Get User Data</button>
          {this.renderUserData()}
        </div>
      </div>
    );
  }
});

module.exports = Desktop;
