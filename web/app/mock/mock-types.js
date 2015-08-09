var Uri = require('jsuri');
var uri = new Uri(location.href);
var mockTypes = uri.getQueryParamValue('mockTypes');

if (mockTypes) {
  mockTypes = mockTypes.split(',');
} else {
  mockTypes = [];
}

module.exports = {
  contains: function(type) {
    return (mockTypes.indexOf(type) !== -1);
  }
};
