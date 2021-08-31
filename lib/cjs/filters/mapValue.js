"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapValue = void 0;
function mapValue(value, mapArray, key, showKey) {
    if (mapArray === void 0) { mapArray = []; }
    if (key) {
        var mapItem = mapArray.find(function (item) { return item[key] === value; });
        return mapItem && showKey ? mapItem[showKey] : '';
    }
    else {
        return mapArray[value] || '';
    }
}
exports.mapValue = mapValue;
//# sourceMappingURL=mapValue.js.map