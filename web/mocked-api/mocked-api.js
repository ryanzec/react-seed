var backend = require('ryanzec-mocked-backend');
var mockedData = require ('./data/index');
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

mockRequest({
  url: '/api/v1/users/123',
  response: mockedData.users['123']
});

mockRequest({
  url: '/api/v1/users/124',
  delay: 1000,
  response: mockedData.users['124']
});
