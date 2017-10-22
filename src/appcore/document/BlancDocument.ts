import { DocumentNode } from './Nodes';
import { Observer, Subject, Subscription } from '../Subscriptions';

export type BlancDocumentEventHandler = (node: DocumentNode) => void | Observer<DocumentNode>;

export default class BlancDocument {
    nodes: Array<DocumentNode>;
    addSubject: Subject<DocumentNode>;

    constructor() {
      this.nodes = [];
      this.addSubject = new Subject();
    } 

    addComponent(node: DocumentNode) {
      this.nodes.push(node);
      this.addSubject.next(node);
    }

    onDidAddComponent(handler: BlancDocumentEventHandler): Subscription {
      return this.addSubject.subscribe(handler);
    }

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