let setActive = (menuName) => {
  return {
    type: 'Menu::setActive',
    menuName: menuName
  };
};

export default {
  setActive
};
