import store from '../../../../web/app/store/store';
import usersActions from '../../../../web/app/store/users/users.actions';
import usersRepository from '../../../../web/app/repositories/users.repository';
import * as testHelper from'../../../test-helper';

describe('user reducer', function() {
  it('should be able to set active user', function() {
    const user = {
      id: 123,
      firstName: 'Test',
      lastName: 'User',
      username: 'test.user'
    };
    store.dispatch(usersActions.setActive(user));

    const state = store.getState();

    expect(state.users.get('activeUser').toJS()).to.deep.equal(user);
  });
});
