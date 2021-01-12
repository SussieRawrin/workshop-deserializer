"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workshopScript = void 0;
const parsimmon_1 = require("parsimmon");
const animations_1 = require("../animations");
const { workshopScript } = parsimmon_1.createLanguage(animations_1.parsers);
exports.workshopScript = workshopScript;
//# sourceMappingURL=index.js.map