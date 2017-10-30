import { ComponentKind, DocumentComponent } from './Components';

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

type StringOrObject = string | {};

type VisualNode = {
  nodeType: NodeType;
  kind: NodeKind;
  parent: VisualNode | null;
  accept(visitor: VisualNodeVisitor): void;
};

type LeafNode = VisualNode & { 
  kind: NodeKind.Leaf;
  value: string | {};
};

type BinaryNode = VisualNode & {
  left: VisualNode;
  right: VisualNode;
};

type CompositeNode = VisualNode & {
  kind: NodeKind.Composite;
  items: Array<VisualNode>;
};

class Single implements LeafNode {
  nodeType: NodeType;
  kind: NodeKind.Leaf;
  value: StringOrObject;
  parent: VisualNode | null;

  constructor(value: StringOrObject, nodeType: NodeType) {
    this.value = value;
    this.nodeType = nodeType;
  }

  accept(visitor: VisualNodeVisitor) {
    visitor.visitLeaf(this);
  }
}

class Text extends Single {
  value: string;
  constructor(value: string) {
    super(value, NodeType.Text);
  }
}

class Composite implements CompositeNode {
  nodeType: NodeType;
  kind: NodeKind.Composite;
  value: {};
  parent: VisualNode | null;
  items: Array<VisualNode>;

  constructor(value: {}, nodeType: NodeType) {
    this.value = value;
    this.nodeType = nodeType;
  }

  accept(visitor: VisualNodeVisitor) {
    visitor.visitComposite(this);
  }
}

class VisualNodeBuilder {

  buildTextNode(value: string): LeafNode {
    return new Text(value);
  }

  buildComposite(component: DocumentComponent, nodeType: NodeType) {
    const { children } = component;

    if (!children || typeof children === 'string') {
      return new Single(children || '', nodeType);
    }

    const composite = new Composite(component, nodeType);
    
    if (Array.isArray(children)) {
      composite.items = children.map(this.build);
    } else if (typeof children === 'object') {
      composite.items = [ this.build(children)];
    }

    return composite;
  }

  build(item: string | {}): VisualNode {
    if (typeof item === 'string') {
      return this.buildTextNode(item);
    }

    const component = item as DocumentComponent;

    if (component) { 
      switch (component.kind) {
        case ComponentKind.Text:
          return this.buildTextNode(<string> component.children);
        case ComponentKind.Html:
        case ComponentKind.Component:
          const nodeType: NodeType = component.kind === ComponentKind.Html ? NodeType.Html : NodeType.Component;
          return this.buildComposite(component as DocumentComponent, nodeType);                  
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
        this.visitLeaf(node as LeafNode);
        break;
      case NodeKind.Binary:
        this.visitBinary(node as BinaryNode);
        break;
      case NodeKind.Composite:
        this.visitComposite(node as CompositeNode);
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
  VisualNodeVisitor,
  Text,
  Composite
};