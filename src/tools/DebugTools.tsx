import * as React from 'react';
import Dock from 'react-dock';
import JSONTree from 'react-json-tree'; 
import { BlancDocument as DocModel } from '../appcore/document';

type DebugToolsProps = {
  docContent: DocModel;
};

class DebugTools extends React.Component<DebugToolsProps, {}> {
  render() { 
    return (
      <Dock position="bottom" isVisible={true} dimMode="none">
        {/* you can pass a function as a child here */}
        <JSONTree data={this.props.docContent.visualTreeList} invertTheme={false}/>
      </Dock>
    );
  }
}

export default DebugTools;