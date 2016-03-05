import React from 'react';
import {connect} from 'react-redux';
import menuActions from '../../store/actions/menu.actions';

class WithResolves extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.context.store.dispatch(menuActions.setActive('desktop'));
  }

  renderUserData() {
    let userData = null;

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
  }

  render() {
    return (
      <span className="p-with-resolves">
        <h1 id="test" className="test">{window.i18n['desktop/with-resolves'].header()}</h1>
        {this.renderUserData()}
      </span>
    );
  }
}

WithResolves.displayName = 'WithResolves';

WithResolves.propTypes = {
  user: React.PropTypes.object
};

WithResolves.contextTypes = {
  store: React.PropTypes.object
};

let mapStateToProps = function(state) {
  return {
    user: state.users.getIn(['activeUser']) ? state.users.getIn(['activeUser']).toJS() : null
  };
};

export default connect(mapStateToProps)(WithResolves);
