import * as React from 'react';
import './App.css';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import Nav from './components/Nav';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
      </div>
    );
  }
}

export default App;
