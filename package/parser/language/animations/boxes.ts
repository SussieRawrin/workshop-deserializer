import {
  alt, digits, eof, lookahead, notFollowedBy, seq, seqMap, seqObj, string,
} from 'parsimmon';
import { hardTypes } from '../../../hardtypes';

const boxes = {

  /* "group" */
  group: (x: any) => seqObj(

    /* (ex. "modes", "heroes") */
    (['descriptor', x.mapHeroName] as any),
    x._,
    string('{'),
    x._,

    /* matches any *words* inside a box, also "mapHeroName" empty boxes */
    /* (ex. "{ Secondary Cooldown: 20% }") */
    (['box', alt(
      x.gameSetting,
      x.description,
      x.group,

      /* catches any standalone words (ex. "Deathmatch" w/ no option box) */
      x.mapHeroName.map((m: any) => ({ [m]: {} })),
    )
      .sepBy(x._).skip(seq(x._, string('}')))

    /* merge all individual items into a single object */
      .map((x: any) => x.reduce((_: any, v: any) => ({ ..._, ...v }), { }))

    /* display hardcoded boxes as tuples (ex. "disabled heroes", "disabled maps") */
      .map((x: any) => ({
        ...x,
        ...Object.entries(x)
          .filter(([k, v]) => hardTypes.listNames.includes(k))
          .map(([k, v]) => ({ [k]: Object.keys(v as any) }))
          .reduce((_: any, v: any) => ({ ..._, ...v }), { }),
      })),

    ] as any),
  ).map(

    /* transforms data ({ name: 'x', data: { x } } to { x: x }) */
    (x: any) => ({ [x.descriptor]: x.box }),
  ),

  /* variables */
  variables: (x: any) => seqObj(
    string('variables'),
    x._,
    string('{'),
    x._,
    (['variables', seqMap(
      x.gameSettingName,
      x._,
      string(':'),
      x._,
      seqMap(
        x.integer,
        x._,
        string(':'),
        x._,
        x.variableValue,

        (...m: any) => ({ [m[0]]: m[4] }),
      )
        .sepBy(x._).skip(notFollowedBy(seq(x._, x.integer)))
        .map((m: any) => m.reduce((_: any, v: any) => ({ ..._, ...v }), { })),

      (...m: any) => ({ [m[0]]: m[4] }),
    )
      .sepBy(x._).skip(seq(x._, string('}')))
      .map((m: any) => m.reduce((_: any, v: any) => ({ ..._, ...v }), { })),
    ] as any),
  ),

  /* code */
  code: (x: any) => seqObj(

    /* rule title */
    alt(
      string('rule'),
      string('disabled rule'),
    ),
    x._,
    string('('),
    x._,
    (['title', x.quote.map((q: any) => q.quote)] as any),
    x._,
    string(')'),
    x._,
    string('{'),
    x._,

    /* rule boxes */
    // TODO optional
    (['code', seqMap(
      x.gameSettingName,
      x._,
      string('{'),
      x._,

      /* code lines */
      alt(
        x.quote,
        // seqMap(
        x.codeX,
        // string(';'),
        // (m: any) => m,
        // ),
      )
        .sepBy(x._).skip(seq(x._, lookahead('}'))),

      x._,
      string('}'),

      (...m: any) => ({ [m[0]]: m[4] }),
    )
      .sepBy(x._).skip(seq(x._, lookahead('}')))
      .map((m: any) => m.reduce((_: any, v: any) => ({ ..._, ...v }), { })),

    ] as any),

    x._,
    string('}'),
  )
    .sepBy(x._).skip(seq(x._, eof))
    .map((m: any) => m.map((z: any) => ({ [z.title]: z.code }))),

  /* they allow 2 rules with the same title, so i can't do this D: */
  // TODO add a comment? uwu
  // .map((m: any) => m.reduce((_: any, v: any) => ({ ..._, ...v }), { })),

  // .map((m: any) => ({ [m.title]: m.code })),
  // .map((m: any) => (m))
  // .sepBy(x._).skip(seq(x._, string('}'))),
};

export {
  boxes,
};
