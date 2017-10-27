import { Component } from 'react';

import { Item } from '../appcore/Item';
import { ComponentProps, ChildrenComponent } from '../appcore/document';

export type DataBoundProps = { 
  item: Item;
  render: (props: ComponentProps, children: ChildrenComponent) => JSX.Element;
};

export class DataBound extends Component<DataBoundProps, {}> {

  render() {
    const { render, item, children } = this.props;
    return render(item, children);
  }
}