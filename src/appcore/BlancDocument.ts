import { ReactNode } from 'react';

export type NodeProps = {};
export type ChildNodes = ReactNode;

export interface Node {
  kind: string;
  props?: NodeProps;
  children?: ChildNodes;
}

// More?
export type HtmlTag = 'a' | 'div' | 'p' | 'span';

export type HtmlNodeKind = 'HTMLElement';

export type HtmlNodeProps = {
  tag: HtmlTag;  
  props?: NodeProps;
  children?: ChildNodes;
};

export interface HtmlNode extends Node, HtmlNodeProps {
  kind: HtmlNodeKind;
}

export type NodeKind  = HtmlNodeKind | string;

export interface DocumentNode extends Node {
  kind: NodeKind;
  clone(): Node;
}

export class BlancDocument {
    nodes: Array<Node>;

    constructor() {
      this.nodes = [];
    }

    addComponent(node: Node) {
      this.nodes.push(node);
    }

    getItems() {
      return this.nodes;
    }

    serialize() {
      // Serialize
    }

    deserialize(json: string) {
      // Deserialize
    }
}