import * as React from 'react';
import './App.css';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';

import DebugTools from './tools/DebugTools';
import Nav from './components/Nav';

import { Dropdown, Menu, MenuItem } from './appui/Menu';

// import { transition } from 'd3';

import { 
  BlancDocument,
  BlancProvider,
  Dropdown as DropdownAdapter,
  Pane, PaneGroup, PaneSize, Toolbar, 
  Window, WindowContent
} from './components';

import { Subscription } from './appcore/Subscriptions';

import 'photonkit/dist/css/photon.css';

import { BlancDocument as DocModel, DocumentComponent } from './appcore/document';
import HtmlFactory from './appcore/HtmlFactory';

const htmlCreate = HtmlFactory.create;

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

    const root = htmlCreate(
      'div',
      { dataval: 'first' },
      ['Hello text', divContent, mockEl ]
    );

    const third = htmlCreate(
      'div',
      { dataval: 'third' },
      ['Hello third']
    );

    const innerSecond = htmlCreate(
      'div',
      {},
      ['Hello inner Second']
    );

    // const trans = transition()

    const second = htmlCreate(
      'div',
      { dataval: 'second', style: { border: '1px solid blue' }},
      ['Hello Second', innerSecond]
    );

    const fourth = htmlCreate(
      'div',
      { dataval: 'fourth' }
    );

    const docContent = new DocModel();
    const sub = docContent.onDidAddComponent((docNode: DocumentComponent) => {
      /* tslint:disable */
      console.log(`Node add: ${docNode}`);
      /* tslint:enable */      
    });   
    
    const subInsert = docContent.onDidInsertComponent((args) => {
      /* tslint:disable */
      console.log(`Node insert: at ${args.index}`);
      /* tslint:enable */      
    });   

    const subRemove = docContent.onDidRemoveComponent((args) => {
      /* tslint:disable */
      console.log(`Node removed: at ${args.index}`);
      /* tslint:enable */      
    });   

    this.subscriptions.push(sub);
    this.subscriptions.push(subInsert);
    this.subscriptions.push(subRemove);    
    
    docContent.addComponent(root);
    docContent.addComponent(second);    
    docContent.insertComponent(1, third);       
    // docContent.removeComponent(root);
    docContent.addComponent(fourth);
    
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
                <BlancProvider docContent={docContent}>
                  <BlancDocument content={docContent}/>
                  <DebugTools docContent={docContent}/>
                </BlancProvider>
              </Pane>
            </PaneGroup>
          </WindowContent>
        </Window>
      </div>
    );
  }
}

export default App;
