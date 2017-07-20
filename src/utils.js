'use strict';

const Utils = {
  formatPrintNumber: function () {

  },
  printMatrix2: function (m) {
    const te = this.elements;
    const t11 = te[ 0 ];
    const t12 = te[ 2 ];
    const t21 = te[ 1 ];
    const t22 = te[ 3 ];

    const matrixString = `
    +-                -+
    | ${t11} ${t12} |
    | ${t21} ${t22} |
    +-                -+`;
    return matrixString;
  }
};

module.exports = Utils;
