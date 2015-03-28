var backend = require('ryanzec-mocked-backend');
var mockedRequests = require('./requests/index');
var _ = require('lodash');

var mockRequest = function mockRequest(options) {
  var extend = function extend(target, source) {
    var newObject = Object.create(target);

    Object.keys(source).map(function (prop) {
      prop in newObject && (newObject[prop] = source[prop]);
    });

    return newObject;
  };

  var method = options.method || 'GET';
  var url = options.url;
  var delay = options.delay || 0;
  var responseHeaders = extend({
    'content-type': 'application/json'
  }, options.responseHeaders || {});
  var responseHttpStatus = options.responseHttpStatus || 200;

  backend
  .when(method, options.url, options.requestPayload, options.requestHeaders)
  .options( {
    delay: delay
  })
  .respond(responseHttpStatus, options.response, responseHeaders);
};

_.forEach(mockedRequests, function(resourceRequests, resourceName) {
  _.forEach(resourceRequests, function(requests, httpVerb) {
    _.forEach(requests, function(requestMetaData, requestKey) {
      var mockRequestObject = {
        method: httpVerb.toUpperCase(),
        url: requestMetaData.url,
        response: requestMetaData.response
      };

      if (requestMetaData.delay) {
        mockRequestObject.delay = requestMetaData.delay;
      }

      if (requestMetaData.requestHeaders) {
        mockRequestObject.requestHeaders = requestMetaData.requestHeaders;
      }

      mockRequest(mockRequestObject);
    });
  });
});

