import * as React from 'react';
import * as renderer from 'react-test-renderer';

import BlancDocument from './BlankDocument';
import { BlancDocument as DocModel } from '../appcore/document';
import HtmlFactory from '../appcore/HtmlFactory';

describe('BlancDocument Component rendering functionality', () => {

  test('Basic render -> div Hello', () => {

    const docContent = new DocModel();
    const divContent = HtmlFactory.create(
      'div',
      {},
      'Hello'
    );

    docContent.addComponent(divContent);

    const blancDoc = renderer.create(
      <BlancDocument content={docContent} />
    ).toJSON();

    expect(blancDoc).toMatchSnapshot();
  });

  test('mock part renders correctly', () => {

    const docContent = new DocModel();

    const divContent = HtmlFactory.create(
      'div',
      {},
      'Hellow from inside content'
    );

    const mockEl = {
      kind: 'HTMLElement',
      tag: 'div',
      props: { style: { color: 'blue' } },
      children: 'Hello from object'
    };

    const root = HtmlFactory.create(
      'div',
      {},
      ['Hello text', divContent, mockEl]
    );

    docContent.addComponent(root);

    const blancDoc = renderer.create(
      <BlancDocument content={docContent} />
    ).toJSON();

    expect(blancDoc).toMatchSnapshot();
  });
});