import * as React from 'react';
import './App.css';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import Nav from './components/Nav';

import { Menu, MenuItem } from './appcore/Menus';
import { MenuAdapter } from './appcore/Adapters';

class App extends React.Component {
  
  render() {
    const mainMenu = new Menu();
    mainMenu.append(new MenuItem({ text: 'Foo', iconName: 'pt-icon-user' }));
    mainMenu.append(new MenuItem({ text: 'Bar'}));
    mainMenu.appendDivider();    
    mainMenu.append(new MenuItem({ text: 'Baz' })); 
    
    return (
      <div className="App">
        <Nav />
        <MenuAdapter menu={mainMenu} />
      </div>
    );
  }
}

export default App;
