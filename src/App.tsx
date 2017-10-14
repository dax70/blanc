import * as React from 'react';
import './App.css';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import Nav from './components/Nav';

import { Dropdown, Menu, MenuItem } from './appcore/Menu';

import { 
  Window, WindowContent, PaneGroup, Pane, PaneSize, Toolbar, Dropdown as DropdownAdapter
} from './components';

import 'photonkit/dist/css/photon.css';

class App extends React.Component {

  render() {
    const mainMenu = new Menu();
    mainMenu.append(new MenuItem({ text: 'Foo', iconName: 'pt-icon-user' }));
    mainMenu.append(new MenuItem({ text: 'Bar', onClick: (e) => alert('Bar was clicked!')}));
    mainMenu.appendDivider();
    mainMenu.append(new MenuItem({ text: 'Baz' }));

    const dropdown = new Dropdown({ text: 'New Dropdwon', menu: mainMenu });

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
                Bar
              </Pane>
            </PaneGroup>
          </WindowContent>
        </Window>
      </div>
    );
  }
}

export default App;
