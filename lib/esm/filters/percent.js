export function percent(value, decimals = 0, multiplier = 100) {
    value = value === null || isNaN(value) ? 0 : value;
    return `${(value * 100 / multiplier).toFixed(decimals)}%`;
}
//# sourceMappingURL=percent.js.map