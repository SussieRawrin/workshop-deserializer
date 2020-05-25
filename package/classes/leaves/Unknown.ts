
import LeafNode from '../Leaf';
import { Unknown } from '../types';

export default class UnknownLeaf extends LeafNode {

  /* unknown data */
  deserialize(): Unknown {
    return this.getDataText();
  }
}
