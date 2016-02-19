import * as backend from 'ryanzec-mocked-backend';
import * as mockedRequests from './requests/index';
import * as _ from 'lodash';

let mockRequest = (options) => {
  let extend = (target, source) => {
    let newObject = Object.create(target);

    Object.keys(source).map((prop) => {
      prop in newObject && (newObject[prop] = source[prop]);
    });

    return newObject;
  };

  let method = options.method || 'GET';
  let url = options.url;
  let delay = options.delay || 0;
  let responseHeaders = extend({
    'content-type': 'application/json'
  }, options.responseHeaders || {});
  let responseHttpStatus = options.responseHttpStatus || 200;

  backend
  .when(method, options.url, options.requestPayload, options.requestHeaders)
  .options( {
    delay: delay
  })
  .respond(responseHttpStatus, options.response, responseHeaders);
};

_.forEach(mockedRequests, (resourceRequests, resourceName) => {
  _.forEach(resourceRequests, (requests, httpVerb) => {
    _.forEach(requests, (requestMetaData, requestKey) => {
      let mockRequestObject = {
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

