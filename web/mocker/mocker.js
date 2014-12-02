var _ = require('lodash');
var crypto = require('crypto');
var mocks = {};
var mockOptions = {};

function sleep(wait) {
  var defer = bluebird.defer();

  setTimeout(function() {
    defer.resolve();
  }, wait);

  return defer.promise;
};

var mocker = {
  buildMockKey: function(requestData) {
    var shasum = crypto.createHash('sha1');
    var string = requestData.method + requestData.path;

    if(requestData.body) {
      if(requestData.contentType === 'application/json') {
        string += JSON.stringify(requestData.body);
      } else {
        string += requestData.body;
      }
    }

    //console.log(string);

    shasum.update(string);

    return shasum.digest('hex');
  },

  isMockerRequest: function(requestData) {
    var key = this.buildMockKey(requestData);
    //console.log('checking for mock: ' + key);
    return mocks[key] !== undefined;
  },

  mock: function(requestData, response) {
    var key = this.buildMockKey(requestData);
    var options = mockOptions[key];
    //console.log('checking for mock: ' + key);
    //console.log(mocks[key]);

    _.extend(response, mocks[this.buildMockKey(requestData)]);

    return options || false;
  },

  addMock: function(requestData, mockedData, options) {
    var key = this.buildMockKey(requestData);
    //console.log('checking for mock: ' + key);
    mocks[this.buildMockKey(requestData)] = mockedData;

    if(options) {
      mockOptions[key] = options;
    }
  }
};

var dataFilesToLoad = [
  'core'
];

dataFilesToLoad.forEach(function(file) {
  require('./mocks/' + file)(mocker);
});

module.exports = mocker;
