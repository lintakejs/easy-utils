import { BehaviorSubject, from } from 'rxjs';
var CacheRx = (function () {
    function CacheRx(cacheOptions) {
        this.cache = {};
        for (var key in cacheOptions) {
            this.cache[key] = {
                subject: new BehaviorSubject(cacheOptions[key].initValue),
                requsetStatus: false,
                updateFun: cacheOptions[key].remoteValue
            };
        }
    }
    CacheRx.prototype.setCacheDataWithKey = function (key, cacheData) {
        this.cache[key].subject.next(cacheData);
    };
    CacheRx.prototype.getCacheSubjectWithKey = function (key) {
        var _this = this;
        if (!this.cache[key].requsetStatus) {
            this.cache[key].requsetStatus = true;
            from(this.cache[key].updateFun()).subscribe({
                next: function (val) { return _this.setCacheDataWithKey(key, val); }
            });
        }
        return this.cache[key].subject;
    };
    return CacheRx;
}());
export { CacheRx };
//# sourceMappingURL=cacheRx.js.map