import {fromJS} from 'immutable';

let initialState = {
  activeUser: null
};

module.exports = function(state, action) {
  if (typeof state === 'undefined') {
    return fromJS(initialState);
  }

  let newState;

  switch (action.type) {
    case 'Users::setActive':
      newState = state.setIn(['activeUser'], fromJS(action.user));
      break;

    case 'Users::clear':
      newState = state.setIn(['activeUser'], null);
      break;

    default:
      newState = state;
  }

  return newState;
};
