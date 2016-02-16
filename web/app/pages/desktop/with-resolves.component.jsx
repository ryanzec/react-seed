var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../../store/actions');

var preLoadedData = {};
var withResolves = {};

withResolves.displayName = 'WithResolves';

withResolves.contextTypes = {
  store: React.PropTypes.object
};

withResolves.componentDidMount = function withResolvesComponentComponentDidMount() {
  this.context.store.dispatch(actions.menu.setActive('desktop'));
};

withResolves.renderUserData = function desktopComponentRenderUserData() {
  var userData = null;

  /*istanbul ignore else*/
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

withResolves.render = function withResolvesComponentRender() {
  return (
    <span className="p-with-resolves">
      <h1 id="test" className="test">{window.i18n['desktop/with-resolves'].header()}</h1>
      {this.renderUserData()}
    </span>
  );
};

var mapStateToProps = function(state) {
  return {
    user: state.users.getIn(['activeUser']) ? state.users.getIn(['activeUser']).toJS() : null
  };
};

module.exports = reactRedux.connect(mapStateToProps)(React.createClass(withResolves));
