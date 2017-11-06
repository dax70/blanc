declare module 'react-json-tree' {
    import React = require("react");

  
    export interface JSONTreeProps {
      data: Iterable<{}>;
      invertTheme?: boolean;
      keyPath?: Array<string>;
    }
   
    export default class JSONTree extends React.Component<JSONTreeProps,{}> {
  
    }
  }