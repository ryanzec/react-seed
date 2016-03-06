import * as constants from './users.constants';

let setActive = (user) => {
  return {
    type: constants.SET_ACTIVE,
    user: user
  };
};

let clearActive = () => {
  return {
    type: constants.CLEAR
  };
};


export default {
  setActive,
  clearActive
};
