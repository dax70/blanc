import {
 ComponentKind,
 DocumentComponent, 
 HtmlComponent, 
 HtmlComponentProps, 
 HtmlTag, 
 ComponentProps, 
 ChildrenComponent 
} from './document';

export class HTMLElement implements DocumentComponent, HtmlComponent {
  kind: ComponentKind.Html = ComponentKind.Html;  
  tag: HtmlTag;
  props?: ComponentProps;
  children?: ChildrenComponent;

  constructor(nodeProps: HtmlComponentProps) {
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

  static create(tag: HtmlTag, props: ComponentProps = {}, children?: ChildrenComponent) {
    return new HTMLElement({ tag, props, children });
  }
}