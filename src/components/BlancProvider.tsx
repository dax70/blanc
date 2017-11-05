import * as React from 'react';
import {BlancDocument as DocModel } from '../appcore/document';

export type BlancProviderProps = {
  docContent: DocModel;
};

export default class BlancProvider extends React.Component<BlancProviderProps, {}> {

  static childContextTypes = {
    docContent: DocModel
  };

  getChildContext() {
    const { docContent } = this.props;
    return { docContent };
   }

  render() {
    /* tslint:disable */
    console.log(this.props.docContent);
    /* tslint:enable */
    // TODO: Consider more elegant than cast.
    return this.props.children as Array<JSX.Element>;
  }
}