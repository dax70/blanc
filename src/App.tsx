import * as React from 'react';
import './App.css';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import Nav from './components/Nav';

import { Dropdown, Menu, MenuItem } from './appui/Menu';

import { 
  BlancDocument,
  Dropdown as DropdownAdapter,
  Pane, PaneGroup, PaneSize, Toolbar, 
  Window, WindowContent
} from './components';

import { Subscription } from './appcore/Subscriptions';

import 'photonkit/dist/css/photon.css';

import { BlancDocument as DocModel, DocumentNode } from './appcore/document';
import HtmlFactory from './appcore/HtmlFactory';

class App extends React.Component {
  subscriptions: Array<Subscription> = [];

  componentWillUnmount() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  render() {
    const mainMenu = new Menu();
    mainMenu.append(new MenuItem({ text: 'Foo', iconName: 'pt-icon-user' }));
    mainMenu.append(new MenuItem({ text: 'Bar', onClick: (e) => alert('Bar was clicked!')}));
    mainMenu.appendDivider();
    mainMenu.append(new MenuItem({ text: 'Baz' }));

    const dropdown = new Dropdown({ 
      text: 'New Dropdwon',
      iconName: 'pt-icon-control', 
      menu: mainMenu 
    });

    const divContent = HtmlFactory.create(
      'div',
      {},
      'Hellow from inside content'
    );

    const mockEl = {
      kind: 'HTMLElement', 
      tag: 'div',
      props: { style: { color: 'blue' }}, 
      children: 'Hello from object'
    };

    const root = HtmlFactory.create(
      'div',
      {},
      ['Hello text', divContent, mockEl ]
    );
    const docContent = new DocModel();
    const sub = docContent.onDidAddComponent((docNode: DocumentNode) => {
      /* tslint:disable */
      console.log(`Node add: ${docNode}`);
    });    

    this.subscriptions.push(sub);
    docContent.addComponent(root);

    return ( 
      <div className="App">
        <Window>
          <Toolbar>
            <Nav />
            <DropdownAdapter dropdown={dropdown} />            
          </Toolbar>
          <WindowContent>            
            <PaneGroup>
              <Pane size={PaneSize.oneThird} isSidebar={true}>
                Foo
              </Pane>
              <Pane>
                <BlancDocument content={docContent}/>
              </Pane>
            </PaneGroup>
          </WindowContent>
        </Window>
      </div>
    );
  }
}

export default App;
