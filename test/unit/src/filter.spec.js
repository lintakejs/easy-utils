import { lowercase, uppercase, desensitization, mapValue, percent } from '@/filters'

describe('filters describe', () => {
  it('lowercase filter test', () => {
    expect(lowercase('ABC')).toBe('abc')
  })

  it('uppercase filter test', () => {
    expect(uppercase('abc')).toBe('ABC')
  })

  it('desensitization filter test', () => {
    expect(desensitization('18812341234')).toBe('188****1234')
    expect(desensitization('352401200011120543')).toBe('352401********0543')
  })

  it('mapValue filter test', () => {
    expect(mapValue(0, [1, 2])).toBe(1)
    expect(mapValue(0, [{ id: 0, showText: '1' }, { id: 1, showText: '2' }], 'id', 'showText')).toBe('1')
  })

  it('percent filter test', () => {
    expect(percent(50)).toBe('50%')
    expect(percent(50, 0, 200)).toBe('25%')
    expect(percent(51.1, 1, 100)).toBe('51.1%')
  })
})