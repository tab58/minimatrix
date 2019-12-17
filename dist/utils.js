"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(require("./core"));
/**
 * Formats a number for pretty printing.
 * @memberof Utils
 * @param {number} x The number to format.
 * @returns {string} The formatted string.
 */
exports.formatPrintNumber = function (x) {
    var maxLen = 7;
    var rawStr = '' + x;
    if (rawStr.length >= maxLen) {
        var str = rawStr.substring(0, maxLen);
        var eIdx = rawStr.indexOf('e'); // format string with sci-notation
        if (eIdx > -1) {
            var expStr = rawStr.substring(eIdx);
            var expStrLen = expStr.length;
            str = str.substring(0, maxLen - expStrLen) + expStr;
        }
        return str;
    }
    else {
        var diff = maxLen - rawStr.length;
        var idx = core_1.default.ceil(diff / 2);
        var strArray = [];
        for (var i = 0; i < idx; ++i) {
            strArray.push('');
        }
        strArray.push(rawStr);
        for (var i = idx + rawStr.length; i < maxLen; ++i) {
            strArray.push('');
        }
        return strArray.join(' ');
    }
};
//# sourceMappingURL=utils.js.map