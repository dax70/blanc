import { DocumentComponent } from './Components';
import { EventHandler, IndexedArgs, Subject, Subscription } from '../Subscriptions';

export type DocumentCallBack = EventHandler<DocumentComponent>;

export type Selection = {
  index: number;
  node: DocumentComponent;
};

export type DocumentIndexedCallBack = EventHandler<IndexedArgs<DocumentComponent>>;

export default class BlancDocument {
    components: Array<DocumentComponent>;
    selection?: Selection;
    addSubject: Subject<DocumentComponent>;
    insertSubject: Subject<IndexedArgs<DocumentComponent>>;
    removeSubject: Subject<IndexedArgs<DocumentComponent>>;
     
    constructor() {
      this.components = [];

      // TODO consider moving to key based structure
      // and lazy initialize subjects - aggregate subscriptions.
      this.addSubject = new Subject();
      this.insertSubject = new Subject();
      this.removeSubject = new Subject();      
    } 

    addComponent(node: DocumentComponent) {
      this.components.push(node);
      this.addSubject.next(node);
    }

    insertComponent(index: number, node: DocumentComponent) {
      this.components.splice(index, 0, node);
      this.insertSubject.next({index, item: node});
    }

    removeComponent(node: DocumentComponent) {
      const index  = this.components.indexOf(node);

      if (index < 0) {
        throw new Error('Unable to find component to remove.');
      }

      this.components.splice(index, 1);
      this.removeSubject.next({index, item: node});
    }

    setSelection(selection: Selection) {
      const prevSelection = this.selection;
      if (prevSelection) {
        const { node: oldNode } = prevSelection;
        if (oldNode) {
          oldNode.isSelected = false;
        }
      }

      const { node } = selection;
      node.isSelected = true;
      this.selection = selection;
    }

    getSelection() {
      return this.selection;
    }

    //#region Events

    onDidAddComponent(handler: DocumentCallBack): Subscription {
      return this.addSubject.subscribe(handler);
    }

    onDidInsertComponent(handler: DocumentIndexedCallBack): Subscription {
      return this.insertSubject.subscribe(handler);
    }

    onDidRemoveComponent(handler: DocumentIndexedCallBack): Subscription {
      return this.removeSubject.subscribe(handler);
    }

    //#endregion

    getItems() {
      return this.components;
    }
 
    serialize() {
      // Serialize
    }

    deserialize(json: string) {
      // Deserialize
    }
}