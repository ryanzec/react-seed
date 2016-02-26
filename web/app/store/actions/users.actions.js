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


export {
  setActive,
  clearActive
};
