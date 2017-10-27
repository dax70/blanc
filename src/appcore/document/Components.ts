import { ReactNode } from 'react';

// Must either define all props as optinal
// or leave as any
export type ComponentProps = {
};

export type ChildrenComponent = ReactNode;

export interface DocumentComponent {
  kind: string;
  isSelected?: boolean;
  props?: ComponentProps;
  children?: ChildrenComponent;
  clone(): DocumentComponent;
}

// More?
export type HtmlTag = 'a' | 'div' | 'p' | 'span';

export type HtmlComponentKind = 'HTMLElement';

export type HtmlComponentProps = {
  tag: HtmlTag;  
  props?: ComponentProps;
  children?: ChildrenComponent;
};

export interface HtmlNode extends DocumentComponent, HtmlComponentProps {
  kind: HtmlComponentKind;
}