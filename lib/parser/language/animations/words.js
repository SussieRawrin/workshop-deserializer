"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.words = void 0;
const parsimmon_1 = require("parsimmon");
const words = {
    /* "description" (Matches >Description: "uwu"<, with any escaped quotes */
    description: (x) => parsimmon_1.seqObj(parsimmon_1.string('Description:'), x._, ['description', x.quote.map((q) => q.quote)]),
    /* "gameSetting" (Matches ["Secondary Cooldown: 9%", "Ecopoint: Antartica", "Max Players: 8") */
    gameSetting: (x) => parsimmon_1.seqMap(parsimmon_1.alt(x.gameSettingName, x.workshopSettingName), x._, parsimmon_1.string(':'), x._, x.gameSettingValue, (...m) => ({ [m[0]]: m[4] })),
};
exports.words = words;
//# sourceMappingURL=words.js.map