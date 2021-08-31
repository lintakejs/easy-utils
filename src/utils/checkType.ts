type ParamType = 'number' | 'string' | 'boolean' | 'object' | 'function' | 'array' | 'symbol' | 'null' | 'undefined'

/**
 * @description 判断数据类型
 * @param param 任意类型
 * @returns 返回类型值字符串
 */
export function checkType(param: any) {
  return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() as ParamType
}
