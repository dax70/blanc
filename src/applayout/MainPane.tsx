import * as React from 'react';
import { Pane } from '../components';

class MainPane extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Pane>
        {children}
      </Pane>
    );
  }
}

export default MainPane;