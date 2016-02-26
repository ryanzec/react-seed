import {Promise} from 'bluebird';
import {get} from 'superagent';
import store from '../store/store';
import {users as userActions} from '../store/actions';

let getUser = (userId) => {
  return new Promise(function(resolve, reject) {
    get('/api/v1/users/' + userId, function(err, response) {
      store.dispatch(userActions.setActive(response.body.data.users[0]));

      resolve();
    });
  });
};

export {
  getUser
};
