import * as React from 'react';
import * as PropTypes from 'prop-types';
import {BlancDocument as DocModel, DocumentComponent, HtmlComponent } from '../appcore/document';

export type BlancDocumentProps = {
  // content: DocModel
};

const e = React.createElement;

type handler = (e: Event) => void;

type El = DocumentComponent | string | number;

const createReactNode = (item: El, index: number = 0, clickHandler?: handler): React.ReactNode => {
  const key = index++; 

  const mapToReact = (node: El, i: number) => createReactNode(node, i, clickHandler);

  // TODO: handle onClick | Test selection
  if (!item || typeof item === 'string') {
    return e('span', { key }, item);      
  }

  const htmlComp =  item as HtmlComponent;
  if (htmlComp) {
    const { tag, props, children } = htmlComp;
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
      const reactChild = createReactNode(children as DocumentComponent);
      return e(tag, propExt, reactChild);            
    }

    // return e(tag, propExt);            
  }

  throw new Error('Item kind not supported!');
};

interface DocumentContext {
  docContent: DocModel;
}

class BlancDocument extends React.Component<BlancDocumentProps, {}> {
  
  static contextTypes = {
    docContent: PropTypes.object
  };

  context: DocumentContext;

  constructor(props: BlancDocumentProps) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.state = { dirty: false };
  }

  handleSelection(node: DocumentComponent, index: number) {
    // TODO
    this.setState((prevState, props) => {
      return {
        dirty: true
      };
    });

    /* tslint:disable */
    const docContent = this.context.docContent;
    docContent.setSelection({index, node });
    const selection = docContent.getSelection();
    if (selection) {
      const { node: selectedNode } = selection;    
      console.log(`${selectedNode.kind} ${JSON.stringify(selectedNode.props)}`);
      console.log(`Dom node selected at: ${index} ${node}`);
    }
    /* tslint:enable */
  }

  render() {
    const docContent = this.context.docContent;
    const parts = docContent.getItems();

    const children = parts.map((node, index) => {
      // tslint:disable-next-line:no-shadowed-variable
      return createReactNode(node, index, (e) => {
        e.preventDefault();
        this.handleSelection (node, index);
      });
    });

    return (
      <div className="bl-doc">        
        {children}
      </div>
    );
  }
}

export default BlancDocument;