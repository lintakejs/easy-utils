"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetch = void 0;
var objToFormData_1 = require("./objToFormData");
var axios_1 = require("axios");
var FetchCancelToken = axios_1.default.CancelToken;
var buildUniqueUrl = function (url, method, params, data) {
    if (params === void 0) { params = {}; }
    if (data === void 0) { data = {}; }
    var paramStr = function (obj) {
        if (toString.call(obj) === '[object Object]') {
            return JSON.stringify(Object.keys(obj).sort().reduce(function (result, key) {
                result[key] = obj[key];
                return result;
            }, {}));
        }
        else if (toString.call(obj) === '[object FormData]') {
            var formdataobj_1 = {};
            obj.forEach(function (value, key) {
                formdataobj_1[key] = value;
            });
            return JSON.stringify(formdataobj_1);
        }
        else {
            return JSON.stringify(obj);
        }
    };
    url += "?" + paramStr(params) + "&" + paramStr(data) + "&" + method;
    return url;
};
var Fetch = (function () {
    function Fetch(config) {
        this.cache = new Map();
        this.config = config;
        this.fetchInstance = axios_1.default.create(config);
        this.initIntercept();
    }
    Fetch.prototype.get = function (url, content, options) {
        var config = this.setRequestArgs('GET', url, content, options);
        return this.createRequest(this.fetchInstance, config);
    };
    Fetch.prototype.post = function (url, content, options) {
        var config = this.setRequestArgs('POST', url, content, options);
        return this.createRequest(this.fetchInstance, config);
    };
    Fetch.prototype.delete = function (url, content, options) {
        var config = this.setRequestArgs('DELETE', url, content, options);
        return this.createRequest(this.fetchInstance, config);
    };
    Fetch.prototype.put = function (url, content, options) {
        var config = this.setRequestArgs('PUT', url, content, options);
        return this.createRequest(this.fetchInstance, config);
    };
    Fetch.prototype.cancelAll = function () {
        this.cache.forEach(function (cacheContent) {
            cacheContent.cancel && cacheContent.cancel();
        });
    };
    Fetch.prototype.setRequestArgs = function (method, url, content, options) {
        var config = {
            method: method.toUpperCase(),
            url: url
        };
        if (options) {
            config.otherOptions = options;
        }
        config.params = (content === null || content === void 0 ? void 0 : content.query) || {};
        if (content === null || content === void 0 ? void 0 : content.formdata) {
            config.data = objToFormData_1.objToFormData(content.formdata);
        }
        else {
            config.data = (content === null || content === void 0 ? void 0 : content.data) || {};
        }
        return config;
    };
    Fetch.prototype.initIntercept = function () {
        var _this = this;
        this.fetchInstance.interceptors.request.use(function (config) {
            if (_this.config.beforeRequest) {
                var conf = _this.config.beforeRequest(config, _this.config);
                return conf || config;
            }
            else {
                return config;
            }
        }, function (error) {
            if (_this.config.requestError) {
                var err = _this.config.requestError(error, function (config) { return _this.createRequest(_this.fetchInstance, config); }, _this.config);
                return err || error;
            }
            else {
                return error;
            }
        });
        this.fetchInstance.interceptors.response.use(function (response) {
            if (_this.config.beforeResponse) {
                var req = _this.config.beforeResponse(response, _this.config, response.config);
                return req || response;
            }
            else {
                return response.data;
            }
        }, function (error) {
            if (_this.config.responseError) {
                var err = _this.config.responseError(error, function (config) { return _this.createRequest(_this.fetchInstance, config); }, _this.config);
                return err || error;
            }
            else {
                return error;
            }
        });
    };
    Fetch.prototype.createRequest = function (axiosPromiseFactory, config) {
        var _this = this;
        var _a, _b, _c;
        var cacheRequest = typeof ((_a = config.otherOptions) === null || _a === void 0 ? void 0 : _a.cacheRequest) === 'boolean' ? config.otherOptions.cacheRequest : this.config.cacheRequest;
        var cacheRequestFn = ((_b = config.otherOptions) === null || _b === void 0 ? void 0 : _b.cacheRequestFn) ? (_c = config.otherOptions) === null || _c === void 0 ? void 0 : _c.cacheRequestFn : this.config.cacheRequestFn;
        var requestSetKey = buildUniqueUrl(config.url, config.method, config.params, config.data);
        var requestCache = this.cache.get(requestSetKey);
        if (cacheRequest && requestCache) {
            if (cacheRequestFn === 'cancel') {
                requestCache.cancel && requestCache.cancel('request cancel');
            }
            else if (cacheRequestFn === 'return') {
                return requestCache;
            }
        }
        var source = FetchCancelToken.source();
        config.cancelToken = source.token;
        config.requestSetKey = requestSetKey;
        requestCache = axiosPromiseFactory(config).then(function (response) {
            _this.cache.delete(requestSetKey);
            return response;
        }).catch(function (err) {
            _this.cache.delete(requestSetKey);
            throw new Error(err);
        });
        requestCache && (requestCache.cancel = source.cancel);
        this.cache.set(requestSetKey, requestCache);
        return requestCache;
    };
    return Fetch;
}());
exports.Fetch = Fetch;
//# sourceMappingURL=fetch.js.map