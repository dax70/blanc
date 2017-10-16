import * as React from 'react';

export type Event = {
  preventDefault(): void;
  stopImmediatePropagation(): void;
  stopPropagation(): void;
};

export type DocumentPartProps = {
  onClick: () => void;
};

class DocumentPart extends React.Component<DocumentPartProps, {}> {

  constructor(props: DocumentPartProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: MouseEvent) {
    const { onClick } = this.props;
    if (onClick) {
      // const event = {
      //   preventDefault: e.preventDefault,
      //   stopImmediatePropagation: e.stopImmediatePropagation,
      //   stopPropagation: e.stopPropagation
      // };
      onClick();
    }
  }

  render() {
    const { children } = this.props;
    return (
      // <div className="bl-part" onClick={this.handleClick}>
      <div className="bl-part">        
        {children}
      </div>
    );
  }
}

export default DocumentPart;