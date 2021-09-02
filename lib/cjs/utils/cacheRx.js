"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheRx = void 0;
var rxjs_1 = require("rxjs");
var CacheRx = (function () {
    function CacheRx(cacheOptions) {
        this.cache = {};
        for (var key in cacheOptions) {
            var cacheKeyWithKeySubject = new rxjs_1.BehaviorSubject(cacheOptions[key].initValue);
            this.cache[key] = {
                subject: cacheKeyWithKeySubject,
                requsetStatus: false,
                updateFun: cacheOptions[key].remoteValue
            };
        }
    }
    CacheRx.prototype.setCacheDataWithKey = function (key, cacheData) {
        this.cache[key].subject.next(cacheData);
    };
    CacheRx.prototype.getCacheSubjectWithKey = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.cache[key].requsetStatus) {
            this.cache[key].requsetStatus = true;
            this.updateCacheWithKey(key, args);
        }
        return this.cache[key].subject;
    };
    CacheRx.prototype.updateCacheWithKey = function (key) {
        var _a;
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.cache[key]) {
            rxjs_1.from((_a = this.cache[key]).updateFun.apply(_a, args)).subscribe({
                next: function (val) { return _this.setCacheDataWithKey(key, val); }
            });
        }
    };
    return CacheRx;
}());
exports.CacheRx = CacheRx;
//# sourceMappingURL=cacheRx.js.map