export function bubbleSort(arr) {
    const arrLength = arr.length;
    if (arrLength <= 1) {
        return arr;
    }
    for (let i = 0; i < arrLength - 1; i++) {
        for (let j = 0; j < arrLength - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
//# sourceMappingURL=bubbleSort.js.map