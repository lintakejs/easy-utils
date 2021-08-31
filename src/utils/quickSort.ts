export function quickSort(arr: Array<number>): Array<number> {
  // 如果数组不可在分，则跳出递归
  if (arr.length <= 1) {
    return arr;
  }
  // 基准值取数组第一个
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    // 小于等于基准值的放在左边,大于基准值的放在右边
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 对左右数组递归quickSort，最后合并成一个完整的数组
  return quickSort(left).concat(pivot).concat(quickSort(right));
}
