import * as constants from './prevent-double-click.constants';

let enable = () => {
  return {
    type: constants.ENABLE
  };
};

let disable = () => {
  return {
    type: constants.DISABLE
  };
};

export default {
  enable,
  disable
};
