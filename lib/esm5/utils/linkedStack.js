var Node = (function () {
    function Node(nodeData) {
        this.nodeData = nodeData;
        this.next = null;
    }
    Object.defineProperty(Node.prototype, "next", {
        get: function () {
            return this.next;
        },
        set: function (node) {
            this.next = node;
        },
        enumerable: false,
        configurable: true
    });
    return Node;
}());
var LinkedStack = (function () {
    function LinkedStack() {
        this.length = 0;
    }
    Object.defineProperty(LinkedStack.prototype, "size", {
        get: function () {
            return this.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LinkedStack.prototype, "top", {
        get: function () {
            return this.topNode;
        },
        enumerable: false,
        configurable: true
    });
    LinkedStack.prototype.push = function (nodeData) {
        var node = new Node(nodeData);
        if (this.topNode) {
            node.next = this.topNode;
        }
        this.topNode = node;
        this.length = this.length + 1;
    };
    LinkedStack.prototype.pop = function () {
        var currentNode = this.topNode;
        if (currentNode) {
            this.topNode = currentNode;
            currentNode.next = null;
            this.length = this.length - 1;
            return currentNode;
        }
        else {
            return undefined;
        }
    };
    LinkedStack.prototype.clear = function () {
        this.length = 0;
        this.topNode = undefined;
    };
    return LinkedStack;
}());
export { LinkedStack };
//# sourceMappingURL=linkedStack.js.map