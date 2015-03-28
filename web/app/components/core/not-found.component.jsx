var React = require('react/addons');

var notFound = {};

notFound.displayName = 'NotFound';

notFound.render = function notFoundComponentRender() {
  return <h1>Not Found</h1>;
};

module.exports = React.createClass(notFound);
