import { DocumentNode, HtmlNode, HtmlNodeProps, HtmlTag, HtmlNodeKind, NodeProps, ChildNodes } from './BlancDocument';

export class HTMLElement implements DocumentNode, HtmlNode {
  kind: HtmlNodeKind = 'HTMLElement';  
  tag: HtmlTag;
  props?: NodeProps;
  children?: ChildNodes;

  constructor(nodeProps: HtmlNodeProps) {
    const { tag, props, children } = nodeProps;
    this.tag = tag;
    this.props = props;
    this.children = children;
  }
  
  clone() {
    return Object.assign({}, this);
  }
}

export default class Html {

  static create(tag: HtmlTag, props?: NodeProps, children?: ChildNodes) {
    return new HTMLElement({ tag, props, children });
  }
}