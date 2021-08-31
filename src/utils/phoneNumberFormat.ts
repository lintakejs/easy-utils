/**
 * 格式化手机号码递归
 * @param phoneNumber 切割后的手机号码
 * @param sliceLength 本次切割长度
 * @param nextSliceLength 下一次切割长度
 */
function phoneNumberFormatMethods(phoneNumber: string, sliceLength: number, nextSliceLength: number): string {
  return phoneNumber.slice(0, sliceLength) + (phoneNumber.slice(sliceLength) === '' ? '' : ' ' + phoneNumberFormatMethods(phoneNumber.slice(sliceLength), nextSliceLength, nextSliceLength))
}

/**
 * 3 4 4格式化手机号码
 * @param phoneNumber 手机号码
 */
export function phoneNumberFormat (phoneNumber: string): string {
  phoneNumber = phoneNumber.replace(/\s/g, '')

  if (phoneNumber.length <= 3) {
    return phoneNumber
  }

  return phoneNumberFormatMethods(phoneNumber, 3, 4)
}
