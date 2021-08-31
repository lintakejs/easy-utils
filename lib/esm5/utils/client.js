'use strict';
export function client() {
    var u = navigator.userAgent;
    return {
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') == -1,
        weixin: u.indexOf('MicroMessenger') > -1,
        qq: u.toLowerCase().toString().indexOf('qqbrowser') > -1
    };
}
//# sourceMappingURL=client.js.map