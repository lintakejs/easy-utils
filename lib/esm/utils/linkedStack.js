class Node {
    constructor(nodeData) {
        this.nodeData = nodeData;
        this.next = null;
    }
    set next(node) {
        this.next = node;
    }
    get next() {
        return this.next;
    }
}
export class LinkedStack {
    constructor() {
        this.length = 0;
    }
    get size() {
        return this.length;
    }
    get top() {
        return this.topNode;
    }
    push(nodeData) {
        const node = new Node(nodeData);
        if (this.topNode) {
            node.next = this.topNode;
        }
        this.topNode = node;
        this.length = this.length + 1;
    }
    pop() {
        const currentNode = this.topNode;
        if (currentNode) {
            this.topNode = currentNode;
            currentNode.next = null;
            this.length = this.length - 1;
            return currentNode;
        }
        else {
            return undefined;
        }
    }
    clear() {
        this.length = 0;
        this.topNode = undefined;
    }
}
//# sourceMappingURL=linkedStack.js.map