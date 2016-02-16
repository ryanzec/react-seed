var React = require('react');

var Header = require('./header.component.jsx');

//TODO: remove: for testing assets rewrite process
var removeMe = '/app/svg/remove-me.svg#icon-small';

var application = {};

application.displayName = 'Application';

application.render = function applicationRender() {
  return (
    <div className="application">
      <Header />
      {this.props.children}
    </div>
  );
};

module.exports = React.createClass(application);
