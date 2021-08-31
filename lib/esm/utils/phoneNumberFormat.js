function phoneNumberFormatMethods(phoneNumber, sliceLength, nextSliceLength) {
    return phoneNumber.slice(0, sliceLength) + (phoneNumber.slice(sliceLength) === '' ? '' : ' ' + phoneNumberFormatMethods(phoneNumber.slice(sliceLength), nextSliceLength, nextSliceLength));
}
export function phoneNumberFormat(phoneNumber) {
    phoneNumber = phoneNumber.replace(/\s/g, '');
    if (phoneNumber.length <= 3) {
        return phoneNumber;
    }
    return phoneNumberFormatMethods(phoneNumber, 3, 4);
}
//# sourceMappingURL=phoneNumberFormat.js.map