import { __awaiter } from "tslib";
import { webSocket } from 'rxjs/webSocket';
import { timer } from 'rxjs';
export class WebSocketCore {
    constructor(options, eventEmitter) {
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
        this.socketConfig = options.socketConfig;
    }
    createSocket() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clear();
            const url = yield this.connectUrlGenerator();
            if (!url)
                throw new Error('websocket地址异常！');
            if (this.ws && !this.ws.closed)
                this.ws.complete();
            this.ws = webSocket(Object.assign(Object.assign({}, this.socketConfig), { url, openObserver: {
                    next: (e) => {
                        this.hearBeat();
                        this.eventEmitter.emit(WebSocketCore.open, e);
                    }
                }, closeObserver: {
                    next: () => {
                        if (!this.ws.closed) {
                            this.clear();
                            this.eventEmitter.emit(WebSocketCore.close);
                        }
                    }
                } }));
            this.ws.subscribe((res) => {
                if (this.hdDataValidtor(res)) {
                    this.clearMissHearBeatNum();
                }
                else {
                    this.eventEmitter.emit(WebSocketCore.message, res);
                }
            });
        });
    }
    send(msg) {
        this.eventEmitter.emit('send', msg);
        this.ws && this.ws.next(msg);
    }
    close() {
        this.ws && this.ws.complete();
    }
    clear() {
        this.clearMissHearBeatNum();
        this.intervaler && this.intervaler.unsubscribe();
        this.timer && this.timer.unsubscribe();
    }
    clearMissHearBeatNum() {
        this.hdQueue = [];
        this.missBeatNum = 0;
    }
    hearBeat() {
        this.intervaler = timer(0, this.hearBeatTime).subscribe(() => {
            const hdData = this.hdDataGenerator();
            this.ws.next(hdData);
            this.hdQueue.push(hdData);
            this.timer && this.timer.unsubscribe();
            this.timer = timer(this.timerIntervaler).subscribe(() => {
                if (this.hdQueue.includes(hdData)) {
                    this.missBeatNum++;
                    if (this.missBeatNum >= this.maxMissBeatNum) {
                        if (this.timeoutReconnect) {
                            this.eventEmitter.emit(WebSocketCore.reconnect);
                            this.createSocket();
                        }
                        else {
                            this.eventEmitter.emit(WebSocketCore.timeout);
                        }
                    }
                }
            });
        });
    }
}
WebSocketCore.open = Symbol('open');
WebSocketCore.close = Symbol('close');
WebSocketCore.send = Symbol('send');
WebSocketCore.message = Symbol('message');
WebSocketCore.timeout = Symbol('timeout');
WebSocketCore.reconnect = Symbol('reconnect');
//# sourceMappingURL=websocket.js.map