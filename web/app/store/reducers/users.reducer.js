var request = require('superagent');
var immutable = require('immutable');

var initialState = {
  activeUser: null
};

module.exports = function(state, action) {
  if (typeof state === 'undefined') {
    return immutable.fromJS(initialState);
  }

  switch(action.type) {
    case 'Users::setActive':
      return state.setIn(['activeUser'], immutable.fromJS(action.user));

    case 'Users::clear':
      return state.setIn(['activeUser'], null);
      break;

    default:
      return state;
  }
};
