var usersRepository = require('../../repositories/users.repository');

module.exports = {
  onEnter: function(nextState, replace, callback) {
    usersRepository.getUser(124).then(function withResolvesComponentWillTransitionToSuccess(user) {
      callback();
    }, function() {
      replace({
        path: '/desktop',
        state: {
          nextPathname: nextState.location.pathname
        }
      });
      callback();
    });
  }
};
