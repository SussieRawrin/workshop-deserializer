"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.values = void 0;
const parsimmon_1 = require("parsimmon");
const values = {
    /* "quote" (Matches text between two unescaped quotes) */
    quote: () => parsimmon_1.seqObj(parsimmon_1.string('"'), ['quote', parsimmon_1.regexp(/(?:[^"\\]|\\.)*/)], parsimmon_1.string('"')),
    /* "mapHeroName" (Allows: [' ', 'â', 'a', ':', '(', ')'], not ending with ' ') */
    mapHeroName: () => parsimmon_1.regexp(/[\p{L} ():0-9]+(?<! )/u),
    /* "gameSettingName" (Allows: [' ', 'â', 'a'], not ending with ' ') */
    gameSettingName: () => parsimmon_1.regexp(/[\p{L} -]+(?<! )/u),
    /* "gameSettingValue" (Allows: ['9%', <gameSettingName>, 9]) */
    gameSettingValue: (x) => parsimmon_1.alt(parsimmon_1.seq(x.digits, parsimmon_1.string('%')).tie(), x.gameSettingName, x.integer),
    variableValue: (x) => parsimmon_1.regexp(/[A-z0-9_]+/),
    /* "integer" (Parses at least one number digit, outputs <number>) */
    integer: () => parsimmon_1.regexp(/[0-9]+/).map((x) => Number(x)),
    /* "digits" (Parses at least one number digit, outputs <string>number) */
    digits: () => parsimmon_1.regexp(/[0-9]+/),
    /* "code" (Parses any text up to a ;) */
    // TODO : allow multiline comments with linebreaks
    // codeX: (x: any) => alt(
    //   x.quote,
    //   regexp(/[^;]+/),
    // ).sepBy(x._).skip(seq(x._, lookahead(string(';')))),
    // codex: () => regexp(/.+(?=;)/),
    // todo make this a regex
    // "code x" (matches any character up until a non-quoted ";")
    codeX: (( /* s: string */) => parsimmon_1.Parser((s, _i) => {
        const done = false;
        let i = _i;
        let inquotes = false;
        while (!done) {
            if (s.charAt(i) === ';' && !inquotes) {
                return parsimmon_1.makeSuccess(i + 1, s.substring(_i, i));
            }
            if (s.charAt(i) === '"' && s.charAt(i - 1) !== '\\') {
                inquotes = !inquotes;
            }
            if (s.charAt(i) === '}' && !inquotes) {
                return parsimmon_1.makeFailure(i, "Found '}'");
            }
            if (i > s.length) {
                return parsimmon_1.makeFailure(i, "Didn't find an end to this code block! :(");
            }
            i++;
        }
    })),
};
exports.values = values;
//# sourceMappingURL=values.js.map