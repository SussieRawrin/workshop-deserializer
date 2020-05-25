/* eslint-disable max-len */

import {
  DictionaryLeaf,
  CodeBlockLeaf,
  SetLeaf,
  VariablesLeaf,
  UnknownLeaf,
} from './classes/leaves';

const hardtypes: { [key: string]: any } = Object.freeze({
  main: DictionaryLeaf,
  lobby: DictionaryLeaf,
  'enabled maps': SetLeaf,
  'enabled heroes': SetLeaf,
  variables: VariablesLeaf,
});

export { hardtypes };
