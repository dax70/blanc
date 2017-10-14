import * as React from 'react';

class Window extends React.Component<{}, {}> {

  render() {
    const { children } = this.props;
    return (
      <div className="window">        
        {children}
      </div>
    );
  }
}

export default Window;