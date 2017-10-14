import * as React from 'react';

export type ToolbarProps = {
  isFooter?: false;
};

class Toolbar extends React.Component<ToolbarProps, {}> {

  render() {
    const { children, isFooter } = this.props;   
    const classes = ['toolbar', isFooter ? 'toolbar-footer' : 'toolbar-header']; 
    return (
      <div className={classes.join(' ')}>        
        {children}
      </div>
    );
  }
}

export default Toolbar;