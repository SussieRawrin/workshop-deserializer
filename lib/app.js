"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopDeserialize = void 0;
const parser_1 = require("./parser");
const WorkshopDeserialize = (workshopSettings) => parser_1.parse(workshopSettings);
exports.WorkshopDeserialize = WorkshopDeserialize;
// test trick
require('fs').writeFileSync('dist.json', JSON.stringify(WorkshopDeserialize(require('fs').readFileSync('VCC9V', { encoding: 'utf8' })), null, 2));
exports.default = WorkshopDeserialize;
//# sourceMappingURL=app.js.map