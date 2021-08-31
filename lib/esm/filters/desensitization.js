import { mobilePhoneNumberReg } from '../regs/mobilePhoneNumber';
import { idCardReg } from '..//regs/idCard';
export function desensitization(value) {
    if (new RegExp(mobilePhoneNumberReg).test(value)) {
        return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
    else if (new RegExp(idCardReg).test(value)) {
        return value.replace(/(\d{6})\d{8}((\d{4})||(\d{3}\w{1))/, '$1********$2');
    }
    else {
        throw new Error('no reg match!!!');
    }
}
//# sourceMappingURL=desensitization.js.map