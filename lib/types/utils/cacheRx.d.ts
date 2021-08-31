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
        updateFun: () => Promise<T[P]>;
    };
};
export declare class CacheRx<T extends object> {
    private cache;
    constructor(cacheOptions: CacheOptions<T>);
    private setCacheDataWithKey;
    getCacheSubjectWithKey<K extends keyof T>(key: K): BehaviorSubject<T[K]>;
}
//# sourceMappingURL=cacheRx.d.ts.map