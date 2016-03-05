import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Application from '../../../../web/app/react/components/application.component.jsx';
import Header from '../../../../web/app/react/components/header.component.jsx';
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
