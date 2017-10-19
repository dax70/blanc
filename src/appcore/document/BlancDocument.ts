import { DocumentNode } from './Nodes';

export default class BlancDocument {
    nodes: Array<DocumentNode>;

    constructor() {
      this.nodes = [];
    }

    addComponent(node: DocumentNode) {
      this.nodes.push(node);
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