### webSocket 封装

由在线客服客户端项目，引发对于长连接的心跳/消息分发/重连等场景的处理

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
      resolve('ws://localhost:3002/socket.io')
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
<button @click="sendMsg">发送消息</button>
<button @click="stopHeadBeat">{{sendHearBeat ? '暂停' : '开启'}}服务端心跳</button>
</ClientOnly>