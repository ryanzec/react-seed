module.exports = {
  setActive: function(user) {
    return {
      type: 'Users::setActive',
      user: user
    };
  },

  clearActive: function() {
    return {
      type: 'Users::clear'
    };
  }
};
