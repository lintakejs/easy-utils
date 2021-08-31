## filter（过滤器）

vue 过滤器

### desensitization (身份证/电话号码脱敏)

```javascript
import { filter } from 'easy-utils'

Vue.filter('desensitization', filter.desensitization)

{{ '354010199803069103' | desensitization }} => 354010********9103
```

### lowercase（字符串转小写）

```javascript
import { filter } from 'easy-utils'

Vue.filter('lowercase', filter.lowercase)

{{ 'AbC' | lowercase }} => abc
```

### uppercase（字符串转大写）

```javascript
import { filter } from 'easy-utils'

Vue.filter('uppercase', filter.uppercase)

{{ 'aBc' | uppercase }} => ABC
```

### percent（数值转百分比）
```javascript
/**
 * @params {number} value 过滤器输入的值
 * @params {number} decimals 保存小数位数
 * @params {number} multiplier 对照百分比参数
*/
decimals(value: number, decimals = 0, multiplier = 100): string

import { filter } from 'easy-utils'

Vue.filter('percent', filter.percent)

{{ 25.11 | percent(1, 100) }} => '25.1%'
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

import { filter } from 'easy-utils'

Vue.filter('mapValue', filter.mapValue)

{{ 1 | mapValue(['a', 'b']) }} => b
{{ '0' | mapValue(['a', 'b']) }} => a

{{ 2 | mapValue([{ id: 1, text: 'a' }, { id: 2, text: 'b' }], 'id', 'text') }} => b
```