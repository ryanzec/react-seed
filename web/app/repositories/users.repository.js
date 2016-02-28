import {Promise} from 'bluebird';
import {get} from 'superagent';

let getUser = (userId) => {
  return new Promise(function(resolve, reject) {
    get('/api/v1/users/' + userId, function(err, response) {
      resolve(response.body.data.users[0]);
    });
  });
};

export default {
  getUser
};
