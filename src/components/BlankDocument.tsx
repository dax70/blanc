import * as React from 'react';
import {BlancDocument as DocModel, Node, HtmlNode } from '../appcore/BlancDocument';

export type BlancDocumentProps = {
  content: DocModel
};

const e = React.createElement;

const createReactNode = (item: Node, index: number) => {
  if (item.kind === 'HTMLElement') {
    const { tag, props, children } = item as HtmlNode;
    const propExt = {...props, key: index};
    return e(tag, propExt, children);
  }

  throw new Error('Item kind not supported!');
};

class BlancDocument extends React.Component<BlancDocumentProps, {}> {

  render() {
    const { content } = this.props;
    const parts = content.getItems();

    const children = parts.map(createReactNode);

    return (
      <div className="bl-doc">        
        {children}
      </div>
    );
  }
}

export default BlancDocument;