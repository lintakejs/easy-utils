"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageCompress = void 0;
var regs_1 = require("../regs");
function canvasDataBase64(imgSrc, quality, callback) {
    if (quality === void 0) { quality = 0.7; }
    if (quality < 0 || quality >= 1) {
        callback(new Error('压缩质量必须在0 - 1之间！'));
        return;
    }
    var img = new Image();
    img.src = imgSrc;
    img.onload = function () {
        var imgWidth = img.width;
        var imgHeight = img.height;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var atbw = document.createAttribute('width');
        var atbh = document.createAttribute('height');
        atbw.nodeValue = imgWidth + 'px';
        atbw.nodeValue = imgHeight + 'px';
        canvas.setAttributeNode(atbw);
        canvas.setAttributeNode(atbh);
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        var fileBase64 = canvas.toDataURL('image/jepg', quality);
        callback(fileBase64);
    };
}
function canvasDataFile(fileBlob, quality, callback) {
    if (quality === void 0) { quality = 0.7; }
    if (quality < 0 || quality >= 1) {
        callback(new Error('压缩质量必须在0 - 1之间！'));
        return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = function (_a) {
        var target = _a.target;
        if (target) {
            var re = target.result;
            canvasDataBase64(re, quality, callback);
        }
    };
}
function imageCompress(image, quality) {
    return new Promise(function (resolve, reject) {
        if (typeof (image) === 'string') {
            if (new RegExp(regs_1.urlReg).test(image)) {
                var xhr_1 = new XMLHttpRequest();
                xhr_1.open('GET', image);
                xhr_1.responseType = 'blob';
                xhr_1.onload = function () {
                    var blobFile = xhr_1.response;
                    canvasDataFile(blobFile, quality, function (res) {
                        if (typeof (res) === 'string') {
                            resolve(res);
                        }
                        else {
                            reject(res);
                        }
                    });
                };
                xhr_1.onerror = function (err) {
                    reject(err);
                };
                xhr_1.send();
            }
            else if (new RegExp(regs_1.isBase64Reg).test(image)) {
                canvasDataBase64(image, quality, function (res) {
                    if (typeof (res) === 'string') {
                        resolve(res);
                    }
                    else {
                        reject(res);
                    }
                });
            }
        }
        else {
            canvasDataFile(image, quality, function (res) {
                if (typeof (res) === 'string') {
                    resolve(res);
                }
                else {
                    reject(res);
                }
            });
        }
    });
}
exports.imageCompress = imageCompress;
//# sourceMappingURL=imageCompress.js.map