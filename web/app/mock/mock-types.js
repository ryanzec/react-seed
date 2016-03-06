import Uri from 'jsuri';

let uri = new Uri(location.href);
let mockTypes = uri.getQueryParamValue('mockTypes');

if (mockTypes) {
  mockTypes = mockTypes.split(',');
} else {
  mockTypes = [];
}

export const contains = (type) => {
  return (mockTypes.indexOf(type) !== -1);
};
