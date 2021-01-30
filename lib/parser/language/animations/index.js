"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsers = void 0;
const parsimmon_1 = require("parsimmon");
const boxes_1 = require("./boxes");
const values_1 = require("./values");
const words_1 = require("./words");
const parsers = {
    /* values (digits, integer) */
    ...values_1.values,
    /* minor syntax */
    ...words_1.words,
    /* boxes */
    ...boxes_1.boxes,
    ...{
        /* main parser */
        /* workshop: (x: any) => x.workshopScript, */
        // workshopScript: (x: any) => x.group,
        workshopScript: (x) => parsimmon_1.seqMap(
        /* todo: do something different if it's "actions" (two code) */
        parsimmon_1.alt(x.group, x._), x._, parsimmon_1.alt(x.variables, x._), x._, parsimmon_1.alt(x.methods, x._), x._, parsimmon_1.alt(x.code, x._), ((...m) => ([m[0], m[2], m[4], (m[6].length) ? { rules: m[6] } : undefined])))
            .map((m) => m.reduce((_, v) => ({ ..._, ...v }), {})),
    },
    ...{
        /* optional whitespace */
        _: () => parsimmon_1.optWhitespace,
        /* can do necessary whitespace too */
        __: () => parsimmon_1.whitespace,
    },
};
exports.parsers = parsers;
//# sourceMappingURL=index.js.map