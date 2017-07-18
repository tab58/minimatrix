'use strict';

/*
 *   Base code from THREE.js authors below.
 *   Additions by Tim Bright
 */

const _Math = require('./mathFunctions.js');
const Polynomial = require('./polynomial.js');
const Vector3 = require('./vector3.js');

const Utils = require('./mathUtils.js');
const EPSILON = Utils.DEFAULT_TOLERANCE;

/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */

// function assumes row and column numbering from 0-2.
const helpers = {
  prettyPrint: function () {
    const formatNumber = function formatNumber (x) {
      const maxLen = 6;
      let rawStr = '' + x;
      let str = rawStr.substring(0, maxLen);
      //let str = Utils.isZero(x, Utils.DEFAULT_TOLERANCE) ? '  0   ' : rawStr.substring(0, maxLen);
      let padding1 = '';
      let padding2 = '';
      const initStrLen = str.length;
      for (let i = initStrLen; i <= maxLen; i += 2) {
        padding1 += ' ';
        padding2 += ' ';
      }
      const extra = ((maxLen > initStrLen) && ((maxLen - initStrLen) % 2 === 1) ? ' ' : '');
      // format string with sci-notation
      const eIdx = rawStr.indexOf('e');
      if (eIdx > -1) {
        const expStr = rawStr.substring(eIdx);
        const expStrLen = expStr.length;

        // if (str.trim() !== '0') {
        str = str.substring(0, maxLen - expStrLen) + expStr;
        // }
      }
      const formatted = padding1 + str + padding2 + extra;
      return formatted;
    };
    const te = this.elements;
    const cap = '+-                        -+';
    let matString = '\n' + cap + '\n';
    for (let i = 0; i < 3; ++i) {
      let rowString = '| ';
      for (let j = 0; j < 3; ++j) {
        const val = te[(j * 3) + i];
        const valStr = formatNumber(val);
        rowString += valStr;
      }
      matString += rowString + ' |\n';
    }
    return matString + cap;
  },
  findLargestInCol: function (m, i, startAtRow) {
    let me = m.elements;
    let offset = i * 3;
    let maxIdx = (startAtRow === undefined ? 0 : startAtRow);
    let maxVal = _Math.abs(me[offset + maxIdx]);
    for (let i = maxIdx + 1; i < 3; ++i) {
      let val = _Math.abs(me[offset + i]);
      if (val > maxVal) {
        maxIdx = i;
        maxVal = val;
      }
    }
    return maxIdx;
  },
  swapRowsInPlace: function swapRowsInPlace (m, i, j) {
    const me = m.elements;
    let a1 = me[i];
    let a2 = me[i + 3];
    let a3 = me[i + 6];

    me[i] = me[j];
    me[i + 3] = me[j + 3];
    me[i + 6] = me[j + 6];

    me[j] = a1;
    me[j + 3] = a2;
    me[j + 6] = a3;
  },
  scaleRow: function scaleAndAddRow (m, row, scale) {
    const me = m.elements;
    let i = row;
    let alpha = (scale === undefined ? 1.0 : scale);
    me[i] *= alpha;
    me[i + 3] *= alpha;
    me[i + 6] *= alpha;
  },
  scaleAndAddRow: function scaleAndAddRow (m, srcRow, destRow, scale) {
    const me = m.elements;
    let i = destRow;
    let j = srcRow;
    let alpha = (scale === undefined ? 1.0 : scale);
    me[i] += me[j] * alpha;
    me[i + 3] += me[j + 3] * alpha;
    me[i + 6] += me[j + 6] * alpha;
  },
  thresholdToZero: function thresholdToZero (m, TOL) {
    const me = m.elements;
    const TOLERANCE = TOL || EPSILON;
    for (let i = 0; i < 9; ++i) {
      if (Utils.isZero(me[i], TOLERANCE)) {
        me[i] = 0;
      }
    }
    return m;
  },
  modifiedGramSchmidt: function modifiedGramSchmidt (m) {
    const v0 = m.getColumn(0);
    const v1 = m.getColumn(1);
    const v2 = m.getColumn(2);
    function proj(u, v) {
      return u.clone().multiplyScalar(u.dot(v) / u.dot(u));
    }
    const u0 = v0;
    const u1 = v1.clone().sub(proj(u0, v1));
    const u2t = v2.clone().sub(proj(u0, v2));
    const u2 = u2t.sub(proj(u1, u2t));
    m.setColumns(u0, u1, u2);
  },
  rotg: function rotg (a, b, csr) {
    // Based on Algorithm 4 from "Discontinuous Plane
    // Rotations and the Symmetric Eigenvalue Problem"
    // by Anderson, 2000.
    let c = 0;
    let s = 0;
    let r = 0;
    let t = 0;
    let u = 0;

    if (b === 0) {
      c = _Math.sign(a);
      s = 0;
      r = _Math.abs(a);
    } else if (a === 0) {
      c = 0;
      s = _Math.sign(b);
      r = _Math.abs(b);
    } else if (_Math.abs(a) > _Math.abs(b)) {
      t = b / a;
      u = _Math.sign(a) * _Math.sqrt(1 + t * t);
      c = 1 / u;
      s = t * c;
      r = a * u;
    } else {
      t = a / b;
      u = _Math.sign(a) * _Math.sqrt(1 + t * t);
      s = 1 / u;
      c = t * s;
      r = b * u;
    }
    // try to save some unnecessary object creation
    if (csr !== undefined && csr.length > 2) {
      csr[0] = c;
      csr[1] = s;
      csr[2] = r;
    } else {
      return [c, s, r];
    }
  },
  qrDecomposition: function qrDecomposition (A) {
    const Q = new Matrix3();
    const R = (new Matrix3()).copy(A).thresholdEntriesToZero(EPSILON);
    const qe = Q.elements;
    const re = R.elements;

    const csr = [0, 0, 0];
    const m = 3;
    const n = 3;
    for (let j = 0; j < n; ++j) {
      for (let i = m - 1; i >= j + 1; --i) {
        const a = re[n * j + (i - 1)]; // R.get(i - 1, j);
        const b = re[n * j + i]; // R.get(i, j);
        if (a === 0 && b === 0) {
          continue;
        }
        helpers.rotg(a, b, csr);
        const c = csr[0];
        const s = csr[1];
        let tmp1 = 0;
        let tmp2 = 0;

        // R' = G * R
        for (let x = 0; x < n; ++x) {
          tmp1 = re[n * x + (i - 1)]; // R.get(i - 1, x);
          tmp2 = re[n * x + i]; // R.get(i, x);
          re[n * x + (i - 1)] = tmp1 * c + tmp2 * s; // R.set(i - 1, x, tmp1 * c + tmp2 * s);
          re[n * x + i] = -tmp1 * s + tmp2 * c; // R.set(i, x, -tmp1 * s + tmp2 * c);
        }
        re[n * j + (i - 1)] = csr[2]; // R.set(i - 1, j, csr[2]);
        re[n * j + i] = 0; // R.set(i, j, 0);

        // Q' = Q * G^T
        for (let x = 0; x < m; ++x) {
          tmp1 = qe[n * (i - 1) + x]; // Q.get(x, i - 1);
          tmp2 = qe[n * i + x]; // Q.get(x, i);
          qe[n * (i - 1) + x] = tmp1 * c + tmp2 * s; // Q.set(x, i - 1, tmp1 * c + tmp2 * s);
          qe[n * i + x] = -tmp1 * s + tmp2 * c; // Q.set(x, i, -tmp1 * s + tmp2 * c);
        }
      }
    }
    return { Q, R }
  },
  rrefInPlace: function (m) {
    const me = m.elements;
    // iterate through all rows to get to REF
    for (let i = 0; i < 3; ++i) {
      // search for largest in col and swap
      const k = helpers.findLargestInCol(m, i, i);
      if (k !== i) {
        helpers.swapRowsInPlace(m, i, k);
      }
      // scale and add current row to all rows underneath
      const largestElem = me[(i * 3) + i];
      if (!Utils.isZero(largestElem, EPSILON)) {
        helpers.scaleRow(m, i, 1.0 / largestElem);
        for (let j = i + 1; j < 3; ++j) {
          const scaleElem = me[(i * 3) + j];
          if (!Utils.isZero(scaleElem, EPSILON)) {
            helpers.scaleAndAddRow(m, i, j, -scaleElem);
          }
        }
      }
    }
    // iterate back through to get RREF since everything on diagonals should be 1 or 0
    for (let i = 2; i >= 0; --i) {
      const val = me[(i * 3) + i];
      if (!Utils.isZero(val, EPSILON)) {
        for (let j = i - 1; j >= 0; --j) {
          const scaleElem = me[(i * 3) + j];
          if (!Utils.isZero(scaleElem, EPSILON)) {
            helpers.scaleAndAddRow(m, i, j, -scaleElem);
          }
        }
      }
    }
    return m;
  },
  isRowNonzero: function isRowNonzero (m, i) {
    const me = m.elements;
    return !(Utils.isZero(me[i], EPSILON) &&
              Utils.isZero(me[i + 3], EPSILON) &&
              Utils.isZero(me[i + 6], EPSILON));
  }
};

function Matrix3 () {
  this.elements = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];
  if (arguments.length > 0) {
    console.error('THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.');
  }
}

Object.assign(Matrix3.prototype, {
  isMatrix3: true,

  set: function (n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    const te = this.elements;
    te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
    te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
    te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;
    return this;
  },

  setColumns: function (c0, c1, c2) {
    const te = this.elements;
    te[ 0 ] = c0.x; te[ 1 ] = c0.y; te[ 2 ] = c0.z;
    te[ 3 ] = c1.x; te[ 4 ] = c1.y; te[ 5 ] = c1.z;
    te[ 6 ] = c2.x; te[ 7 ] = c2.y; te[ 8 ] = c2.z;
    return this;
  },

  setRows: function (r0, r1, r2) {
    const te = this.elements;
    te[ 0 ] = r0.x; te[ 1 ] = r1.x; te[ 2 ] = r2.x;
    te[ 3 ] = r0.y; te[ 4 ] = r1.y; te[ 5 ] = r2.y;
    te[ 6 ] = r0.z; te[ 7 ] = r1.z; te[ 8 ] = r2.z;
    return this;
  },

  identity: function () {
    this.set(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    );
    return this;
  },

  setSkewSymmetric: function (v) {
    const te = this.elements;
    te[0] = 0;
    te[3] = -v.z;
    te[6] = v.y;
    te[1] = v.z;
    te[4] = 0;
    te[7] = -v.x;
    te[2] = -v.y;
    te[5] = v.x;
    te[8] = 0;
    return this;
  },

  clone: function () {
    return new this.constructor().fromArray(this.elements);
  },

  copy: function (m) {
    const te = this.elements;
    const me = m.elements;
    te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
    te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
    te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];
    return this;
  },

  addMatrices: function (a, b, scalar) {
    const alpha = (scalar === undefined ? 1 : scalar);
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;

    const a11 = ae[ 0 ];
    const a12 = ae[ 3 ];
    const a13 = ae[ 6 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 4 ];
    const a23 = ae[ 7 ];
    const a31 = ae[ 2 ];
    const a32 = ae[ 5 ];
    const a33 = ae[ 8 ];

    const b11 = be[ 0 ];
    const b12 = be[ 3 ];
    const b13 = be[ 6 ];
    const b21 = be[ 1 ];
    const b22 = be[ 4 ];
    const b23 = be[ 7 ];
    const b31 = be[ 2 ];
    const b32 = be[ 5 ];
    const b33 = be[ 8 ];

    te[ 0 ] = a11 + (b11 * alpha);
    te[ 3 ] = a12 + (b12 * alpha);
    te[ 6 ] = a13 + (b13 * alpha);
    te[ 1 ] = a21 + (b21 * alpha);
    te[ 4 ] = a22 + (b22 * alpha);
    te[ 7 ] = a23 + (b23 * alpha);
    te[ 2 ] = a31 + (b31 * alpha);
    te[ 5 ] = a32 + (b32 * alpha);
    te[ 8 ] = a33 + (b33 * alpha);

    return this;
  },

  add: function (m, scalar) {
    return this.addMatrices(this, m, scalar);
  },

  multiply: function (m) {
    return this.multiplyMatrices(this, m);
  },

  premultiply: function (m) {
    return this.multiplyMatrices(m, this);
  },

  multiplyMatrices: function (a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;

    const a11 = ae[ 0 ];
    const a12 = ae[ 3 ];
    const a13 = ae[ 6 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 4 ];
    const a23 = ae[ 7 ];
    const a31 = ae[ 2 ];
    const a32 = ae[ 5 ];
    const a33 = ae[ 8 ];

    const b11 = be[ 0 ];
    const b12 = be[ 3 ];
    const b13 = be[ 6 ];
    const b21 = be[ 1 ];
    const b22 = be[ 4 ];
    const b23 = be[ 7 ];
    const b31 = be[ 2 ];
    const b32 = be[ 5 ];
    const b33 = be[ 8 ];

    te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31;
    te[ 3 ] = a11 * b12 + a12 * b22 + a13 * b32;
    te[ 6 ] = a11 * b13 + a12 * b23 + a13 * b33;

    te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31;
    te[ 4 ] = a21 * b12 + a22 * b22 + a23 * b32;
    te[ 7 ] = a21 * b13 + a22 * b23 + a23 * b33;

    te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31;
    te[ 5 ] = a31 * b12 + a32 * b22 + a33 * b32;
    te[ 8 ] = a31 * b13 + a32 * b23 + a33 * b33;

    return this;
  },

  multiplyScalar: function (s) {
    const te = this.elements;
    te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
    te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
    te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;
    return this;
  },

  determinant: function () {
    const te = this.elements;
    const a = te[ 0 ];
    const b = te[ 1 ];
    const c = te[ 2 ];
    const d = te[ 3 ];
    const e = te[ 4 ];
    const f = te[ 5 ];
    const g = te[ 6 ];
    const h = te[ 7 ];
    const i = te[ 8 ];
    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
  },

  invert: function (throwOnDegenerate) {
    return this.getInverse(this, throwOnDegenerate);
  },

  adjugate: function () {
    return this.getAdjugate(this);
  },

  getAdjugate: function (matrix) {
    const me = matrix.elements;
    const a11 = me[ 0 ];
    const a21 = me[ 1 ];
    const a31 = me[ 2 ];
    const a12 = me[ 3 ];
    const a22 = me[ 4 ];
    const a32 = me[ 5 ];
    const a13 = me[ 6 ];
    const a23 = me[ 7 ];
    const a33 = me[ 8 ];

    const t11 = +(a22 * a33 - a23 * a32);
    const t12 = -(a12 * a33 - a13 * a32);
    const t13 = +(a12 * a23 - a13 * a22);
    const t21 = -(a21 * a33 - a23 * a31);
    const t22 = +(a11 * a33 - a13 * a31);
    const t23 = -(a11 * a23 - a13 * a21);
    const t31 = +(a21 * a32 - a22 * a31);
    const t32 = -(a11 * a32 - a12 * a31);
    const t33 = +(a11 * a22 - a12 * a21);

    const te = this.elements;
    te[0] = t11;
    te[1] = t21;
    te[2] = t31;
    te[3] = t12;
    te[4] = t22;
    te[5] = t32;
    te[6] = t13;
    te[7] = t23;
    te[8] = t33;

    return this;
  },

  getInverse: function (matrix, throwOnDegenerate) {
    const me = matrix.elements;
    const te = this.elements;
    const n11 = me[ 0 ];
    const n21 = me[ 1 ];
    const n31 = me[ 2 ];
    const n12 = me[ 3 ];
    const n22 = me[ 4 ];
    const n32 = me[ 5 ];
    const n13 = me[ 6 ];
    const n23 = me[ 7 ];
    const n33 = me[ 8 ];

    const t11 = n33 * n22 - n32 * n23;
    const t12 = n32 * n13 - n33 * n12;
    const t13 = n23 * n12 - n22 * n13;

    const det = n11 * t11 + n21 * t12 + n31 * t13;

    if (det === 0) {
      const msg = 'Matrix3.getInverse(): cannot invert matrix, determinant is 0';

      if (throwOnDegenerate === true) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }
      return this.identity();
    }

    const detInv = 1.0 / det;
    te[ 0 ] = t11 * detInv;
    te[ 1 ] = (n31 * n23 - n33 * n21) * detInv;
    te[ 2 ] = (n32 * n21 - n31 * n22) * detInv;

    te[ 3 ] = t12 * detInv;
    te[ 4 ] = (n33 * n11 - n31 * n13) * detInv;
    te[ 5 ] = (n31 * n12 - n32 * n11) * detInv;

    te[ 6 ] = t13 * detInv;
    te[ 7 ] = (n21 * n13 - n23 * n11) * detInv;
    te[ 8 ] = (n22 * n11 - n21 * n12) * detInv;

    return this;
  },

  transpose: function () {
    let tmp;
    const m = this.elements;

    tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
    tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
    tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;
    return this;
  },

  trace: function () {
    const me = this.elements;
    const n11 = me[ 0 ];
    const n22 = me[ 4 ];
    const n33 = me[ 8 ];
    return n11 + n22 + n33;
  },

  transposeIntoArray: function (r) {
    const m = this.elements;
    r[ 0 ] = m[ 0 ];
    r[ 1 ] = m[ 3 ];
    r[ 2 ] = m[ 6 ];
    r[ 3 ] = m[ 1 ];
    r[ 4 ] = m[ 4 ];
    r[ 5 ] = m[ 7 ];
    r[ 6 ] = m[ 2 ];
    r[ 7 ] = m[ 5 ];
    r[ 8 ] = m[ 8 ];
    return this;
  },

  equals: function (matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 9; i++) {
      if (te[i] !== me[i]) {
        return false;
      }
    }
    return true;
  },

  fromArray: function (array, offset) {
    if (offset === undefined) {
      offset = 0;
    }
    for (let i = 0; i < 9; i++) {
      this.elements[ i ] = array[i + offset];
    }
    return this;
  },

  toArray: function (array, offset) {
    if (array === undefined) {
      array = [];
    }
    if (offset === undefined) {
      offset = 0;
    }

    const te = this.elements;

    array[ offset ] = te[ 0 ];
    array[ offset + 1 ] = te[ 1 ];
    array[ offset + 2 ] = te[ 2 ];

    array[ offset + 3 ] = te[ 3 ];
    array[ offset + 4 ] = te[ 4 ];
    array[ offset + 5 ] = te[ 5 ];

    array[ offset + 6 ] = te[ 6 ];
    array[ offset + 7 ] = te[ 7 ];
    array[ offset + 8 ] = te[ 8 ];

    return array;
  },

  getEigenvalues: function () {
    const je = this.elements;
    const a = je[ 0 ];
    const b = je[ 1 ];
    const c = je[ 2 ];
    const d = je[ 3 ];
    const e = je[ 4 ];
    const f = je[ 5 ];
    const g = je[ 6 ];
    const h = je[ 7 ];
    const i = je[ 8 ];

    const A = 1;
    const B = -(a + e + i);
    const C = a * e + a * i - d * b - g * c + e * i - h * f;
    const D = -(a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g);

    return Polynomial.getRealCubicRoots(A, B, C, D);
  },

  findLargestAbsElement: function () {
    const te = this.elements;
    let max = _Math.abs(te[0]);
    let rowCol = {
      row: 0,
      column: 0,
      value: te[0]
    };
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        const val = te[i * 3 + j];
        const ti = _Math.abs(val);
        if (ti > max) {
          max = ti;
          rowCol.row = j;
          rowCol.column = i;
          rowCol.value = val;
        }
      }
    }
    return rowCol;
  },

  getRow: function (i) {
    const te = this.elements;
    switch (i) {
      case 0:
        return new Vector3(te[0], te[3], te[6]);
      case 1:
        return new Vector3(te[1], te[4], te[7]);
      case 2:
        return new Vector3(te[2], te[5], te[8]);
      default:
        throw new Error('No row defined at ' + i + '.');
    }
  },

  getColumn: function (i) {
    const te = this.elements;
    switch (i) {
      case 0:
        return new Vector3(te[0], te[1], te[2]);
      case 1:
        return new Vector3(te[3], te[4], te[5]);
      case 2:
        return new Vector3(te[6], te[7], te[8]);
      default:
        throw new Error('No column defined at ' + i + '.');
    }
  },

  findFirstNonvanishing: function () {
    const te = this.elements;
    let rowCol = {
      row: 0,
      column: 0,
      value: te[0]
    };
    if (Utils.isZero(te[0], EPSILON)) {
      for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
          const val = te[i * 3 + j];
          if (!Utils.isZero(val, EPSILON)) {
            rowCol.row = j;
            rowCol.column = i;
            rowCol.value = val;
            return rowCol;
          }
        }
      }
    }
    return rowCol;
  },

  thresholdEntriesToZero: function (TOL) {
    return helpers.thresholdToZero(this, TOL);
  },

  prettyPrint: function () {
    return helpers.prettyPrint.call(this);
  },

  getRank: function () {
    const { Q, R } = helpers.qrDecomposition(this);
    R.thresholdEntriesToZero(100 * EPSILON);
    let rank = 0;
    const test = helpers.rrefInPlace(R);
    for (let i = 0; i < 3; ++i) {
      if (helpers.isRowNonzero(R, i)) {
        rank++;
      }
    }
    return rank;
  },

  decomposeQR: function () {
    return helpers.qrDecomposition(this);
  },

  thresholdToLowerRank: function () {
    // computes a QR decomposition and thresholds the R matrix values
    // so that the true rank will be reflected
    const { Q, R } = helpers.qrDecomposition(this);
    R.thresholdEntriesToZero(10 * EPSILON);
    this.copy(Q.multiply(R));
    return this;
  }
});

module.exports = Matrix3;
