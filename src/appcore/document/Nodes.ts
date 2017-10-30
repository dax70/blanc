import { ComponentKind, DocumentComponent, HtmlComponent } from './Components';

enum NodeKind {
  Leaf,
  Binary,
  Composite
}

enum NodeType {
  Component,
  Html,
  Text  
}

type VisualNode = {
  kind: NodeKind;
  parent: VisualNode | null;
  accept(visitor: VisualNodeVisitor): void;
};

type LeafNode = VisualNode & { 
  kind: NodeKind.Leaf;
  value: string 
};

type BinaryNode = VisualNode & {
  left: VisualNode;
  right: VisualNode;
};

type CompositeNode = VisualNode & {
  items: Array<VisualNode>;
};

class Text implements LeafNode {
  kind: NodeKind.Leaf;
  value: string;
  parent: VisualNode | null;

  constructor(value: string) {
    this.value = value;
  }

  accept(visitor: VisualNodeVisitor) {
    visitor.visitLeaf(this);
  }
}

class VisualNodeBuilder {

  buildTextNode(value: string): LeafNode {
    return new Text(value);
  }

  buildHtmlNode(component: HtmlComponent) {
    //
    
  }

  build(item: string | {}) {
    if (typeof item === 'string') {
      return this.buildTextNode(item);
    }

    const component = item as DocumentComponent;

    if (component) { 
      switch (component.kind) {
        case ComponentKind.Text:
          break;
        case ComponentKind.Html:
          break;
        case ComponentKind.Component:
          break;
        default:
          throw new Error(`NodeType ${component.kind} is not supported.`);    
      }
    }

    throw new Error(`type ${component} is not supported.`);    
  }
}

class VisualNodeVisitor {

  visitLeaf(node: LeafNode) {
    //
  }

  visitComposite(node: CompositeNode) {
    //
  }

  visitBinary(node: BinaryNode) {
    //
  }

  visit(node: VisualNode) {
    // implement
    switch (node.kind) {
      case NodeKind.Leaf:
        break;
      case NodeKind.Binary:
        break;
      case NodeKind.Composite:
        break;
      default:
        throw new Error(`NodeKind ${node.kind} is not supported.`);
    }
  }
}

export {
  NodeKind,
  NodeType,
  LeafNode,
  BinaryNode,
  CompositeNode,
  VisualNodeBuilder,
  VisualNodeVisitor
};