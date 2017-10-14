import * as React from 'react';

export enum PaneSize {  
  nomal =  'pane',
  small = 'pane-sm',
  mini = 'pane-mini',
  oneFourth = 'pane-one-fourth',
  oneThird = 'pane-one-third'
}

export type PaneProps = {
  size?: PaneSize;
  isSidebar?: boolean;
  children?: React.ReactNode;
};

class Pane extends React.Component<PaneProps, {}> {

  static defaultProps = { 
    size: PaneSize.nomal,
    isSidebar: false
  };

  render() {
    const { size, children, isSidebar } = this.props;
    const sidebar = isSidebar ? 'sidebar' : '';
    const classes = [size, sidebar].join(' ');
    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}

export default Pane;