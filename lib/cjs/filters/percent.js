"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.percent = void 0;
function percent(value, decimals, multiplier) {
    if (decimals === void 0) { decimals = 0; }
    if (multiplier === void 0) { multiplier = 100; }
    value = value === null || isNaN(value) ? 0 : value;
    return (value * 100 / multiplier).toFixed(decimals) + "%";
}
exports.percent = percent;
//# sourceMappingURL=percent.js.map