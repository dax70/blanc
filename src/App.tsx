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

import 'photonkit/dist/css/photon.css';

import { BlancDocument as DocModel } from './appcore/BlancDocument';
import HtmlFactory from './appcore/HtmlFactory';

class App extends React.Component {

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

    const docContent = new DocModel();

    const div1 = HtmlFactory.create(
      'div',
      { style: { color: 'blue' }},
      'Hellow from div'
    );

    docContent.addComponent(div1);

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
