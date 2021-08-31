
export function compareObj(mainObj: Record<string, any> = {}, otherObj: Record<string, any> = {}): Record<string, any> {
  const diffObj: Record<string, any> = {}
  let vChhildren;
  for (const key in mainObj) {
    if (typeof (mainObj[key]) === 'object' && typeof (otherObj[key]) === 'object' && mainObj[key] && otherObj[key]) {
      vChhildren = compareObj(mainObj[key], otherObj[key])
      if (Object.keys(vChhildren).length > 0) {
        diffObj[key] = vChhildren
      }
    } else if (mainObj[key] !== otherObj[key]) {
      diffObj[key] = mainObj[key]
    }
  }

  return diffObj
}
