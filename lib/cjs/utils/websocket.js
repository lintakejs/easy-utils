"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketCore = void 0;
var webSocket_1 = require("rxjs/webSocket");
var rxjs_1 = require("rxjs");
var WebSocketCore = (function () {
    function WebSocketCore(options, eventEmitter) {
        this.timerIntervaler = 1000;
        this.hdQueue = [];
        this.missBeatNum = 0;
        this.maxMissBeatNum = 5;
        this.connectUrlGenerator = options.connectUrlGenerator;
        this.hearBeatTime = options.hearBeatTime || 3000;
        this.hdDataGenerator = options.hdDataGenerator;
        this.hdDataValidtor = options.hdDataValidtor;
        this.timeoutReconnect = options.timeoutReconnect || true;
        this.eventEmitter = eventEmitter;
    }
    WebSocketCore.prototype.createSocket = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.clear();
                        return [4, this.connectUrlGenerator()];
                    case 1:
                        url = _a.sent();
                        if (!url)
                            throw new Error('websocket地址异常！');
                        if (this.ws && !this.ws.closed)
                            this.ws.complete();
                        this.ws = webSocket_1.webSocket({
                            url: url,
                            openObserver: {
                                next: function (e) {
                                    _this.hearBeat();
                                    _this.eventEmitter.emit(WebSocketCore.open, e);
                                }
                            },
                            closeObserver: {
                                next: function () {
                                    if (!_this.ws.closed) {
                                        _this.clear();
                                        _this.eventEmitter.emit(WebSocketCore.close);
                                    }
                                }
                            }
                        });
                        this.ws.subscribe(function (res) {
                            if (_this.hdDataValidtor(res)) {
                                _this.clearMissHearBeatNum();
                            }
                            else {
                                _this.eventEmitter.emit(WebSocketCore.message, res);
                            }
                        });
                        return [2];
                }
            });
        });
    };
    WebSocketCore.prototype.send = function (msg) {
        this.ws && this.ws.next(msg);
    };
    WebSocketCore.prototype.close = function () {
        this.ws.complete();
    };
    WebSocketCore.prototype.clear = function () {
        this.clearMissHearBeatNum();
        this.intervaler && this.intervaler.unsubscribe();
        this.timer && this.timer.unsubscribe();
    };
    WebSocketCore.prototype.clearMissHearBeatNum = function () {
        this.hdQueue = [];
        this.missBeatNum = 0;
    };
    WebSocketCore.prototype.hearBeat = function () {
        var _this = this;
        this.intervaler = rxjs_1.timer(0, this.hearBeatTime).subscribe(function () {
            var hdData = _this.hdDataGenerator();
            _this.send(hdData);
            _this.hdQueue.push(hdData);
            _this.timer && _this.timer.unsubscribe();
            _this.timer = rxjs_1.timer(_this.timerIntervaler).subscribe(function () {
                if (_this.hdQueue.includes(hdData)) {
                    _this.missBeatNum++;
                    if (_this.missBeatNum >= _this.maxMissBeatNum) {
                        if (_this.timeoutReconnect) {
                            _this.eventEmitter.emit(WebSocketCore.reconnect);
                            _this.createSocket();
                        }
                        else {
                            _this.eventEmitter.emit(WebSocketCore.timeout);
                        }
                    }
                }
            });
        });
    };
    WebSocketCore.open = Symbol('open');
    WebSocketCore.close = Symbol('close');
    WebSocketCore.send = Symbol('send');
    WebSocketCore.message = Symbol('message');
    WebSocketCore.timeout = Symbol('timeout');
    WebSocketCore.reconnect = Symbol('reconnect');
    return WebSocketCore;
}());
exports.WebSocketCore = WebSocketCore;
//# sourceMappingURL=websocket.js.map