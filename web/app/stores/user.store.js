var storeGenerator = require('./store-generator');
var bluebird = require('bluebird');
var request = require('superagent');

module.exports = storeGenerator({
  getUser: function(userId) {
    var defer = bluebird.defer();

    request.get('/api/v1/users/' + userId, function(response) {
        defer.resolve(response.body);
    }.bind(this));

    return defer.promise;
  }
});
