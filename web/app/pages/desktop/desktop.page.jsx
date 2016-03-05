import React from 'react';
import {connect} from 'react-redux';
import menuActions from '../../store/actions/menu.actions';
import usersActions from '../../store/actions/users.actions';
import usersRepository from '../../repositories/users.repository';

import userImage from '../../images/user.png';

class DesktopPage extends React.Component {
  constructor(props) {
    super(props);

    this.onClickGetUser = this.onClickGetUser.bind(this);
  }

  componentDidMount() {
    this.context.store.dispatch(menuActions.setActive('desktop'));
  }

  onClickGetUser() {
    usersRepository.getUser(123).then((user) => {
      this.context.store.dispatch(usersActions.setActive(user));
    });
  }

  renderUserData() {
    let userData = null;

    if (this.props.user) {
      userData = (
        <ul className="user-data">
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

DesktopPage.displayName = 'DesktopPage';

DesktopPage.propTypes = {
  user: React.PropTypes.object
};

DesktopPage.contextTypes = {
  store: React.PropTypes.object
};

let mapStateToProps = (state) => {
  return {
    user: state.users.getIn(['activeUser']) ? state.users.getIn(['activeUser']).toJS() : null
  };
};

export default connect(mapStateToProps)(DesktopPage);
