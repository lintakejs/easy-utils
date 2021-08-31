export function mapValue(value, mapArray, key, showKey) {
    if (mapArray === void 0) { mapArray = []; }
    if (key) {
        var mapItem = mapArray.find(function (item) { return item[key] === value; });
        return mapItem && showKey ? mapItem[showKey] : '';
    }
    else {
        return mapArray[value] || '';
    }
}
//# sourceMappingURL=mapValue.js.map