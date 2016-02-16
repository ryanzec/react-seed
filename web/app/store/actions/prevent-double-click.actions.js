module.exports = {
  enable: function() {
    return {
      type: 'PreventDoubleClick::enable'
    };
  },

  disable: function() {
    return {
      type: 'PreventDoubleClick::disable'
    };
  }
};
