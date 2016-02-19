let preventDoubleClick = false;

module.exports = function(state, action) {
  if (typeof state === 'undefined') {
    return preventDoubleClick;
  }

  let newState;

  switch (action.type) {
    case 'PreventDoubleClick::enable':
      newState = true;
      break;

    case 'PreventDoubleClick::disable':
      newState = false;
      break;

    default:
      newState = state;
  }

  return newState;
};
