import { alt, regexp, seq, seqObj, string } from "parsimmon";

const values = {

  /* "quote" (Matches text between two unescaped quotes) */
  quote: () => seqObj(
    string('"'),
    (["quote", regexp(/(?:[^"\\]|\\.)*/)] as any),
    string('"'),
  ),

  /* "mapHeroName" (Allows: [' ', 'â', 'a', ':', '(', ')'], not ending with ' ') */
  mapHeroName: () => {
    return regexp(/[\p{L} ():0-9]+(?<! )/u)
  },

  /* "gameSettingName" (Allows: [' ', 'â', 'a'], not ending with ' ') */
  gameSettingName: () => {
    return regexp(/[\p{L} -]+(?<! )/u)
  },

  /* "gameSettingValue" (Allows: ['9%', <gameSettingName>, 9]) */
  gameSettingValue: (x: any) => alt(
    seq(x.digits, string('%')).tie(),
    x.gameSettingName,
    x.integer,
  ),

  variableValue: (x: any) => {
    return regexp(/[A-z0-9_]+/)
  },

  /* "integer" (Parses at least one number digit, outputs <number>) */
  integer: () => regexp(/[0-9]+/).map((x) => Number(x)),

  /* "digits" (Parses at least one number digit, outputs <string>number)*/
  digits: () => regexp(/[0-9]+/),

  /* "code" (Parses any text up to a ;) */
  code: () => regexp(/.+(?=;)/),
  
}

export {
  values,
}