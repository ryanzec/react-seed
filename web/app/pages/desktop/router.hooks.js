import store from '../../store/store';
import {users as userActions} from '../../store/actions';
import {users as usersRepository} from '../../repositories/index';

let desktop = {
  onEnter: function(nextState, replace, callback) {
    store.dispatch(userActions.clearActive());
    callback();
  }
};

let withResolves = {
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
};

export {
  desktop,
  withResolves
};
