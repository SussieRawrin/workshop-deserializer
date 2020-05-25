
import LeafNode from '../Leaf';
import { Set } from '../types';

export default class SetLeaf extends LeafNode {

  /* processes code blocks xwx */
  deserialize(): Set {
    return this.getDataText();
  }
}
