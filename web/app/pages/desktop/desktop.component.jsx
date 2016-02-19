import * as React from 'react';
import {connect} from 'react-redux';
import {menu as menuActions} from '../../store/actions';
import {users as usersRepository} from '../../repositories/index';

import userImage from '../../images/user.png';

class Desktop extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.context.store.dispatch(menuActions.setActive('desktop'));
  }

  onClickGetUser() {
    setTimeout(() => usersRepository.getUser(123), 2000);
  }

  renderUserData() {
    let userData = null;

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
      <div className="p-desktop">
        <h1 id="test" className="test">{window.i18n['desktop/desktop'].header()}</h1>
        <div>
          <img src={userImage} />
          <button className="load-user-data" onClick={this.onClickGetUser}>Get User Data</button>
          {this.renderUserData()}
        </div>
      </div>
    );
  }
}

Desktop.displayName = 'Desktop';

Desktop.propTypes = {
  user: React.PropTypes.object
};

Desktop.contextTypes = {
  store: React.PropTypes.object
};

let mapStateToProps = (state) => {
  return {
    user: state.users.getIn(['activeUser']) ? state.users.getIn(['activeUser']).toJS() : null
  };
};

module.exports = connect(mapStateToProps)(Desktop);
