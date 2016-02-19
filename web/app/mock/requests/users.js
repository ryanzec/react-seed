import * as mockedData from '../data/index';
let baseUrl = '/api/v1/users';

module.exports = {
  get: {
    '123': {
      url: baseUrl + '/123',
      httpCode: 200,
      response: {
        httpCode: 200,
        data: {
          users: [
            mockedData.users['123']
          ]
        },
        errors: []
      }
    },
    '124': {
      url: baseUrl + '/124',
      httpCode: 200,
      response: {
        httpCode: 200,
        data: {
          users: [
            mockedData.users['124']
          ]
        },
        errors: []
      },
      delay: 1000
    }
  }
};
