import { BehaviorSubject, from } from 'rxjs';
export class CacheRx {
    constructor(cacheOptions) {
        this.cache = {};
        for (const key in cacheOptions) {
            this.cache[key] = {
                subject: new BehaviorSubject(cacheOptions[key].initValue),
                requsetStatus: false,
                updateFun: cacheOptions[key].remoteValue
            };
        }
    }
    setCacheDataWithKey(key, cacheData) {
        this.cache[key].subject.next(cacheData);
    }
    getCacheSubjectWithKey(key) {
        if (!this.cache[key].requsetStatus) {
            this.cache[key].requsetStatus = true;
            from(this.cache[key].updateFun()).subscribe({
                next: (val) => this.setCacheDataWithKey(key, val)
            });
        }
        return this.cache[key].subject;
    }
}
//# sourceMappingURL=cacheRx.js.map