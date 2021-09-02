import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { interval, timer, Subscription } from 'rxjs'
import { EventEmitter } from './eventEmitter';

// websocket配置
interface WebSocketOptions<T> {
  // 注册连接
  connectUrlGenerator: () => Promise<string>;
  // 心跳包生成器
  hdDataGenerator: () => T;
  // 服务端心跳包验证器
  hdDataValidtor: (res: T) => boolean;
  // 心跳间隔时间
  hearBeatTime?: number;
  // 心跳包超时重连
  timeoutReconnect?: boolean;
}

export class WebSocketCore<T extends Record<string, any>> {
  // 订阅监听模式的事件key
  static readonly open = Symbol('open')
  static readonly close = Symbol('close')
  static readonly send = Symbol('send')
  static readonly message = Symbol('message')
  static readonly timeout = Symbol('timeout')
  static readonly reconnect = Symbol('reconnect')

  // 发布订阅模式 事件总线
  public eventEmitter!: EventEmitter;
  // 注册连接方法
  private connectUrlGenerator: () => Promise<string>;
  // 心跳间隔时间
  private hearBeatTime: number;
  // ws 实例
  public ws!: WebSocketSubject<T>;
  // 心跳包生成器
  private hdDataGenerator: () => T;
  // 服务端心跳包验证函数
  private hdDataValidtor: (res: T) => boolean;
  // 心跳发出定时器
  private intervaler!: Subscription;
  // 轮询心跳定时器
  private timer!: Subscription;
  // 轮询心跳定时器频率
  private timerIntervaler = 1000;
  // 心跳序列
  private hdQueue = [] as T[];
  // 计数丢失包个数
  private missBeatNum = 0
  // 丢包最大次数
  private maxMissBeatNum = 5
  // 是否心跳包超时重连
  private timeoutReconnect: boolean;

  constructor(options: WebSocketOptions<T>, eventEmitter: EventEmitter) {
    this.connectUrlGenerator = options.connectUrlGenerator
    this.hearBeatTime = options.hearBeatTime || 3000
    this.hdDataGenerator = options.hdDataGenerator
    this.hdDataValidtor = options.hdDataValidtor
    this.timeoutReconnect = options.timeoutReconnect || true
    this.eventEmitter = eventEmitter
  }

  /**
   * @description 建立连接
   * @param string websocket连接地址
   */
  public async createSocket() {
    const url = await this.connectUrlGenerator()
    if (!url) throw new Error('websocket地址异常！')
    // 防止多实例连接
    if (this.ws && !this.ws.closed) this.ws.complete()
    this.ws = webSocket({
      url,
      openObserver: {
        next: (e: Event) => {
          // 连接成功后，开始发送心跳
          this.hearBeat()
          this.eventEmitter.emit(WebSocketCore.open, e)
        }
      },
      closeObserver: {
        next: () => {
          if (!this.ws.closed) {
            this.clear()
            this.eventEmitter.emit(WebSocketCore.close)
          }
        }
      }
    })

    this.ws.subscribe((res: T) => {
      if (this.hdDataValidtor(res)) {
        this.clearMissHearBeatNum()
      } else {
        this.eventEmitter.emit(WebSocketCore.message, res)
      }
    })
  }

  /**
   * @description 发送消息
   * @param msg 消息体
   */
  public send(msg: T) {
    this.ws && this.ws.next(msg)
  }

  /**
   * @description 关闭socket
   */
  public close() {
    this.ws.complete()
  }

  /**
   * @description 清除标记
   */
  private clear() {
    this.clearMissHearBeatNum()
    this.intervaler && this.intervaler.unsubscribe()
    this.timer && this.timer.unsubscribe()
  }

  /**
   * @description 清除心跳丢失标记
   */
  private clearMissHearBeatNum() {
    this.hdQueue = []
    this.missBeatNum = 0
  }

  /**
   * @description 发送心跳
   */
  private hearBeat() {
    this.intervaler = interval(this.hearBeatTime).subscribe(() => {
      const hdData = this.hdDataGenerator()
      this.send(hdData)
      this.hdQueue.push(hdData)
      this.timer && this.timer.unsubscribe()
      this.timer = timer(this.timerIntervaler).subscribe(() => {
        if (this.hdQueue.includes(hdData)) {
          this.missBeatNum++
          // 超时情况处理
          if (this.missBeatNum >= this.maxMissBeatNum) {
            // 需要超时重连，否则抛出事件让事件总线处理
            if (this.timeoutReconnect) {
              this.eventEmitter.emit(WebSocketCore.reconnect)
              this.createSocket()
            } else {
              this.eventEmitter.emit(WebSocketCore.timeout)
            }
          }
        }
      })
    })
  }
}
