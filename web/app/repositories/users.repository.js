var bluebird = require('bluebird');
var request = require('superagent');
var store = require('../store/store');
var actions = require('../store/actions');

module.exports = {
  getUser: function userStoreGetUser(userId) {
    var defer = bluebird.defer();

    request.get('/api/v1/users/' + userId, function userStoreGetUserSuccess(err, response) {
      store.dispatch(actions.users.setActive(response.body.data.users[0]));

      defer.resolve();
    });

    return defer.promise;
  }
};
