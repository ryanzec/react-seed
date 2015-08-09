var React = require('react/addons');
var menuStore = require('../../stores/menu.store');

var withParam = {};

withParam.displayName = 'RouteParam';

withParam.componentDidMount = function withParamComponentComponentDidMount() {
  menuStore.update({
    menuName: 'desktop'
  });
};

withParam.render = function withParamComponentRender() {
  return (
    <div className="p-with-param">
      <div>
        Param: <span className="param-value">{this.props.routerState.params.p1}</span>
      </div>
    </div>
  );
};

module.exports = React.createClass(withParam);
