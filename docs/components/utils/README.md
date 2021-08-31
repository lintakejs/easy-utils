## 工具类库{docsify-ignore}

!> 工具类库分三大模块，`filter` 过滤器、 `regs` 正则表达式、 `utils` 工具方法.

通过 npm 方法安装

```bash
 npm i easy-utils -S 
```

### client（获取客户端类型）

```javascript
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

import { utils } from 'easy-utils'

utils.client(): ClientInfo
```

### phoneNumberFormat（手机号码格式化显示）

```javascript
import { utils } from 'easy-utils'

utils.phoneNumberFormat('18947200145') => '189 4720 0145'
```

### fetch（对axios封装）

可避免相同请求同时发送的可配置封装

```javascript
import { utils } from 'easy-utils'

/**
* 对于axios的基础属性
*/
const config = {
  // axios的基础配置
  ...axios.defaultConfig,
  // 是否开启请求缓存（请求未返回时，不予许再次发送）
  cacheRequest?: boolean;
  // 请求发送之前，可以做些什么
  beforeRequest?: (nowConfig?: config, initConfig?: config) => void | config;
  // 请求发送失败时，可以做些什么
  requestError?: (err?: Error, initConfig?: config) => void | config;
  // 请求返回之前，可以做些什么
  beforeResponse?: (responseData: AxiosResponse, nowConfig?: config, initConfig?: config) => any;
  // 请求返回失败，可以做些什么
  responseError?: (err?: Error, initConfig?: config) => void | config;
  // 是否缓存请求
  cacheRequest?: boolean;
  // 在缓存请求的前提下，决定如何处理再次请求，'cancel'为丢弃旧请求发出新请求，'return'为不发出新请求。
  cacheRequestFn?: 'cancel' | 'return';
}

const axiosFetch =  new utils.fetch(config)

// post
axiosFetch.post

// get
axiosFetch.get

// delete
axiosFetch.delete

// put
axiosFetch.put
```