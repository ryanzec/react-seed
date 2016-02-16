var store = require('../../store/store');
var actions = require('../../store/actions');

module.exports = {
  onEnter: function(nextState, replace, callback) {
    store.dispatch(actions.users.clearActive());
    callback();
  }
};
