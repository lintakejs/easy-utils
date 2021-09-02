import { BehaviorSubject } from 'rxjs';
export declare type CacheOptions<T> = {
    [P in keyof T]: {
        initValue: T[P];
        remoteValue: () => Promise<T[P]>;
    };
};
export declare type CacheObj<T> = {
    [P in keyof T]: {
        subject: BehaviorSubject<T[P]>;
        requsetStatus: boolean;
        updateFun: (...args: unknown[]) => Promise<T[P]>;
    };
};
export declare class CacheRx<T extends object> {
    private cache;
    constructor(cacheOptions: CacheOptions<T>);
    private setCacheDataWithKey;
    getCacheSubjectWithKey<K extends keyof T>(key: K, ...args: unknown[]): BehaviorSubject<T[K]>;
    updateCacheWithKey<K extends keyof T>(key: K, ...args: unknown[]): void;
}
//# sourceMappingURL=cacheRx.d.ts.map