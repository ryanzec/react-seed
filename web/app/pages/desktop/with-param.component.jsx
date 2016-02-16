var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../../store/actions');

var withParam = {};

withParam.displayName = 'RouteParam';

withParam.contextTypes = {
  store: React.PropTypes.object
};

withParam.componentDidMount = function withParamComponentComponentDidMount() {
  this.context.store.dispatch(actions.menu.setActive('desktop'));
};

withParam.render = function withParamComponentRender() {
  return (
    <div className="p-with-param">
      <div>
        Param: <span className="param-value">{this.props.p1}</span>
      </div>
    </div>
  );
};

var mapStateToProps = function(state, ownProps) {
  return {
    p1: ownProps.params.p1
  };
};

module.exports = reactRedux.connect(mapStateToProps)(React.createClass(withParam));
