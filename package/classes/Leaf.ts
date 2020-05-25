
import { Any } from './types';

export default abstract class LeafNode {

  /* data text */
  readonly #dataText: Array<string>;

  /* deserialized data */
  readonly value: unknown;

  /* new xyz() */
  constructor(dataText: string) {

    /* leaf text is stored as a private variable */
    this.#dataText = dataText.trim().split('\n').map((x) => x.trim());

    /* deserialize data */
    this.value = this.deserialize();
  }

  /* converts node data into an object */
  abstract deserialize(): Any;

  get(key?: string): unknown {

    if (this.value instanceof Map && key) {
      return this.value.get(key);
    }

    return this.value;
  }

  /* protected variable was not working properly */
  protected getDataText(): Array<string> {
    return this.#dataText;
  }
}
