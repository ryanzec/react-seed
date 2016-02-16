var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../../store/actions');

var preventDoubleClick = {};

preventDoubleClick.displayName = 'PreventDoubleClick';

preventDoubleClick.contextTypes = {
  store: React.PropTypes.object
};

preventDoubleClick.componentDidMount = function preventDoubleClickComponentComponentDidMount() {
  this.context.store.dispatch(actions.menu.setActive('preventDoubleClick'));
};

preventDoubleClick.onClickPreventDoubleClick = function preventDoubleClickComponentOnClickPreventDoubleClick() {
  if (this.props.preventDoubleClick === false) {
    this.context.store.dispatch(actions.preventDoubleClick.enable());
  } else {
    this.context.store.dispatch(actions.preventDoubleClick.disable());
  }
};

preventDoubleClick.render = function preventDoubleClickComponentRender() {
  return (
    <div className="p-prevent-double-click">
      <h1 id="test" className="test">{window.i18n['desktop/prevent-double-click'].header()}</h1>
      <div>
        <button disabled={this.props.preventDoubleClick}>{window.i18n['desktop/prevent-double-click'].button1()}</button>
        <button onClick={this.onClickPreventDoubleClick}>{window.i18n['desktop/prevent-double-click'].button2()}</button>
      </div>
    </div>
  );
};

var mapStateToProps = function(state) {
  return {
    preventDoubleClick: state.preventDoubleClick
  };
};

module.exports = reactRedux.connect(mapStateToProps)(React.createClass(preventDoubleClick));
