export function mapValue(value, mapArray = [], key, showKey) {
    if (key) {
        const mapItem = mapArray.find((item) => item[key] === value);
        return mapItem && showKey ? mapItem[showKey] : '';
    }
    else {
        return mapArray[value] || '';
    }
}
//# sourceMappingURL=mapValue.js.map