import * as React from 'react';

class PaneGroup extends React.Component<{}, {}> {

  render() {
    const { children } = this.props;    
    return (
      <div className="pane-group">        
        {children}
      </div>
    );
  }
}

export default PaneGroup;