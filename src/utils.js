'use strict';

const Utils = {
  formatPrintNumber: function (x) {
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
    } else {
      const diff = maxLen - rawStr.length;
      const idx = Math.ceil(diff / 2);
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
  },
  printMatrix2: function (m) {
    const tStr = m.elements.map(Utils.formatPrintNumber);
    const matrixString = `
    +-                -+
    | ${tStr[0]}  ${tStr[2]} |
    | ${tStr[1]}  ${tStr[3]} |
    +-                -+`;
    return matrixString;
  },
  printMatrix3: function (m) {
    const tStr = m.elements.map(Utils.formatPrintNumber);
    const matrixString = `
    +-                         -+
    | ${tStr[0]}  ${tStr[3]}  ${tStr[6]} |
    | ${tStr[1]}  ${tStr[4]}  ${tStr[7]} |
    | ${tStr[2]}  ${tStr[5]}  ${tStr[8]} |
    +-                         -+`;
    return matrixString;
  }
};

module.exports = Utils;
