
import LeafNode from '../Leaf';
import { Void } from '../types';

export default class VoidLeaf extends LeafNode {

  constructor() {
    super('');
  }

  /* unknown data */
  // eslint-disable-next-line class-methods-use-this
  deserialize(): Void {
    return false;
  }
}
