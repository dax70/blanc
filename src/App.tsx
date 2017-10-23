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
      { dataval: 'first' },
      ['Hello text', divContent, mockEl ]
    );

    const third = HtmlFactory.create(
      'div',
      { dataval: 'third' },
      ['Hello third']
    );

    const second = HtmlFactory.create(
      'div',
      { dataval: 'second' },
      ['Hello Second']
    );

    const docContent = new DocModel();
    const sub = docContent.onDidAddComponent((docNode: DocumentNode) => {
      /* tslint:disable */
      console.log(`Node add: ${docNode}`);
    });   
    
    const subInsert = docContent.onDidInsertComponent((args) => {
      /* tslint:disable */
      console.log(`Node insert: at ${args.index}`);
    });   

    const subRemove = docContent.onDidRemoveComponent((args) => {
      /* tslint:disable */
      console.log(`Node removed: at ${args.index}`);
    });   

    this.subscriptions.push(sub);
    this.subscriptions.push(subInsert);
    this.subscriptions.push(subRemove);    
    
    docContent.addComponent(root);
    docContent.addComponent(second);    
    docContent.insertComponent(1, third);       
    docContent.removeComponent(root);

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
