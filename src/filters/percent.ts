export function percent (value: number, decimals = 0, multiplier = 100): string {
  value = value === null || isNaN(value) ? 0 : value
  return `${(value * 100 / multiplier).toFixed(decimals)}%`
}
