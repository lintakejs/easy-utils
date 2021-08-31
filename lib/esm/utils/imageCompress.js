import { urlReg, isBase64Reg } from '../regs';
function canvasDataBase64(imgSrc, quality = 0.7, callback) {
    if (quality < 0 || quality >= 1) {
        callback(new Error('压缩质量必须在0 - 1之间！'));
        return;
    }
    const img = new Image();
    img.src = imgSrc;
    img.onload = function () {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const atbw = document.createAttribute('width');
        const atbh = document.createAttribute('height');
        atbw.nodeValue = imgWidth + 'px';
        atbw.nodeValue = imgHeight + 'px';
        canvas.setAttributeNode(atbw);
        canvas.setAttributeNode(atbh);
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        const fileBase64 = canvas.toDataURL('image/jepg', quality);
        callback(fileBase64);
    };
}
function canvasDataFile(fileBlob, quality = 0.7, callback) {
    if (quality < 0 || quality >= 1) {
        callback(new Error('压缩质量必须在0 - 1之间！'));
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = ({ target }) => {
        if (target) {
            const re = target.result;
            canvasDataBase64(re, quality, callback);
        }
    };
}
export function imageCompress(image, quality) {
    return new Promise((resolve, reject) => {
        if (typeof (image) === 'string') {
            if (new RegExp(urlReg).test(image)) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', image);
                xhr.responseType = 'blob';
                xhr.onload = () => {
                    const blobFile = xhr.response;
                    canvasDataFile(blobFile, quality, (res) => {
                        if (typeof (res) === 'string') {
                            resolve(res);
                        }
                        else {
                            reject(res);
                        }
                    });
                };
                xhr.onerror = (err) => {
                    reject(err);
                };
                xhr.send();
            }
            else if (new RegExp(isBase64Reg).test(image)) {
                canvasDataBase64(image, quality, (res) => {
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
            canvasDataFile(image, quality, (res) => {
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
//# sourceMappingURL=imageCompress.js.map