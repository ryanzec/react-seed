(function() {
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
    url: '/api/users/1',
    response: {
      id: 123,
      firstName: 'Test',
      lastName: 'User',
      username: 'test.user'
    }
  });
})();
