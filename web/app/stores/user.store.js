var storeGenerator = require('./store-generator');
var bluebird = require('bluebird');
var request = require('superagent');

module.exports = storeGenerator({
  getUser: function userStoreGetUser(userId) {
    var defer = bluebird.defer();

    request.get('/api/v1/users/' + userId, function userStoreGetUserSuccess(response) {
      defer.resolve(response.body.data.users[0]);
    });

    return defer.promise;
  }
});
