import { ReactNode } from 'react';

// Must either define all props as optinal
// or leave as any
export type ComponentProps = {
};

export type ChildrenComponent = ReactNode;

export enum ComponentKind {
  Component = 'Component',
  Html = 'HtmlElement',
  Text = 'Text'
}

export interface DocumentComponent {
  kind: ComponentKind;
  isSelected?: boolean;
  props?: ComponentProps;
  children?: ChildrenComponent;
}

// More?
export type HtmlTag = 'a' | 'div' | 'p' | 'span';

export type HtmlComponentProps = {
  tag: HtmlTag;  
  props?: ComponentProps;
  children?: ChildrenComponent;
};

export interface HtmlComponent extends DocumentComponent, HtmlComponentProps {
  kind: ComponentKind.Html;
}