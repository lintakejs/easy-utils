"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareObj = void 0;
function compareObj(mainObj, otherObj) {
    if (mainObj === void 0) { mainObj = {}; }
    if (otherObj === void 0) { otherObj = {}; }
    var diffObj = {};
    var vChhildren;
    for (var key in mainObj) {
        if (typeof (mainObj[key]) === 'object' && typeof (otherObj[key]) === 'object' && mainObj[key] && otherObj[key]) {
            vChhildren = compareObj(mainObj[key], otherObj[key]);
            if (Object.keys(vChhildren).length > 0) {
                diffObj[key] = vChhildren;
            }
        }
        else if (mainObj[key] !== otherObj[key]) {
            diffObj[key] = mainObj[key];
        }
    }
    return diffObj;
}
exports.compareObj = compareObj;
//# sourceMappingURL=compareObj.js.map