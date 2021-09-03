### webSocketCore 封装

由在线客服客户端项目，引发对于长连接的心跳/消息分发/重连等场景的处理。
webSocketCore 是基于rxjs/socket包封装，通过EventEmitter通知订阅者。这样的处理可以区分开来数据上游分散至视图下游聚合的处理。 

<script setup>
import { ref } from 'vue'
import { EventEmitter, WebSocketCore } from 'lin_easy-utils'

const emitter = new EventEmitter()
emitter.on(WebSocketCore.open, () => {
  console.log('a new socket open')
})
emitter.on(WebSocketCore.close, () => {
  console.log('socket close')
})
emitter.on(WebSocketCore.message, (res) => {
  console.log(`socket recevier service message：${JSON.stringify(res)}`)
})
emitter.on(WebSocketCore.reconnect, () => {
  console.log('socket reconnect')
})

const socketManager = new WebSocketCore({
  hearBeatTime: 5000,
  connectUrlGenerator: async () => {
    const url = await new Promise((resolve) => {
      resolve('ws://121.5.161.224:3002/socket.io')
    })

    return url
  },
  hdDataGenerator: () => {
    return sendHearBeat.value ? {
      event: 'hearBeat',
      msg: 'ping'
    } : { event: 'noHearBeat', msg: '' }
  },
  hdDataValidtor: (res) => {
    return res.event === 'hearBeat'
  }
}, emitter)

const inputMsg = ref('')
const sendHearBeat = ref(true)

function openSocket() {
  socketManager.createSocket()
}

function closeSocket() {
  socketManager.close()
}

function sendMsg() {
  const sendObj = {
    event: 'message',
    msg: inputMsg.value
  }
  socketManager.send(sendObj)
}

function stopHeadBeat() {
  sendHearBeat.value = !sendHearBeat.value
}
</script>
<ClientOnly>
<input type='textarea' v-model='inputMsg' />
<button @click="openSocket">开启socket连接</button>
<button @click="closeSocket">关闭socket连接</button>
<button @click="sendMsg">发送消息</button>
<button @click="stopHeadBeat">{{sendHearBeat ? '暂停' : '开启'}}服务端心跳</button>
</ClientOnly>

### 使用

```js
import { EventEmitter, WebSocketCore } from 'easy-utils'
// 事件总线
const emitter = new EventEmitter()
// 监听 socket 的各类事件，socket事件key均为symbol类型，绑定在WebSocketCore的静态属性上
emitter.on(WebSocketCore.open, () => {
  console.log('a new socket open')
})
emitter.on(WebSocketCore.close, () => {
  console.log('socket close')
})
emitter.on(WebSocketCore.message, (res) => {
  console.log(`socket recevier service message：${JSON.stringify(res)}`)
})
emitter.on(WebSocketCore.reconnect, () => {
  console.log('socket reconnect')
})

const socketManager = new WebSocketCore<T>({
  // 注册连接 - 正常的连接过程是需要认证的，大多数情况均为token（cors），需要用户定义通过认证，才可以开始连接
  connectUrlGenerator: () => Promise<string>;
  // 心跳发出间隔时间
  hearBeatTime: 3000,
  // 心跳包生成器，交由使用方生成
  hdDataGenerator: () => T;
  // 服务端心跳包验证器，本工具验证心跳逻辑是 通过用户定义的函数，则会认为该连接在下一次达到心跳丢失阈值任然有效
  hdDataValidtor: (res: T) => boolean;
  // 心跳包超时是否重连
  timeoutReconnect?: boolean;
  // socket 其他的一些配置
  socketConfig?: {
    protocol?: string | string[];
    binaryType?: 'blob' | 'arraybuffer';
  }
})

// socket 提供 send、close 函数
// 客户端发送消息
socketManager.send(msg: T)
// 客户端关闭连接
socketManager.close()
```