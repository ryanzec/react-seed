import store from '../../../../web/app/store/store';
import {users as usersRepository} from '../../../../web/app/repositories/index';
import * as testHelper from'../../../test-helper';
import nock from 'nock';

let scope = nock('http://localhost:80');

describe('user reducer', function() {
  before(function() {
    testHelper.mockNockRequest(scope, 'users', 'get', '123');
  });

  after(function() {
    expect(scope.pendingMocks().length).to.equal(0);
  });

  it('should load user data', function(done) {
    usersRepository.getUser(123).then(function() {
      expect(store.getState().users.getIn(['activeUser']).toJS()).to.deep.equal(testHelper.mockedData.users.oneTwoThree);
      done();
    });
  });
});
