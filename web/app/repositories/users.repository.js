import {defer} from 'bluebird';
import {get} from 'superagent';
import {dispatch} from '../store/store';
import {users as userActions} from '../store/actions';

module.exports = {
  getUser: function(userId) {
    let myDefer = defer();

    get('/api/v1/users/' + userId, function(err, response) {
      dispatch(userActions.setActive(response.body.data.users[0]));

      myDefer.resolve();
    });

    return myDefer.promise;
  }
};
