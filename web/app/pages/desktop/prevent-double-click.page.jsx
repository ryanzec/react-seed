import React from 'react';
import {connect} from 'react-redux';
import menuActions from '../../store/actions/menu.actions';
import preventDoubleClickActions from '../../store/actions/prevent-double-click.actions';

class PreventDoubleClickPage extends React.Component {
  constructor(props) {
    super(props);

    this.onClickPreventDoubleClick = this.onClickPreventDoubleClick.bind(this);
  }

  componentDidMount() {
    this.context.store.dispatch(menuActions.setActive('preventDoubleClick'));
  }

  onClickPreventDoubleClick() {
    if (this.props.preventDoubleClick === false) {
      this.context.store.dispatch(preventDoubleClickActions.enable());
    } else {
      this.context.store.dispatch(preventDoubleClickActions.disable());
    }
  }

  render() {
    return (
      <div className="p-prevent-double-click">
        <h1 id="test" className="test">{window.i18n['desktop/prevent-double-click'].header()}</h1>
        <div>
          <button className="test" disabled={this.props.preventDoubleClick}>{window.i18n['desktop/prevent-double-click'].button1()}</button>
          <button className="toggle" onClick={this.onClickPreventDoubleClick}>{window.i18n['desktop/prevent-double-click'].button2()}</button>
        </div>
      </div>
    );
  }
}

PreventDoubleClickPage.displayName = 'PreventDoubleClickPage';

PreventDoubleClick.propTypes = {
  preventDoubleClick: React.PropTypes.bool
};

PreventDoubleClickPage.contextTypes = {
  store: React.PropTypes.object
};

let mapStateToProps = function(state) {
  console.log('prevent double click map state to props');
  return {
    preventDoubleClick: state.preventDoubleClick
  };
};

export default connect(mapStateToProps)(PreventDoubleClickPage);
