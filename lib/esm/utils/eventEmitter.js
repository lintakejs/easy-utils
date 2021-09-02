export class EventEmitter {
    constructor() {
        this.caches = new Map();
    }
    on(eventName, fn) {
        const cacheEventList = this.caches.get(eventName) || [];
        cacheEventList.push(fn);
        this.caches.set(eventName, cacheEventList);
    }
    once(eventName, fn) {
        const temp = (...args) => {
            this.off(eventName, temp);
            fn(...args);
        };
        this.on(eventName, temp);
    }
    emit(eventName, ...args) {
        const cacheEventList = this.caches.get(eventName);
        if (cacheEventList) {
            cacheEventList.forEach(fn => fn.call(this, ...args));
        }
    }
    off(eventName, fn) {
        const cacheEventList = this.caches.get(eventName);
        if (cacheEventList) {
            const newCaches = fn ? cacheEventList.filter(e => e !== fn) : [];
            this.caches.set(eventName, newCaches);
        }
    }
}
//# sourceMappingURL=eventEmitter.js.map