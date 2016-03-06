import * as constants from './prevent-double-click.constants';

let preventDoubleClick = false;

export default function(state, action) {
  if (typeof state === 'undefined') {
    return preventDoubleClick;
  }

  let newState;

  switch (action.type) {
    case constants.ENABLE:
      newState = true;
      break;

    case constants.DISABLE:
      newState = false;
      break;

    default:
      newState = state;
  }

  return newState;
};
