declare class Node<T> {
    private nodeData;
    constructor(nodeData: T);
    /**
     * 设置指针指向的节点
     * @param node 链式栈下一份连接节点
     */
    set next(node: Node<T> | null);
    /**
     * @description 获取指针指向的节点
     */
    get next(): Node<T> | null;
}
export declare class LinkedStack {
    private length;
    private topNode;
    get size(): number;
    get top(): Node<any> | undefined;
    /**
     * 入栈
     * @param nodeData 节点数据
     */
    push(nodeData: any): void;
    pop(): Node<any> | undefined;
    clear(): void;
}
export {};
//# sourceMappingURL=linkedStack.d.ts.map