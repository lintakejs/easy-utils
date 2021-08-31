"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desensitization = void 0;
var mobilePhoneNumber_1 = require("../regs/mobilePhoneNumber");
var idCard_1 = require("..//regs/idCard");
function desensitization(value) {
    if (new RegExp(mobilePhoneNumber_1.mobilePhoneNumberReg).test(value)) {
        return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
    else if (new RegExp(idCard_1.idCardReg).test(value)) {
        return value.replace(/(\d{6})\d{8}((\d{4})||(\d{3}\w{1))/, '$1********$2');
    }
    else {
        throw new Error('no reg match!!!');
    }
}
exports.desensitization = desensitization;
//# sourceMappingURL=desensitization.js.map