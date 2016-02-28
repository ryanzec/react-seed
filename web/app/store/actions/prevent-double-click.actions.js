let enable = () => {
  return {
    type: 'PreventDoubleClick::enable'
  };
};

let disable = () => {
  return {
    type: 'PreventDoubleClick::disable'
  };
};

export default {
  enable,
  disable
};
