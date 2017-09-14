'use strict';

/*
 *   Base code from THREE.js authors below.
 *   Additions by Tim Bright
 */
/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */

const Utils = require('./utils.js');
const Vector3 = require('./vector3.js');
const PolyRoots = require('cubic-roots');
// const _Math = require('./stdMath.js');
// const Compare = require('./compare.js');
const MathHelpers = require('./math-helpers.js');

// function assumes row and column numbering from 0-2.
const helpers = {
  modifiedGramSchmidt: function modifiedGramSchmidt (m) {
    return MathHelpers.modifiedGramSchmidt(m);
  },
  luSolve: function luSolve (A, P, b, x) {
    const X = (x !== undefined ? x.setScalar(0) : b.clone().setScalar(0));
    return MathHelpers.luSolve(A, P, b, X);
  }
};

function Matrix3 () {
  this.elements = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];
  if (arguments.length > 0) {
    console.error('Matrix3: the constructor no longer reads arguments. use .set() instead.');
  }
}

Object.assign(Matrix3.prototype, {
  isMatrix3: true,

  dimension: 3,

  E0: new Vector3(1, 0, 0),

  E1: new Vector3(0, 1, 0),

  E2: new Vector3(0, 0, 1),

  set: function (n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    const te = this.elements;
    te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
    te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
    te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;
    return this;
  },

  setRow: function (i, row) {
    const te = this.elements;
    te[ i + 0 ] = row.x;
    te[ i + 3 ] = row.y;
    te[ i + 6 ] = row.z;
    return this;
  },

  setColumn: function (i, col) {
    const te = this.elements;
    const to = i * 3;
    te[ to + 0 ] = col.x;
    te[ to + 1 ] = col.y;
    te[ to + 2 ] = col.z;
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
    const { P, A } = MathHelpers.luDecomposition(matrix, true);
    matrix.setRow(0, helpers.luSolve(A, P, matrix.E0));
    matrix.setRow(1, helpers.luSolve(A, P, matrix.E1));
    matrix.setRow(2, helpers.luSolve(A, P, matrix.E2));
    return matrix;
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
    // Bad way of doing this!
    // TODO: Find better way
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

    return PolyRoots.getCubicRoots(A, B, C, D);
  },

  getOuterProduct: function (a, b, scalar) {
    // computes alpha * (ab^T)
    const alpha = (scalar === undefined ? 1 : scalar);
    const n11 = alpha * a.x * b.x;
    const n12 = alpha * a.x * b.y;
    const n13 = alpha * a.x * b.z;
    const n21 = alpha * a.y * b.x;
    const n22 = alpha * a.y * b.y;
    const n23 = alpha * a.y * b.z;
    const n31 = alpha * a.z * b.x;
    const n32 = alpha * a.z * b.y;
    const n33 = alpha * a.z * b.z;
    return this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
  },

  addOuterProduct: function (a, b, scalar) {
    // computes [this + alpha * (ab^T)]
    const te = this.elements;
    const alpha = (scalar === undefined ? 1 : scalar);
    const n11 = alpha * a.x * b.x;
    const n12 = alpha * a.x * b.y;
    const n13 = alpha * a.x * b.z;
    const n21 = alpha * a.y * b.x;
    const n22 = alpha * a.y * b.y;
    const n23 = alpha * a.y * b.z;
    const n31 = alpha * a.z * b.x;
    const n32 = alpha * a.z * b.y;
    const n33 = alpha * a.z * b.z;
    te[ 0 ] += n11;
    te[ 1 ] += n21;
    te[ 2 ] += n31;
    te[ 3 ] += n12;
    te[ 4 ] += n22;
    te[ 5 ] += n32;
    te[ 6 ] += n13;
    te[ 7 ] += n23;
    te[ 8 ] += n33;
    return this;
  },

  findLargestAbsElement: function () {
    return MathHelpers.findLargestAbsElement(this);
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

  findFirstNonvanishing: function (TOL = 1e-14) {
    return MathHelpers.findFirstNonvanishing(this, TOL);
  },

  thresholdEntriesToZero: function (TOL = 1e-14) {
    return MathHelpers.thresholdToZero(this, TOL);
  },

  getRank: function (TOL = 1e-14) {
    return MathHelpers.getRank(this, TOL);
  },

  decomposeQR: function (inPlace = false) {
    return MathHelpers.qrDecomposition(this);
  },

  decomposeLU: function (inPlace = true) {
    return MathHelpers.luDecomposition(this, inPlace);
  },

  solveLU: function (P, b, x) {
    return helpers.luSolve(this, P, b, x);
  },

  prettyPrint: function () {
    return Utils.printMatrix3(this);
  }
});

module.exports = Matrix3;
