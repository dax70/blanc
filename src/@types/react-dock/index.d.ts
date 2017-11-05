declare module 'react-dock' {

  import React = require("react");

  export type DockPosition = 'left' | 'right' | 'top' | 'bottom';

  export type DimMode = 'opaque' | 'none' | 'transparent';

  export interface DockProps {
    position?: DockPosition;
    zIndex?: number;
    fluid?: boolean;
    size?: number;    
    defaultSize?: number;    
    dimMode?: DimMode;
    isVisible?: boolean;
    onVisibleChange?: () => void;  
    onSizeChange?: () => void;  
    dimStyle?: {};
    dockStyle?: {};
    duration?: number;
  }

  export default class Dock extends React.Component<DockProps,{}> {

  }
}