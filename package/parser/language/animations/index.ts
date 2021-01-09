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
        x.code,
        x._,
      ),
      // TODO escaped code ;
      ((...m: any) => ([m[0], m[2], { rules: m[4] }])),
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
