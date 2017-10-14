import * as React from 'react';

class WindowContent extends React.Component<{}, {}> {

  render() {
    const { children } = this.props;
    return (
      <div className="window-content">        
        {children}
      </div>
    );
  }
}

export default WindowContent;