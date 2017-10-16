import { Menu } from '../appui/Menu';
import { Item } from './Item';

class Application {
  mainMenu: Menu;

  constructor() {
    // Something here
  }

  load() {
    // Load code
    // notify all components
  }

  getSelection(): Item | null {
    // get selected item
    return null;
  }

  onSelectionChanged() {
    // notify selection changed
  }

  unload() {
    // Unload code
    // notify all components
  }
}

export default Application;