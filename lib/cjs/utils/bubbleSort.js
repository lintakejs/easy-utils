"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubbleSort = void 0;
function bubbleSort(arr) {
    var arrLength = arr.length;
    if (arrLength <= 1) {
        return arr;
    }
    for (var i = 0; i < arrLength - 1; i++) {
        for (var j = 0; j < arrLength - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
exports.bubbleSort = bubbleSort;
//# sourceMappingURL=bubbleSort.js.map