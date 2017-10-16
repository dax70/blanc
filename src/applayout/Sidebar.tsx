import * as React from 'react';
import { Pane, PaneSize } from '../components';

class Sidebar extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Pane size={PaneSize.oneThird} isSidebar={true}>
        {children}
      </Pane>
    );
  }
}

export default Sidebar;