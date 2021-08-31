export function objToFormData(obj) {
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
//# sourceMappingURL=objToFormData.js.map