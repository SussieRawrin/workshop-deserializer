
import LeafNode from '../Leaf';
import { CodeBlock } from '../types';

export default class CodeBlockLeaf extends LeafNode {

  /* processes code blocks xwx */
  deserialize(): CodeBlock {
    return this.getDataText();
  }
}
