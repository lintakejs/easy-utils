## regs（正则表达式）

一些常用的正则表达式

### idCardReg（二代身份证）

```javascript
import { regs } from 'easy-utils'

new RegExp(regs.idCardReg).test('354010199803069103') => true
```

### mobilePhoneNumberReg（手机号码）

```javascript
import { regs } from 'easy-utils'

new RegExp(regs.mobilePhoneNumberReg).test('18947200145') => true
```

### emailReg（邮箱）

```javascript
import { regs } from 'easy-utils'

new RegExp(regs.emailReg).test('各种邮箱') => true
```

### twoCatePwdReg（两种字符以上组成的密码）

```javascript
import { regs } from 'easy-utils'

new RegExp(regs.twoCatePwdReg).test('abc@123') => true
```

### isBase64Reg（base编码字符串）

```javascript
import { regs } from 'easy-utils'

new RegExp(regs.isBase64Reg).test('base64的图片') => true
```

```javascript
import { regs } from 'easy-utils'

new RegExp(regs.twoCatePwdReg).test('abc@123') => true
```

### urlReg（http/https地址）

```javascript
import { regs } from 'easy-utils'

new RegExp(regs.urlReg).test('https://baidu.com') => true
```