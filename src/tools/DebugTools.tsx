import * as React from 'react';
import Dock from 'react-dock';

class DebugTools extends React.Component {
  render() { 
    return (
      <Dock position="bottom" isVisible={true} dimMode="none">
        {/* you can pass a function as a child here */}
        Hello from Dock
      </Dock>
    );
  }
}

export default DebugTools;