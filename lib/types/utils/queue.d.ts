export declare class Queue {
    private list;
    private MaxLength;
    constructor(size: number);
    get size(): number;
    get quere(): Array<any>;
    /**
     * 队列添加数据
     * @param data 要添加的数据
     */
    push(data: any): void;
    /**
     * @description 队列取出数据
     */
    pop(): any;
    /**
     * @description 清除队列
     */
    clear(): void;
}
//# sourceMappingURL=queue.d.ts.map