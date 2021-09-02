type EventEmitterFn = (...args: unknown[]) => void

export class EventEmitter {
  // 事件中心
  private caches = new Map<string | symbol, Array<EventEmitterFn>>();

  // 订阅事件
  on (eventName: string | symbol, fn: EventEmitterFn) {
    const cacheEventList = this.caches.get(eventName) || []
    cacheEventList.push(fn);
    this.caches.set(eventName, cacheEventList)
  }

  // 订阅事件 - 只执行一次
  once (eventName: string | symbol, fn: EventEmitterFn) {
    const temp = (...args: unknown[]) => {
      this.off(eventName, temp)
      fn(...args)
    }
    this.on(eventName, temp)
  }

  // 发布 => 将订阅的事件进行统一执行
  emit (eventName: string | symbol, ...args: unknown[]) {
    const cacheEventList = this.caches.get(eventName)
    if (cacheEventList) {
      cacheEventList.forEach(fn => fn.call(this, ...args))
    }
  }

  // 取消订阅 => 若fn不传, 直接取消该事件所有订阅信息
  off (eventName: string | symbol, fn?: (data?: unknown) => void) {
    const cacheEventList = this.caches.get(eventName)
    if (cacheEventList) {
      const newCaches = fn ? cacheEventList.filter(e => e !== fn) : [];
      this.caches.set(eventName, newCaches)
    }
  }
}
