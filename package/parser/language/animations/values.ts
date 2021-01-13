import {
  alt as choice, lookahead, makeFailure, makeSuccess, Parser, regexp, seq, seqObj, string,
} from 'parsimmon';

const values = {

  /* "quote" (Matches text between two unescaped quotes) */
  quote: () => seqObj(
    string('"'),
    (['quote', regexp(/(?:[^"\\]|\\.)*/)] as any),
    string('"'),
  ),

  /* "mapHeroName" (Allows: [' ', 'â', 'a', ':', '(', ')'], not ending with ' ') */
  mapHeroName: () => regexp(/[\p{L} ():0-9]+(?<! )/u),

  /* "gameSettingName" (Allows: [' ', 'â', 'a'], not ending with ' ') */
  gameSettingName: () => regexp(/[\p{L} -]+(?<! )/u),

  /* "gameSettingValue" (Allows: ['9%', <gameSettingName>, 9]) */
  gameSettingValue: (x: any) => choice(
    seq(x.digits, string('%')).tie(),
    x.gameSettingName,
    x.integer,
  ),

  variableValue: (x: any) => regexp(/[A-z0-9_]+/),

  /* "integer" (Parses at least one number digit, outputs <number>) */
  integer: () => regexp(/[0-9]+/).map((x) => Number(x)),

  /* "digits" (Parses at least one number digit, outputs <string>number) */
  digits: () => regexp(/[0-9]+/),

  /* "code" (Parses any text up to a ;) */

  // TODO : allow multiline comments with linebreaks

  // codeX: (x: any) => alt(
  //   x.quote,
  //   regexp(/[^;]+/),
  // ).sepBy(x._).skip(seq(x._, lookahead(string(';')))),

  // codex: () => regexp(/.+(?=;)/),
  // todo make this a regex
  // "code x" (matches any character up until a non-quoted ";")
  codeX: ((/* s: string */) => Parser((s: string, _i: number) => {
    const done = false;
    let i = _i;
    let inquotes = false;

    while (!done) {

      if (s.charAt(i) === ';' && !inquotes) {
        return makeSuccess(i + 1, s.substring(_i, i)) as any;
      }

      if (s.charAt(i) === '"' && s.charAt(i - 1) !== '\\') {
        inquotes = !inquotes;
      }

      if (s.charAt(i) === '}' && !inquotes) {
        return makeFailure(i, "Found '}'");
      }

      if (i > s.length) {
        return makeFailure(i, "Didn't find an end to this code block! :(");
      }

      i++;
    }
  })),
};

export {
  values,
};
