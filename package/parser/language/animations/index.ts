import {
  alt, createLanguage, optWhitespace, seq, seqMap, whitespace,
} from 'parsimmon';
import { boxes } from './boxes';
import { values } from './values';
import { words } from './words';

const parsers = {

  /* values (digits, integer) */
  ...values,

  /* minor syntax */
  ...words,

  /* boxes */
  ...boxes,

  ...{
    /* main parser */
    /* workshop: (x: any) => x.workshopScript, */
    // workshopScript: (x: any) => x.group,
    workshopScript: (x: any) => seqMap(
      /* todo: do something different if it's "actions" (two code) */
      alt(
        x.group,
        x._,
      ),
      x._,
      alt(
        x.variables,
        x._,
      ),
      x._,
      alt(
        x.methods,
        x._,
      ),
      x._,
      alt(
        x.code,
        x._,
      ),
      ((...m: any) => ([m[0], m[2], m[4], (m[6].length) ? { rules: m[6] } : undefined])),
    )
      .map((m: any) => m.reduce((_: any, v: any) => ({ ..._, ...v }), { })),
    // ws: (x: any) => x.workshopScript,
  },

  ...{

    /* optional whitespace */
    _: () => optWhitespace,

    /* can do necessary whitespace too */
    __: () => whitespace,
  },
};

export {
  parsers,
};
