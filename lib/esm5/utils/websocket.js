import { __awaiter, __generator } from "tslib";
import { webSocket } from 'rxjs/webSocket';
import { timer } from 'rxjs';
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
                        this.ws = webSocket({
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
        this.intervaler = timer(0, this.hearBeatTime).subscribe(function () {
            var hdData = _this.hdDataGenerator();
            _this.send(hdData);
            _this.hdQueue.push(hdData);
            _this.timer && _this.timer.unsubscribe();
            _this.timer = timer(_this.timerIntervaler).subscribe(function () {
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
export { WebSocketCore };
//# sourceMappingURL=websocket.js.map