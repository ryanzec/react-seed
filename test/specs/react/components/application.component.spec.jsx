import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Application, Header} from '../../../../web/app/react/components';
import store from '../../../../web/app/store/store';

describe('application component', () => {
  let div;

  beforeEach(() => {
    div = document.createElement('div');
  });

  it('should render', () => {
    const application = ReactDOM.render(<Provider store={store}><Application><span className="test">test</span></Application></Provider>, div);
    const header = ReactDOM.findDOMNode(application).querySelectorAll('header');
    const content = ReactDOM.findDOMNode(application).querySelectorAll('.test');

    expect(header.length).to.equal(1);
    expect(content.length).to.equal(1);
  });
});
