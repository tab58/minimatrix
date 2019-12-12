"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("./core"));
/**
 * Formats a number for pretty printing.
 * @memberof Utils
 * @param {number} x The number to format.
 * @returns {string} The formatted string.
 */
function formatPrintNumber(x) {
    const maxLen = 7;
    let rawStr = '' + x;
    if (rawStr.length >= maxLen) {
        let str = rawStr.substring(0, maxLen);
        const eIdx = rawStr.indexOf('e'); // format string with sci-notation
        if (eIdx > -1) {
            const expStr = rawStr.substring(eIdx);
            const expStrLen = expStr.length;
            str = str.substring(0, maxLen - expStrLen) + expStr;
        }
        return str;
    }
    else {
        const diff = maxLen - rawStr.length;
        const idx = core_1.default.ceil(diff / 2);
        const strArray = [];
        for (let i = 0; i < idx; ++i) {
            strArray.push('');
        }
        strArray.push(rawStr);
        for (let i = idx + rawStr.length; i < maxLen; ++i) {
            strArray.push('');
        }
        return strArray.join(' ');
    }
}
exports.formatPrintNumber = formatPrintNumber;
//# sourceMappingURL=utils.js.map