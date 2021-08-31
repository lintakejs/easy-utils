import { objToFormData } from './objToFormData';
import axios from 'axios';
const FetchCancelToken = axios.CancelToken;
const buildUniqueUrl = (url, method, params = {}, data = {}) => {
    const paramStr = (obj) => {
        if (toString.call(obj) === '[object Object]') {
            return JSON.stringify(Object.keys(obj).sort().reduce((result, key) => {
                result[key] = obj[key];
                return result;
            }, {}));
        }
        else if (toString.call(obj) === '[object FormData]') {
            const formdataobj = {};
            obj.forEach((value, key) => {
                formdataobj[key] = value;
            });
            return JSON.stringify(formdataobj);
        }
        else {
            return JSON.stringify(obj);
        }
    };
    url += `?${paramStr(params)}&${paramStr(data)}&${method}`;
    return url;
};
export class Fetch {
    constructor(config) {
        this.cache = new Map();
        this.config = config;
        this.fetchInstance = axios.create(config);
        this.initIntercept();
    }
    get(url, content, options) {
        const config = this.setRequestArgs('GET', url, content, options);
        return this.createRequest(this.fetchInstance, config);
    }
    post(url, content, options) {
        const config = this.setRequestArgs('POST', url, content, options);
        return this.createRequest(this.fetchInstance, config);
    }
    delete(url, content, options) {
        const config = this.setRequestArgs('DELETE', url, content, options);
        return this.createRequest(this.fetchInstance, config);
    }
    put(url, content, options) {
        const config = this.setRequestArgs('PUT', url, content, options);
        return this.createRequest(this.fetchInstance, config);
    }
    cancelAll() {
        this.cache.forEach(cacheContent => {
            cacheContent.cancel && cacheContent.cancel();
        });
    }
    setRequestArgs(method, url, content, options) {
        const config = {
            method: method.toUpperCase(),
            url
        };
        if (options) {
            config.otherOptions = options;
        }
        config.params = (content === null || content === void 0 ? void 0 : content.query) || {};
        if (content === null || content === void 0 ? void 0 : content.formdata) {
            config.data = objToFormData(content.formdata);
        }
        else {
            config.data = (content === null || content === void 0 ? void 0 : content.data) || {};
        }
        return config;
    }
    initIntercept() {
        this.fetchInstance.interceptors.request.use((config) => {
            if (this.config.beforeRequest) {
                const conf = this.config.beforeRequest(config, this.config);
                return conf || config;
            }
            else {
                return config;
            }
        }, (error) => {
            if (this.config.requestError) {
                const err = this.config.requestError(error, (config) => this.createRequest(this.fetchInstance, config), this.config);
                return err || error;
            }
            else {
                return error;
            }
        });
        this.fetchInstance.interceptors.response.use((response) => {
            if (this.config.beforeResponse) {
                const req = this.config.beforeResponse(response, this.config, response.config);
                return req || response;
            }
            else {
                return response.data;
            }
        }, (error) => {
            if (this.config.responseError) {
                const err = this.config.responseError(error, (config) => this.createRequest(this.fetchInstance, config), this.config);
                return err || error;
            }
            else {
                return error;
            }
        });
    }
    createRequest(axiosPromiseFactory, config) {
        var _a, _b, _c;
        const cacheRequest = typeof ((_a = config.otherOptions) === null || _a === void 0 ? void 0 : _a.cacheRequest) === 'boolean' ? config.otherOptions.cacheRequest : this.config.cacheRequest;
        const cacheRequestFn = ((_b = config.otherOptions) === null || _b === void 0 ? void 0 : _b.cacheRequestFn) ? (_c = config.otherOptions) === null || _c === void 0 ? void 0 : _c.cacheRequestFn : this.config.cacheRequestFn;
        const requestSetKey = buildUniqueUrl(config.url, config.method, config.params, config.data);
        let requestCache = this.cache.get(requestSetKey);
        if (cacheRequest && requestCache) {
            if (cacheRequestFn === 'cancel') {
                requestCache.cancel && requestCache.cancel('request cancel');
            }
            else if (cacheRequestFn === 'return') {
                return requestCache;
            }
        }
        const source = FetchCancelToken.source();
        config.cancelToken = source.token;
        config.requestSetKey = requestSetKey;
        requestCache = axiosPromiseFactory(config).then(response => {
            this.cache.delete(requestSetKey);
            return response;
        }).catch(err => {
            this.cache.delete(requestSetKey);
            throw new Error(err);
        });
        requestCache && (requestCache.cancel = source.cancel);
        this.cache.set(requestSetKey, requestCache);
        return requestCache;
    }
}
//# sourceMappingURL=fetch.js.map