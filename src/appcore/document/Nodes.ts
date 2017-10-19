import { ReactNode } from 'react';

export type NodeProps = {};
export type ChildNodes = ReactNode;

export interface DocumentNode {
  kind: string;
  props?: NodeProps;
  children?: ChildNodes;
  clone(): DocumentNode;
}

// More?
export type HtmlTag = 'a' | 'div' | 'p' | 'span';

export type HtmlNodeKind = 'HTMLElement';

export type HtmlNodeProps = {
  tag: HtmlTag;  
  props?: NodeProps;
  children?: ChildNodes;
};

export interface HtmlNode extends DocumentNode, HtmlNodeProps {
  kind: HtmlNodeKind;
}