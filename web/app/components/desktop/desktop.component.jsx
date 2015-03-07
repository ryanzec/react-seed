var React = require('react/addons');
var menuStore = require('../menu/menu.store');
var request = require('superagent');

var Desktop = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },

  componentDidMount: function() {
    menuStore.update({
      menuName: 'desktop'
    });
  },

  onGetUser: function() {
    request.get('/api/users/1', function(response) {
      this.setState({
        user: response.body
      });
    }.bind(this));
  },

  renderUserData: function() {
    var userData = null;

    if(this.state.user) {
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

  render: function() {
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
