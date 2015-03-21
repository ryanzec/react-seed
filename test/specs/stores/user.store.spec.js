var store = require('../../../web/app/stores/user.store');
var testHelper = require('../../test-helper');
var request = require('superagent');
var sinon = require('sinon');

describe('user store', function() {
  before(function() {
    sinon.stub(request, 'get', function(url, callback) {
      if (url === '/api/v1/users/123') {
        callback({
          body: testHelper.mockedData.users['123']
        });
      }
    });
  });

  after(function() {
    request.get.restore();
  });

  it('should be able to get a user', function() {
    expect(store.getUser(123)).to.eventually.deep.equal(testHelper.mockedData.users['123']);
  });
});
