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
    mainMenu.append(new MenuItem({ text: 'Foo' }));
    mainMenu.append(new MenuItem({ text: 'Bar'}));
    mainMenu.appendDivider();    
    mainMenu.append(new MenuItem({ text:'Baz' }));
    
    const adapter = new MenuAdapter();
    const menuEl = adapter.adapt(mainMenu);
    return (
      <div className="App">
        <Nav />
        {menuEl}
      </div>
    );
  }
}

export default App;
