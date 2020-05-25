/* eslint-disable max-len */

import LeafNode from './Leaf';

import {
  DictionaryLeaf,
  CodeBlockLeaf,
  SetLeaf,
  VariablesLeaf,
  UnknownLeaf,
} from './leaves';

import { hardtypes } from '../hardtypes';
import VoidLeaf from './leaves/Void';

/* detects type and returns new leaf node */
export function newLeaf(nodeText: string, name: string): LeafNode {

  const dataLines = nodeText.trim().split('\n').map((x) => x.trim());

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const done = <T extends { new (...args: any[]): InstanceType<T> }>(NodeType: T): LeafNode => new NodeType(nodeText);

  /* if the type is directly hardcoded */
  if (hardtypes[name]) {
    return done(hardtypes[name]);
  }

  /* if each line is xyz: xyz */
  /* note some maps will trigger this like (ecopoint: antartica) */

  /* if all lines finish with a semicolon */
  if (dataLines.length === dataLines.filter((x) => /.+;/.test(x)).length) {
    return done(CodeBlockLeaf);
  }

  /* if each line is "xyz: xyz" */
  if (dataLines.length === dataLines.filter((x) => /.+:.+/.test(x)).length) {
    return done(DictionaryLeaf);
  }

  /* if each line has some text */
  if (dataLines.length === dataLines.filter((x) => !!x.length).length) {
    return done(SetLeaf);
  }

  /* if there was no match */
  /* most likely at a deleted text */
  return done(UnknownLeaf);
}


type Container = Map<string, Container | LeafNode>;

/* GOAL: get array of all high level blocks */
export function dataTree(workshopText: string): Container {

  // console.log('scanning', JSON.stringify(workshopText));

  const findings: Container = new Map();

  // eslint-disable-next-line no-param-reassign
  workshopText = workshopText.trim();

  {
    let inquotes = false;
    let depth = 0;

    let falgii = 0;

    for (let i = 0; i < workshopText.length; i += 1) {
      const c = workshopText.charAt(i);

      /* if it's quotes; switch(), next() */
      if (c === '"' && workshopText.substring(i - 1, i) !== '\\') inquotes = !inquotes;

      else if (!inquotes) {

        /* if it's an open bracket directly in this box, save it */
        if (c === '{') {
          if (!depth) falgii = i;
          depth += 1;

        /* if it's a close bracket directly in this box following, push(), boot() */
        /* this will depthify itself */
        } else if (c === '}') {
          depth -= 1;
          if (!depth && !!falgii) {

            const boxText = workshopText.substring(falgii + 1, i);
            let name = workshopText.substring(workshopText.substring(0, falgii).lastIndexOf('}') + 1, falgii).trim();

            /* \n indicated empty blocks */
            /* ex: "Deathmatch\n\n\t\tdisabled Elimination" */
            if (name.includes('\n')) {

              const n = name.split('\n').map((x) => x.trim());

              n.slice(0, n.length - 1).filter((x) => x.length).forEach((x) => {
                findings.set(x, new VoidLeaf());
              });

              name = n[n.length - 1];
            }

            const boxes = dataTree(boxText);

            if (!boxes.size) {
              findings.set(name, newLeaf(boxText, name));
            } else {
              findings.set(name, boxes);
            }

            falgii = 0;
          }
        }
      }
    }
  }

  return findings;
}
