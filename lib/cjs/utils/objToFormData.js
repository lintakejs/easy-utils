"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objToFormData = void 0;
function objToFormData(obj) {
    var formData = new FormData();
    Object.keys(obj).forEach(function (key) {
        if (obj[key] instanceof Array) {
            obj[key].forEach(function (item) {
                formData.append(key, item);
            });
            return;
        }
        formData.append(key, obj[key]);
    });
    return formData;
}
exports.objToFormData = objToFormData;
//# sourceMappingURL=objToFormData.js.map