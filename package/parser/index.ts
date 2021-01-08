
import { alt, createLanguage, optWhitespace, regex, regexp, sepBy, seq, seqMap, seqObj, string } from 'parsimmon';
import { hardTypes } from '../hardtypes';

/* minor syntax */
const minors = {

  integer: () => regexp(/[0-9]+/).map((x) => Number(x)),

  digits: () => regexp(/[0-9]+/),

  /* "mapHeroName" (Allows: [' ', 'â', 'a', ':', '(', ')'], not ending with ' ') */
  mapHeroName: () => {
    return regexp(/[\p{L} ():0-9]+(?<! )/u)
  },

  /* "gameSettingName" (Allows: [' ', 'â', 'a'], not ending with ' ') */
  gameSettingName: () => {
    return regexp(/[\p{L} -]+(?<! )/u)
  },

  gameSettingValue: (x: any) => alt(
    seq(x.digits, string('%')).tie(),
    x.gameSettingName,
    x.integer,
  ),

  /* optional whitespace */
  /* can do necessary whitespace too */
  _: () => {
    return optWhitespace
  },
}


const majors = {

  /* "quote" (Matches text between two unescaped quotes) */
  quote: () => seqObj(
    string('"'),
    (["quote", regexp(/(?:[^"\\]|\\.)*/)] as any),
    string('"'),
  ),

  /* "description" */
  description: (x: any) => seqObj(
    string('Description:'),
    x._,
    (['description', x.quote.map((q: any) => q.quote)] as any),
  ),

  /* "gameSetting" */
  gameSetting: (x: any) => seqMap(
    x.gameSettingName,
    x._,
    string(':'),
    x._,
    x.gameSettingValue,
    (...m: any) => ({ [m[0]]: m[4] }),
  ),
}


const workshopScript = createLanguage({

  ...minors,

  ...majors,

  /* "group" */
  group: (x: any) => seqObj(
    
    /* group name */
    (["name", x.mapHeroName] as any),
    x._,
    string('{'),
    x._,
    
    /* box data */
    (["data",

      /* any data type */
      alt(
        x.gameSetting,
        x.description,
        x.group,
        x.mapHeroName.map((m: any) => ({ [m]: { } })),
          // .map((x: any) => ({ ...x, ...{ _merge: true } })),
      )
      .sepBy(x._)
      
      .skip(seq(x._, string('}')))

      /* merge all individual items into a single object */
      .map((x: any) => x.reduce((_: any, v: any) => { return { ..._, ...v } }, { }))
      .map((x: any) => {
        for (const [k, v] of Object.entries(x)) {
          if (hardTypes.listNames.includes(k)) {
            return { [k]: Object.keys(v as any) }
          }
        }

        return x;
      })

    ] as any)
    // x._,

  )
    /* transforms data ({ name: 'x', data: { x } } to { x: x }) */
    .map((x: any) => ({ [x.name]: x.data })),

  // workshop: () => { }
  workshop: (x: any) => x.group,
  
});



export const getData = (file: string): any => {

  const data = workshopScript.workshop.tryParse(file);

  return data;
}