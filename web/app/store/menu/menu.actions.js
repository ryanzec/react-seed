import * as constants from './menu.constants';

let setActive = (menuName) => {
  return {
    type: constants.SET_ACTIVE,
    menuName: menuName
  };
};

export default {
  setActive
};
