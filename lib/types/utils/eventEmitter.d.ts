declare type EventEmitterFn = (...args: unknown[]) => void;
export declare class EventEmitter {
    private caches;
    on(eventName: string | symbol, fn: EventEmitterFn): void;
    once(eventName: string | symbol, fn: EventEmitterFn): void;
    emit(eventName: string | symbol, ...args: unknown[]): void;
    off(eventName: string | symbol, fn?: (data?: unknown) => void): void;
}
export {};
//# sourceMappingURL=eventEmitter.d.ts.map