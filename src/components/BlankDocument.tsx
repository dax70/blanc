import * as React from 'react';
import {BlancDocument as DocModel, DocumentNode, HtmlNode } from '../appcore/document';

export type BlancDocumentProps = {
  content: DocModel
};

const e = React.createElement;

type handler = (node: DocumentNode, index: number) => void;

type El = DocumentNode | string | number;

const createReactNode = (item: El, index: number = 0, clickHandler?: handler): React.ReactNode => {
  const key = index++; 

  const mapToReact = (node: El, i: number) => createReactNode(node, i, clickHandler);

  // TODO: handle onClick | Test selection
  if (!item || typeof item === 'string') {
    return e('span', { key }, item);      
  }

  if (typeof item === 'object' && (item as DocumentNode).kind === 'HTMLElement') {
    const { tag, props, children } = item as HtmlNode;
    const propExt = {...props, key, onClick: clickHandler } ;
    
    // TODO: handle onClick | Test selection
    if (!children || typeof children === 'string') {
      return e(tag, propExt, children);      
    }

    if (Array.isArray(children)) {
      const reactChildren = (children as Array<{}>).map(mapToReact);
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

  constructor(props: BlancDocumentProps) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.state = { dirty: false };
  }

  handleSelection(node: DocumentNode, index: number) {
    // TODO
    this.setState((prevState, props) => {
      return {
        dirty: true
      };
    });

    /* tslint:disable */
    console.log(`Dom node selected at: ${index} ${node}`);
    /* tslint:enable */
  }

  render() {
    const { content } = this.props;
    const parts = content.getItems();

    const children = parts.map((node, index) => {
      // TODO add click to props 
      // and subscribe to know which is selected
      return createReactNode(node, index, () => this.handleSelection (node, index));
    });

    return (
      <div className="bl-doc">        
        {children}
      </div>
    );
  }
}

export default BlancDocument;