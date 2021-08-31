export function mapValue (value: string | number, mapArray: Array<string | number | Record<string | number, any>> = [], key?: string, showKey?: string) {
  if (key) {
    const mapItem = (mapArray as Array<Record<string, any>>).find((item) => item[key] === value)
    return mapItem && showKey ? mapItem[showKey] : ''
  } else {
    return mapArray[value as any] || ''
  }
}
