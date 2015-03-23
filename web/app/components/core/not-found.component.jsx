var React = require('react/addons');

var notFound = {};

notFound.displayName = 'NotFound';

notFound.render = function notFoundComponentRender() {
  return <h2>Not Found</h2>;
};

module.exports = React.createClass(notFound);
