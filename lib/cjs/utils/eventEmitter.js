"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
var EventEmitter = (function () {
    function EventEmitter() {
        this.caches = new Map();
    }
    EventEmitter.prototype.on = function (eventName, fn) {
        var cacheEventList = this.caches.get(eventName) || [];
        cacheEventList.push(fn);
        this.caches.set(eventName, cacheEventList);
    };
    EventEmitter.prototype.once = function (eventName, fn) {
        var _this = this;
        var temp = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.off(eventName, temp);
            fn.apply(void 0, args);
        };
        this.on(eventName, temp);
    };
    EventEmitter.prototype.emit = function (eventName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var cacheEventList = this.caches.get(eventName);
        if (cacheEventList) {
            cacheEventList.forEach(function (fn) { return fn.call.apply(fn, __spreadArrays([_this], args)); });
        }
    };
    EventEmitter.prototype.off = function (eventName, fn) {
        var cacheEventList = this.caches.get(eventName);
        if (cacheEventList) {
            var newCaches = fn ? cacheEventList.filter(function (e) { return e !== fn; }) : [];
            this.caches.set(eventName, newCaches);
        }
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=eventEmitter.js.map