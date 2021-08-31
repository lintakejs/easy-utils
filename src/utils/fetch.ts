import { objToFormData } from './objToFormData'
import axios, { Canceler, Method, AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosPromise, AxiosError } from 'axios'

type CacheRequestFn = 'cancel' | 'return'
interface ApiFetchConfig extends AxiosRequestConfig {
  beforeRequest?: (nowConfig: ApiFetchConfig, initConfig: ApiFetchConfig) => any;
  requestError?: (err: AxiosError, requestFn: (config: AxiosRequestConfig) => AxiosPromise<any>, initConfig: ApiFetchConfig) => any;
  beforeResponse?: (responseData: AxiosResponse, nowConfig: ApiFetchConfig, initConfig: ApiFetchConfig) => any;
  responseError?: (err: AxiosError, requestFn: (config: AxiosRequestConfig) => AxiosPromise<any>, initConfig: ApiFetchConfig) => any;
  cacheRequest?: boolean;
  cacheRequestFn?: CacheRequestFn;
}

interface ApiFetchSetConfig extends AxiosRequestConfig {
  requestSetKey?: string;
  otherOptions?: Record<string, any>;
}
interface RequestContent {
  data?: any;
  query?: any;
  formdata?: any;
}

export interface RequestCacheContent<T> extends AxiosPromise<T> {
  cancel?: Canceler;
}

const FetchCancelToken = axios.CancelToken

const buildUniqueUrl = (url: string, method: Method, params: Record<string | number, any> = {}, data: Record<string | number, any> = {}): string => {
  const paramStr = (obj: Record<string | number, any>) => {
    if (toString.call(obj) === '[object Object]') {
      return JSON.stringify(Object.keys(obj).sort().reduce((result: Record<string | number, any>, key) => {
        result[key] = obj[key]
        return result
      }, {}))
    } else if (toString.call(obj) === '[object FormData]') {
      const formdataobj: Record<string | number, any> = {}
      obj.forEach((value: any, key: any) => {
        formdataobj[key] = value
      })
      return JSON.stringify(formdataobj)
    } else {
      return JSON.stringify(obj)
    }
  }
  url += `?${paramStr(params)}&${paramStr(data)}&${method}`
  return url
}
export class Fetch {
  // axios工厂函数的普遍配置
  private config: ApiFetchConfig;
  // 拦截器对象
  private fetchInstance: AxiosInstance;
  // 发出请求缓存但并未返回的promise，以及相对应cancel函数
  private cache: Map<string, RequestCacheContent<any>> = new Map();

  constructor(config: ApiFetchConfig) {
    this.config = config
    this.fetchInstance = axios.create(config)

    this.initIntercept()
  }

  public get<T>(url: string, content?: RequestContent, options?: object): RequestCacheContent<T> {
    const config = this.setRequestArgs('GET', url, content, options)
    return this.createRequest(this.fetchInstance, config)
  }

  public post<T>(url: string, content?: RequestContent, options?: object): RequestCacheContent<T> {
    const config = this.setRequestArgs('POST', url, content, options)
    return this.createRequest(this.fetchInstance, config)
  }

  public delete<T>(url: string, content?: RequestContent, options?: object): RequestCacheContent<T> {
    const config = this.setRequestArgs('DELETE', url, content, options)
    return this.createRequest(this.fetchInstance, config)
  }

  public put<T>(url: string, content?: RequestContent, options?: object): RequestCacheContent<T> {
    const config = this.setRequestArgs('PUT', url, content, options)
    return this.createRequest(this.fetchInstance, config)
  }

  public cancelAll() {
    this.cache.forEach(cacheContent => {
      cacheContent.cancel && cacheContent.cancel()
    })
  }

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
  private setRequestArgs(method: Method, url: string, content?: RequestContent, options?: object): ApiFetchSetConfig {
    const config: ApiFetchSetConfig = {
      method: method.toUpperCase() as Method,
      url
    }

    if (options) {
      config.otherOptions = options
    }

    config.params = content?.query || {}
    if (content?.formdata) {
      config.data = objToFormData(content.formdata)
    } else {
      config.data = content?.data || {}
    }

    return config
  }

  // 初始化请求拦截器
  private initIntercept() {
    // 发出请求时拦截
    this.fetchInstance.interceptors.request.use((config) => {
      if (this.config.beforeRequest) {
        const conf = this.config.beforeRequest(config, this.config)
        return conf || config
      } else {
        return config
      }
    }, (error) => {
      if (this.config.requestError) {
        const err = this.config.requestError(error, (config: AxiosRequestConfig) => this.createRequest(this.fetchInstance, config), this.config)
        return err || error
      } else {
        return error
      }
    })

    // 返回参数时拦截
    this.fetchInstance.interceptors.response.use((response) => {
      if (this.config.beforeResponse) {
        const req = this.config.beforeResponse(response, this.config, response.config)
        return req || response
      } else {
        return response.data
      }
    }, (error) => {
      if (this.config.responseError) {
        const err = this.config.responseError(error, (config: AxiosRequestConfig) => this.createRequest(this.fetchInstance, config), this.config)
        return err || error
      } else {
        return error
      }
    })
  }

  private createRequest<T>(axiosPromiseFactory: (apiConfig: AxiosRequestConfig) => AxiosPromise<T>, config: ApiFetchSetConfig): RequestCacheContent<T> {
    const cacheRequest = typeof config.otherOptions?.cacheRequest === 'boolean' ? config.otherOptions.cacheRequest : this.config.cacheRequest
    const cacheRequestFn: CacheRequestFn | undefined = config.otherOptions?.cacheRequestFn ? config.otherOptions?.cacheRequestFn : this.config.cacheRequestFn
    const requestSetKey = buildUniqueUrl(config.url as string, config.method as Method, config.params, config.data)
    let requestCache = this.cache.get(requestSetKey)

    if (cacheRequest && requestCache) {
      if (cacheRequestFn === 'cancel') {
        requestCache.cancel && requestCache.cancel('request cancel')
      } else if (cacheRequestFn === 'return') {
        return requestCache
      }
    }

    const source = FetchCancelToken.source()
    config.cancelToken = source.token
    config.requestSetKey = requestSetKey
    requestCache = axiosPromiseFactory(config).then(response => {
      this.cache.delete(requestSetKey)
      return response
    }).catch(err => {
      this.cache.delete(requestSetKey)
      throw new Error(err)
    })
    requestCache && (requestCache.cancel = source.cancel)

    this.cache.set(requestSetKey, requestCache)
    return requestCache
  }
}
