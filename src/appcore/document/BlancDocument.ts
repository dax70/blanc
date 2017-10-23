import { DocumentNode } from './Nodes';
import { EventHandler, IndexedArgs, Subject, Subscription } from '../Subscriptions';

export type DocumentCallBack = EventHandler<DocumentNode>;

export type DocumentIndexedCallBack = EventHandler<IndexedArgs<DocumentNode>>;

export default class BlancDocument {
    nodes: Array<DocumentNode>;
    addSubject: Subject<DocumentNode>;
    insertSubject: Subject<IndexedArgs<DocumentNode>>;
    removeSubject: Subject<IndexedArgs<DocumentNode>>;
     
    constructor() {
      this.nodes = [];

      // TODO consider moving to key based structure
      // and lazy initialize subjects - aggregate subscriptions.
      this.addSubject = new Subject();
      this.insertSubject = new Subject();
      this.removeSubject = new Subject();      
    } 

    addComponent(node: DocumentNode) {
      this.nodes.push(node);
      this.addSubject.next(node);
    }

    insertComponent(index: number, node: DocumentNode) {
      this.nodes.splice(index, 0, node);
      this.insertSubject.next({index, item: node});
    }

    removeComponent(node: DocumentNode) {
      const index  = this.nodes.indexOf(node);

      if (index < 0) {
        throw new Error('Unable to find component to remove.');
      }

      this.nodes.splice(index, 1);
      this.removeSubject.next({index, item: node});
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
      return this.nodes;
    }
 
    serialize() {
      // Serialize
    }

    deserialize(json: string) {
      // Deserialize
    }
}