import {dispatch} from '../../store/store';
import {users as userActions} from '../../store/actions';
import {users as usersRepository} from '../../repositories/index';

module.exports = {
  desktop: {
    onEnter: function(nextState, replace, callback) {
      dispatch(userActions.clearActive());
      callback();
    }
  },
  withResolves: {
    onEnter: function(nextState, replace, callback) {
      usersRepository.getUser(124).then(function() {
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
  }
};
