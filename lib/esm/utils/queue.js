export class Queue {
    constructor(size) {
        this.list = [];
        this.MaxLength = size;
        this.list = [];
    }
    get size() {
        return this.list.length;
    }
    get quere() {
        return this.list;
    }
    push(data) {
        if (this.size === this.MaxLength) {
            this.pop();
        }
        this.list.unshift(data);
    }
    pop() {
        return this.list.pop();
    }
    clear() {
        this.list = [];
    }
}
//# sourceMappingURL=queue.js.map