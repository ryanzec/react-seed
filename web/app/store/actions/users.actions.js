let setActive = (user) => {
  return {
    type: 'Users::setActive',
    user: user
  };
};

let clearActive = () => {
  return {
    type: 'Users::clear'
  };
};


export default {
  setActive,
  clearActive
};
