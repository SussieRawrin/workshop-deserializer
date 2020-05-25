
import LeafNode from '../Leaf';
import { Dictionary } from '../types';

export default class DictionaryLeaf extends LeafNode {

  /* processes dictonaries */
  deserialize(): Dictionary {

    const dictionary: Dictionary = new Map();

    this.getDataText().forEach((x) => {
      const key = x.substring(0, x.lastIndexOf(':')).trim();
      const val = x.substring(x.lastIndexOf(':') + 1).trim();

      dictionary.set(key, (/^\d+$/).test(val) ? parseInt(val, 10) : val);
    });

    return dictionary;
  }
}
