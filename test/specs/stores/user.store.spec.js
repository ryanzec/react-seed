var nock = require('nock');
var store = require('../../../web/app/stores/user.store');
var testHelper = require('../../test-helper');

var scope = nock('http://localhost:80');

describe('user store', function() {
  before(function(){
    testHelper.mockNockRequest(scope, 'users', 'get', '123');
  });

  after(function() {
    expect(scope.pendingMocks().length).to.equal(0);
  });

  it('should be able to get a user', function() {
    expect(store.getUser(123)).to.eventually.deep.equal(testHelper.mockedData.users['123']);
  });
});
