import * as React from 'react';
import * as enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

import BlancDocument from './BlankDocument';
import { BlancDocument as DocModel } from '../appcore/document';
import HtmlFactory from '../appcore/HtmlFactory';

it('renders the correct text when shallow', () => {

  const docContent = new DocModel();
  
  const divContent = HtmlFactory.create(
    'div',
    {},
    'Hello'
  );

  docContent.addComponent(divContent);

  const hello = enzyme.shallow(<BlancDocument content={docContent} />);
  expect(hello.find('div').text()).toEqual('Hello');
});