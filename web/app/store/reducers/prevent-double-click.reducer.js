var preventDoubleClick = false;

module.exports = function(state, action) {
  if (typeof state === 'undefined') {
    return preventDoubleClick;
  }

  switch(action.type) {
    case 'PreventDoubleClick::enable':
      return true
      break;

    case 'PreventDoubleClick::disable':
      return false;
      break;

    default:
      return state;
  }
};
