import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Header} from '../../../../web/app/react/components';
import store from '../../../../web/app/store/store';

describe('header component', () => {
  let div;

  beforeEach(() => {
    div = document.createElement('div');
  });

  it('should render', () => {
    let headerComponent = ReactDOM.render(<Provider store={store}><Header><span className="test">test</span></Header></Provider>, div);
    let header = ReactDOM.findDOMNode(headerComponent);
    let listItems = Array.from(header.querySelectorAll('li'));

    expect(listItems.length).to.equal(3);

    let expectedListItems = [
      'Desktop',
      'Prevent Double Click',
      'With Param'
    ];

    listItems.forEach((listItem, key) => {
      expect(listItem.textContent).to.equal(expectedListItems[key]);
    });
  });
});
