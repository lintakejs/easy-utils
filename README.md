## 工具类库{docsify-ignore}

!> 工具类库分三大模块，`filter` 过滤器、 `regs` 正则表达式、 `utils` 工具方法.

通过 npm 方法安装

```bash
 npm i @zto-sv/plugin -S 
```


## filter（过滤器）

vue 过滤器

### desensitization (身份证/电话号码脱敏)

```javascript
import { filter } from '@zto-sv/plugin'

Vue.filter('desensitization', filter.desensitization)

{{ '354010199803069103' | desensitization }} => 354010********9103
```

### lowercase（字符串转小写）

```javascript
import { filter } from '@zto-sv/plugin'

Vue.filter('lowercase', filter.lowercase)

{{ 'AbC' | lowercase }} => abc
```

### uppercase（字符串转大写）

```javascript
import { filter } from '@zto-sv/plugin'

Vue.filter('uppercase', filter.uppercase)

{{ 'aBc' | uppercase }} => ABC
```

### mapValue（值映射）

```javascript
/**
* @params {string} value 过滤器输入的值
* @params {Array<string | number | object>} mapArray 映射数组
* @params {string} key 用于对比来自对象数组的key值
* @params {string} showKey 用户展示来自对象数组的key值
*/
mapValue(value: string | number, mapArray: Array<string | number | object> = [], key: string, showKey: string)

import { filter } from '@zto-sv/plugin'

Vue.filter('mapValue', filter.mapValue)

{{ 1 | mapValue(['a', 'b']) }} => b
{{ '0' | mapValue(['a', 'b']) }} => a

{{ 2 | mapValue([{ id: 1, text: 'a' }, { id: 2, text: 'b' }], 'id', 'text') }} => b
```

## regs（正则表达式）

一些常用的正则表达式

### idCardReg（二代身份证）

```javascript
import { regs } from '@zto-sv/plugin'

new RegExp(regs.idCardReg).test('354010199803069103') => true
```

### mobilePhoneNumberReg（手机号码）

```javascript
import { regs } from '@zto-sv/plugin'

new RegExp(regs.mobilePhoneNumberReg).test('18947200145') => true
```

### urlReg（http/https地址）

```javascript
import { regs } from '@zto-sv/plugin'

new RegExp(regs.urlReg).test('https://baidu.com') => true
```

### isBase64 (是否base64)

```javascript
import { regs } from '@zto-sv/plugin'

new RegExp(regs.isBase64Reg).test('data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACWCAYAAAAfduJyAAAAFUlEQVQoU2NID0j6zzAKRkNgJIQAAB9vAhleQ7pTAAAAAElFTkSuQmCC')
```

## 工具方法

一些常用工具方法

目前：

  大部分操作型的工具，建议使用 `lodash` 库，稳定且高效

  日期操作类的工具： 建议使用 `dayjs` / `momentjs` ， 两者区别 `dayjs` 更加小巧，`moment` 操作方法更丰富


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
  // 是否QQ
  qq: boolean;
}

import { utils } from '@zto-sv/plugin'

utils.client(): ClientInfo
```

### compareObj（对象比较去重）
```javascript
import { utils } from '@zto-sv/plugin'

const mainObj = {
  a: 1,
  b: {
    c: 2,
    d: 3
  }
}

const otherObj = {
  b: {
    c: 2
  }
}

utils.compareObj(mainObj, otherObj) => { a: 1, b: { d: 3 } }
```

### debounce（防抖）

```javascript
import { utils } from '@zto-sv/plugin'

/**
* @params {Function} func 执行的防抖函数
* @params {number} wait 毫秒
*/
utils.debounce(func: Function, wait: number)
```

### throttle（节流）

```javascript
import { utils } from '@zto-sv/plugin'

/**
* @params {Function} func 执行的节流函数
* @params {number} wait 毫秒
*/
utils.throttle(func: Function, wait: number)
```

### phoneNumberFormat（手机号码格式化显示）

```javascript
import { utils } from '@zto-sv/plugin'

utils.phoneNumberFormat('18947200145') => '189 4720 0145'
```

### imageCompress（图片质量压缩）

```javascript
import { utils } from '@zto-sv/plugin'

/**
* @params {Blob | File | string} image
* @params {number} quality
*
* image 可以是: 1.远程图片地址。 2. File文件类型。 3. Blob文件类型
*/
utils.imageCompress('https://xxxxx')
```

### queue（队列）

```javascript
import { utils } from '@zto-sv/plugin'

/**
* @params {size} number 队列长度
* 
* 先进先出
*/
const queue = new utils.Queue(100)

// 队列加入数据
queue.push(data: any) 

// 队列取出数据
const queueData = queue.pop()

// 获得队列数组
const queueList = quque.quere

// 获得队列长度
const ququeLength = quere.size

// 清除队列
quque.clear()
```

### linkedStack（链式栈）

```javascript
import { utils } from '@zto-sv/plugin'

/**
* @params {size} number 队列长度
* 
* 先进后出
*/
const linkedStack = new utils.LinkedStack()

// 栈堆推入数据
LinkedStack.push(data: any)

// 栈堆抛出数据
LinkedStack.pop()

// 获取栈堆顶部节点
const topNode: Node<any> = linkedStack.top 

// 获取栈堆长度
const LinkedSize = linkedStack.size

// 清除栈堆
linkedStack.clear()
```

### fetch（对axios封装）

可避免相同请求同时发送的可配置封装

```javascript
import { utils } from '@zto-sv/plugin'

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
  // 可以加入的其他一些参数，可在执行阶段中的initConfig获取
  otherOptions?: object;
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