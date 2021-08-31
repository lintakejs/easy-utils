import { Canceler, AxiosRequestConfig, AxiosResponse, AxiosPromise, AxiosError } from 'axios';
declare type CacheRequestFn = 'cancel' | 'return';
interface ApiFetchConfig extends AxiosRequestConfig {
    beforeRequest?: (nowConfig: ApiFetchConfig, initConfig: ApiFetchConfig) => any;
    requestError?: (err: AxiosError, requestFn: (config: AxiosRequestConfig) => AxiosPromise<any>, initConfig: ApiFetchConfig) => any;
    beforeResponse?: (responseData: AxiosResponse, nowConfig: ApiFetchConfig, initConfig: ApiFetchConfig) => any;
    responseError?: (err: AxiosError, requestFn: (config: AxiosRequestConfig) => AxiosPromise<any>, initConfig: ApiFetchConfig) => any;
    cacheRequest?: boolean;
    cacheRequestFn?: CacheRequestFn;
}
interface RequestContent {
    data?: any;
    query?: any;
    formdata?: any;
}
export interface RequestCacheContent<T> extends AxiosPromise<T> {
    cancel?: Canceler;
}
export declare class Fetch {
    private config;
    private fetchInstance;
    private cache;
    constructor(config: ApiFetchConfig);
    get<T>(url: string, content?: RequestContent, options?: object): RequestCacheContent<T>;
    post<T>(url: string, content?: RequestContent, options?: object): RequestCacheContent<T>;
    delete<T>(url: string, content?: RequestContent, options?: object): RequestCacheContent<T>;
    put<T>(url: string, content?: RequestContent, options?: object): RequestCacheContent<T>;
    cancelAll(): void;
    /**
     * 构建参数
     *
     * //请求类型
     * @param mehods
     * //请求路径
     * @param url
     * //请求数据
     * @param data
     * //请求选项
     * @param options
     */
    private setRequestArgs;
    private initIntercept;
    private createRequest;
}
export {};
//# sourceMappingURL=fetch.d.ts.map