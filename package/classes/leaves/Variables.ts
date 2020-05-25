
import LeafNode from '../Leaf';
import { Variables } from '../types';

export default class VariablesLeaf extends LeafNode {

  /* processes variable i64 dictionaries */
  /*
    at least one of these two will be present and populated
    if variables is present
  {
    global?:
      0: test
      24: anything

    player?:
      9: test
      90: xwx
  }
  */
  deserialize(): Variables {

    const variables: Variables = new Map();

    /* new iterative (ex. "global", "player") */
    let iteration: string;

    this.getDataText().forEach((x) => {

      const next = x.trim();

      /* if the line matches something like */
      /* "global:" and "player:" */
      if (next.length) {

        if (/^.+:$/.test(next)) {
          iteration = next.substring(0, next.lastIndexOf(':'));
          variables.set(iteration, new Map());
        } else {
          const map = variables.get(iteration);
          if (!map) throw new Error('Tried to access a variable group that does not exist');
          map.set(Number.parseInt(next.substring(0, next.indexOf(':')).trim(), 10), next.substring(next.indexOf(':') + 1).trim());
        }
      }

    });

    return variables;
  }
}
