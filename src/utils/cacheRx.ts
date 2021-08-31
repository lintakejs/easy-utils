import { BehaviorSubject, from } from 'rxjs';

export type CacheOptions<T> = {
  [P in keyof T]: {
    initValue: T[P];
    remoteValue: () => Promise<T[P]>;
  };
};

export type CacheObj<T> = {
  [P in keyof T]: {
    subject: BehaviorSubject<T[P]>;
    requsetStatus: boolean;
    updateFun: (...args: unknown[]) => Promise<T[P]>;
  };
};

export class CacheRx<T extends object> {
  private cache: CacheObj<T> = {} as CacheObj<T>;

  constructor(cacheOptions: CacheOptions<T>) {
    for (const key in cacheOptions) {
      const cacheKeyWithKeySubject = new BehaviorSubject(cacheOptions[key].initValue)
      this.cache[key] = {
        subject: cacheKeyWithKeySubject,
        requsetStatus: false,
        updateFun: cacheOptions[key].remoteValue
      };
    }
  }

  private setCacheDataWithKey<K extends keyof T>(key: K, cacheData: T[K]) {
    this.cache[key].subject.next(cacheData);
  }

  getCacheSubjectWithKey<K extends keyof T>(key: K, ...args: unknown[]) {
    if (!this.cache[key].requsetStatus) {
      this.cache[key].requsetStatus = true;
      this.updateCacheWithKey(key, args)
    }
    return this.cache[key].subject;
  }

  updateCacheWithKey<K extends keyof T>(key: K, ...args: unknown[]) {
    if (this.cache[key]) {
      from(this.cache[key].updateFun(...args)).subscribe({
        next: (val: T[K]) => this.setCacheDataWithKey(key, val)
      });
    }
  }
}
