'use strict'

interface ClientInfo {
  // 是否手机端
  mobile: boolean;
  // ios终端
  ios: boolean;
  // android终端
  android: boolean;
  // 是否为iPhone终端
  iPhone: boolean;
  // 是否iPad
  iPad: boolean;
  // 是否web应该程序，没有头部与底部
  webApp: boolean;
  // 是否微信
  weixin: boolean;
  //是否QQ
  qq: boolean;
}

/**
 * @description 判断当前客户端类型
 */
export function client(): ClientInfo {
  const u = navigator.userAgent

  return {
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
    iPhone: u.indexOf('iPhone') > -1,
    iPad: u.indexOf('iPad') > -1,
    webApp: u.indexOf('Safari') == -1,
    weixin: u.indexOf('MicroMessenger') > -1,
    qq: u.toLowerCase().toString().indexOf('qqbrowser') > -1
  }
}
