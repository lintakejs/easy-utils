import { BehaviorSubject, from } from 'rxjs';
export class CacheRx {
    constructor(cacheOptions) {
        this.cache = {};
        for (const key in cacheOptions) {
            const cacheKeyWithKeySubject = new BehaviorSubject(cacheOptions[key].initValue);
            this.cache[key] = {
                subject: cacheKeyWithKeySubject,
                requsetStatus: false,
                updateFun: cacheOptions[key].remoteValue
            };
        }
    }
    setCacheDataWithKey(key, cacheData) {
        this.cache[key].subject.next(cacheData);
    }
    getCacheSubjectWithKey(key, ...args) {
        if (!this.cache[key].requsetStatus) {
            this.cache[key].requsetStatus = true;
            this.updateCacheWithKey(key, args);
        }
        return this.cache[key].subject;
    }
    updateCacheWithKey(key, ...args) {
        if (this.cache[key]) {
            from(this.cache[key].updateFun(...args)).subscribe({
                next: (val) => this.setCacheDataWithKey(key, val)
            });
        }
    }
}
//# sourceMappingURL=cacheRx.js.map