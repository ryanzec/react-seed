import * as mockedData from '../data/index';
let baseUrl = '/api/v1/users';

export const get = {
  oneTwoThree: {
    url: baseUrl + '/123',
    httpCode: 200,
    response: {
      httpCode: 200,
      data: {
        users: [
          mockedData.users.oneTwoThree
        ]
      },
      errors: []
    },
    delay: 2000
  },
  oneTwoFour: {
    url: baseUrl + '/124',
    httpCode: 200,
    response: {
      httpCode: 200,
      data: {
        users: [
          mockedData.users.oneTwoFour
        ]
      },
      errors: []
    },
    delay: 1000
  }
};
