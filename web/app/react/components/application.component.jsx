import * as React from 'react';
import Header from './header.component.jsx';

class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="application">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

Application.displayName = 'Application';

export default Application;
