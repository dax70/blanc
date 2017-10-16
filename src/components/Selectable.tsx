import * as React from 'react';
import './Selectable.css';

class Selectable extends React.Component<{}, {}> {

  render() {
    const { children } = this.props;
    return (
      <div className="bl-selectable">        
        {children}
      </div>
    );
  }
}

export default Selectable;