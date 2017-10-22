import * as React from 'react';
import {BlancDocument as DocModel, DocumentNode, HtmlNode } from '../appcore/document';

export type BlancDocumentProps = {
  content: DocModel
};

const e = React.createElement;

type El = DocumentNode | string | number;

const createReactNode = (item: El, index: number = 0): React.ReactNode => {
  const key = index++; 
  // TODO: handle onClick | Test selection
  if (!item || typeof item === 'string') {
    return e('span', { key }, item);      
  }

  if (typeof item === 'object' && (item as DocumentNode).kind === 'HTMLElement') {
    const { tag, props, children } = item as HtmlNode;
    const propExt = {...props, key } ;
    
    // TODO: handle onClick | Test selection
    if (!children || typeof children === 'string') {
      return e(tag, propExt, children);      
    }

    if (Array.isArray(children)) {
      const reactChildren = (children as Array<{}>).map(createReactNode);
      return e(tag, propExt, reactChildren);                  
    }

    if (typeof children === 'object') {
      const reactChild = createReactNode(children as DocumentNode);
      return e(tag, propExt, reactChild);            
    }

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