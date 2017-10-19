import { Node } from './Nodes';

export default class BlancDocument {
    nodes: Array<Node>;

    constructor() {
      this.nodes = [];
    }

    addComponent(node: Node) {
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