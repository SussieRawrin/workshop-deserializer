"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boxes = void 0;
const parsimmon_1 = require("parsimmon");
const hardtypes_1 = require("../../../hardtypes");
const boxes = {
    /* "group" */
    group: (x) => parsimmon_1.seqObj(
    /* (ex. "modes", "heroes") */
    ['descriptor', x.mapHeroName], x._, parsimmon_1.string('{'), x._, 
    /* matches any *words* inside a box, also "mapHeroName" empty boxes */
    /* (ex. "{ Secondary Cooldown: 20% }") */
    ['box', parsimmon_1.alt(x.gameSetting.notFollowedBy(parsimmon_1.seq(x._, parsimmon_1.string('{'))), x.description, x.group, 
        /* catches any standalone words (ex. "Deathmatch" w/ no option box) */
        x.mapHeroName.map((m) => ({ [m]: {} })))
            // TODO tidy
            .sepBy(x._).skip((parsimmon_1.seq(x._, parsimmon_1.string('}'))))
            /* merge all individual items into a single object */
            .map((m) => m.reduce((_, v) => ({ ..._, ...v }), {}))
            /* display hardcoded boxes as tuples (ex. "disabled heroes", "disabled maps") */
            .map((m) => ({
            ...m,
            ...Object.entries(m)
                .filter(([k, v]) => hardtypes_1.hardTypes.listNames.includes(k))
                .map(([k, v]) => ({ [k]: Object.keys(v) }))
                .reduce((_, v) => ({ ..._, ...v }), {}),
        })),
    ]).map(
    /* transforms data ({ name: 'x', data: { x } } to { x: x }) */
    (x) => ({ [x.descriptor]: x.box })),
    /* variables */
    variables: (x) => parsimmon_1.seqObj(parsimmon_1.string('variables'), x._, parsimmon_1.string('{'), x._, ['variables', parsimmon_1.seqMap(x.gameSettingName, x._, parsimmon_1.string(':'), x._, parsimmon_1.seqMap(x.integer, x._, parsimmon_1.string(':'), x._, x.variableValue, (...m) => ({ [m[0]]: m[4] }))
            .sepBy(x._).skip(parsimmon_1.notFollowedBy(parsimmon_1.seq(x._, x.integer)))
            .map((m) => m.reduce((_, v) => ({ ..._, ...v }), {})), (...m) => ({ [m[0]]: m[4] }))
            .sepBy(x._).skip(parsimmon_1.seq(x._, parsimmon_1.string('}')))
            .map((m) => m.reduce((_, v) => ({ ..._, ...v }), {})),
    ]),
    /* methods ("subroutines") */
    methods: (x) => parsimmon_1.seqObj(parsimmon_1.string('subroutines'), x._, parsimmon_1.string('{'), x._, 
    // (['methods', seqMap(
    ['subroutines', parsimmon_1.seqMap(x.integer, x._, parsimmon_1.string(':'), x._, x.variableValue, (...m) => ({ [m[0]]: m[4] }))
            .sepBy(x._).skip(parsimmon_1.notFollowedBy(parsimmon_1.seq(x._, x.integer)))
            .map((m) => m.reduce((_, v) => ({ ..._, ...v }), {})),
    ], x._, parsimmon_1.string('}')),
    /* code */
    code: (x) => parsimmon_1.seqObj(
    /* rule title */
    parsimmon_1.alt(parsimmon_1.string('rule'), parsimmon_1.string('disabled rule')), x._, parsimmon_1.string('('), x._, ['title', x.quote.map((q) => q.quote)], x._, parsimmon_1.string(')'), x._, parsimmon_1.string('{'), x._, 
    /* rule boxes */
    // TODO optional
    ['code', parsimmon_1.seqMap(parsimmon_1.letters, x._, parsimmon_1.string('{'), x._, 
        /* code lines */
        parsimmon_1.alt(x.quote, 
        // seqMap(
        x.codeX)
            .sepBy(x._).skip(parsimmon_1.seq(x._, parsimmon_1.lookahead('}'))), x._, parsimmon_1.string('}'), (...m) => ({ [m[0]]: m[4] }))
            .sepBy(x._).skip(parsimmon_1.seq(x._, parsimmon_1.lookahead('}')))
            .map((m) => m.reduce((_, v) => ({ ..._, ...v }), {})),
    ], x._, parsimmon_1.string('}'))
        .sepBy(x._).skip(parsimmon_1.seq(x._, parsimmon_1.eof)),
};
exports.boxes = boxes;
//# sourceMappingURL=boxes.js.map