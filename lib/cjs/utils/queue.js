"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
var Queue = (function () {
    function Queue(size) {
        this.list = [];
        this.MaxLength = size;
        this.list = [];
    }
    Object.defineProperty(Queue.prototype, "size", {
        get: function () {
            return this.list.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "quere", {
        get: function () {
            return this.list;
        },
        enumerable: false,
        configurable: true
    });
    Queue.prototype.push = function (data) {
        if (this.size === this.MaxLength) {
            this.pop();
        }
        this.list.unshift(data);
    };
    Queue.prototype.pop = function () {
        return this.list.pop();
    };
    Queue.prototype.clear = function () {
        this.list = [];
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map