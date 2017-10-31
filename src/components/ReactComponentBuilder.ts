import { LeafNode, CompositeNode, BinaryNode, VisitorHandler } from '../appcore/document/Nodes';

class VisualNodeHandler implements VisitorHandler {
  renderTree = [];

  visitLeaf(node: LeafNode ): void {
    //
  }
  
  visitComposite(node: CompositeNode): void {
    //
  }

  visitBinary(node: BinaryNode): void {
    throw new Error('Method not implemented.');
  }
}

export {
  VisualNodeHandler
};