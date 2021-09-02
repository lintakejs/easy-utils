import { WebSocketSubject } from 'rxjs/webSocket';
import { EventEmitter } from './eventEmitter';
interface WebSocketOptions<T> {
    connectUrlGenerator: () => Promise<string>;
    hdDataGenerator: () => T;
    hdDataValidtor: (res: T) => boolean;
    hearBeatTime?: number;
    timeoutReconnect?: boolean;
}
export declare class WebSocketCore<T extends Record<string, any>> {
    static readonly open: unique symbol;
    static readonly close: unique symbol;
    static readonly send: unique symbol;
    static readonly message: unique symbol;
    static readonly timeout: unique symbol;
    static readonly reconnect: unique symbol;
    eventEmitter: EventEmitter;
    private connectUrlGenerator;
    private hearBeatTime;
    ws: WebSocketSubject<T>;
    private hdDataGenerator;
    private hdDataValidtor;
    private intervaler;
    private timer;
    private timerIntervaler;
    private hdQueue;
    private missBeatNum;
    private maxMissBeatNum;
    private timeoutReconnect;
    constructor(options: WebSocketOptions<T>, eventEmitter: EventEmitter);
    /**
     * @description 建立连接
     * @param string websocket连接地址
     */
    createSocket(): Promise<void>;
    /**
     * @description 发送消息
     * @param msg 消息体
     */
    send(msg: T): void;
    /**
     * @description 关闭socket
     */
    close(): void;
    /**
     * @description 清除标记
     */
    private clear;
    /**
     * @description 清除心跳丢失标记
     */
    private clearMissHearBeatNum;
    /**
     * @description 发送心跳
     */
    private hearBeat;
}
export {};
//# sourceMappingURL=websocket.d.ts.map