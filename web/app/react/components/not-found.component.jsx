import * as React from 'react';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>Not Found</h1>;
  }
}

NotFound.displayName = 'NotFound';

module.exports = NotFound;
