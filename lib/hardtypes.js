"use strict";
/* box names that contain only tuples */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hardTypes = exports.listNames = void 0;
/*
  it's difficult to detect these naturally because a list could just be
  disabled maps {
    Ecopoint: Antartica
  }
  which is also a valid gameSetting because of the ":"
*/
exports.listNames = Object.freeze([
    'enabled maps',
    'enabled heroes',
    'disabled maps',
    'disabled heroes',
]);
exports.hardTypes = {
    listNames: exports.listNames,
};
//# sourceMappingURL=hardtypes.js.map