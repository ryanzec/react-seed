var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../../store/actions');
var usersRepository = require('../../repositories/users.repository');

var desktop = {};

desktop.displayName = 'Desktop';

desktop.contextTypes = {
  store: React.PropTypes.object
};

desktop.componentDidMount = function desktopComponentComponentDidMount() {
  this.context.store.dispatch(actions.menu.setActive('desktop'));
};

desktop.onClickGetUser = function desktopComponentOnClickGetUser() {
  setTimeout(function() {
    usersRepository.getUser(123);
  }, 2000);
};

desktop.renderUserData = function desktopComponentRenderUserData() {
  var userData = null;

  if (this.props.user) {
    userData = (
      <ul>
        <li className="user-id">{this.props.user.id}</li>
        <li className="user-username">{this.props.user.username}</li>
        <li className="user-first-name">{this.props.user.firstName}</li>
        <li className="user-last-name">{this.props.user.lastName}</li>
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
        <img src={require('../../images/user.png')} />
        <button className="load-user-data" onClick={this.onClickGetUser}>Get User Data</button>
        {this.renderUserData()}
      </div>
    </div>
  );
};

var mapStateToProps = function(state) {
  return {
    user: state.users.getIn(['activeUser']) ? state.users.getIn(['activeUser']).toJS() : null
  };
};

module.exports = reactRedux.connect(mapStateToProps)(React.createClass(desktop));
