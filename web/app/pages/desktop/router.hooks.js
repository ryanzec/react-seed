import store from '../../store/store';
import usersActions from '../../store/users/users.actions';
import usersRepository from '../../repositories/users.repository';

export const desktop = {
  onEnter: function(nextState, replace, callback) {
    store.dispatch(usersActions.clearActive());
    callback();
  }
};

export const withResolves = {
  onEnter: function(nextState, replace, callback) {
    usersRepository.getUser(124).then(function(user) {
      store.dispatch(usersActions.setActive(user));
      callback();
      }, function() {
      replace({
        path: '/desktop',
        state: {
          nextPathname: nextState.location.pathname
        }
      });
      callback();
    });
  }
};
