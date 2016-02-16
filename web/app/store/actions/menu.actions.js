module.exports = {
  setActive: function(menuName) {
    return {
      type: 'Menu::setActive',
      menuName: menuName
    };
  }
};
