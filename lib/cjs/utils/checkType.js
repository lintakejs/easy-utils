"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkType = void 0;
function checkType(param) {
    return Object.prototype.toString.call(param).slice(8, -1).toLowerCase();
}
exports.checkType = checkType;
//# sourceMappingURL=checkType.js.map