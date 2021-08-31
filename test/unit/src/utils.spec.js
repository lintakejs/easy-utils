/**
 * @vue/test-utils guide
 * @see https://vue-test-utils.vuejs.org/zh/guides/
 */
import { client, phoneNumberFormat, imageCompress } from '@/'

import createMockXHR from '~/__mock__/xhr.mock'

jest.useFakeTimers()

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

describe('utils describe', () => {
  const oldXMLHttpRequest = window.XMLHttpRequest
  let mockXHR = null

  beforeEach(() => {
    mockXHR = createMockXHR()
    window.XMLHttpRequest = jest.fn(() => mockXHR)
  })

  afterEach(() => {
    window.XMLHttpRequest = oldXMLHttpRequest
  })

  it('client test', () => {
    expect(client()).toEqual({
      mobile: false,
      ios: false,
      android: false,
      iPhone: false,
      iPad: false,
      webApp: true,
      weixin: false,
      qq: false
    })
  })

  // it('debounce test', () => {
  //   let fn = jest.fn()
  //   let debounceJestFn = debounce(fn, 1000)
  //   debounceJestFn()
  //   debounceJestFn()
  //   jest.runAllTimers()
  //   expect(fn).toBeCalledTimes(1)
  // })

  // it('throttle test', () => {
  //   let fn = jest.fn()
  //   let throttleJestFn = throttle(fn, 1000)
  //   throttleJestFn()
  //   throttleJestFn()
  //   jest.runAllTimers()
  //   expect(fn).toBeCalledTimes(1)
  // })

  it('phoneNumberFormat test', () => {
    expect(phoneNumberFormat('188')).toBe('188')
    expect(phoneNumberFormat('18812345678')).toBe('188 1234 5678')
  })

  it('imageCompress test', () => {
    const imgLoadPromise = imageCompress('', 0.5)
    mockXHR.response = dataURLtoBlob('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACWCAYAAAAfduJyAAAAFUlEQVQoU2NID0j6zzAKRkNgJIQAAB9vAhleQ7pTAAAAAElFTkSuQmCC')
    // mockXHR.onload()
    imgLoadPromise.then(data => {
      expect(data).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACWCAYAAAAfduJyAAAAFUlEQVQoU2NID0j6zzAKRkNgJIQAAB9vAhleQ7pTAAAAAElFTkSuQmCC')
    }).catch(e => {
      console.log(e)
    })
  })
})
