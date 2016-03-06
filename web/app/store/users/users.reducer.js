import {fromJS} from 'immutable';
import * as constants from './users.constants';

let initialState = {
  activeUser: null
};

export default function(state, action) {
  if (typeof state === 'undefined') {
    return fromJS(initialState);
  }

  let newState;

  switch (action.type) {
    case constants.SET_ACTIVE:
      newState = state.setIn(['activeUser'], fromJS(action.user));
      break;

    case constants.CLEAR:
      newState = state.setIn(['activeUser'], null);
      break;

    default:
      newState = state;
  }

  return newState;
};
