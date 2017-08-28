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
const Vector2 = require('./vector2.js');

function Matrix2 () {
  this.elements = [
    1, 0,
    0, 1
  ];
}

Object.assign(Matrix2.prototype, {
  isMatrix2: true,

  dimension: 2,

  // column-major
  set: function (n11, n12, n21, n22) {
    const te = this.elements;
    te[ 0 ] = n11; te[ 1 ] = n21;
    te[ 2 ] = n12; te[ 3 ] = n22;
    return this;
  },

  setRow: function (i, row) {
    const te = this.elements;
    te[ i + 0 ] = row.x;
    te[ i + 2 ] = row.y;
    return this;
  },

  setColumn: function (i, col) {
    const te = this.elements;
    const to = i * 2;
    te[ to + 0 ] = col.x;
    te[ to + 1 ] = col.y;
    return this;
  },

  setColumns: function (c0, c1) {
    const te = this.elements;
    te[ 0 ] = c0.x; te[ 1 ] = c0.y;
    te[ 2 ] = c1.x; te[ 3 ] = c1.y;
    return this;
  },

  setRows: function (r0, r1) {
    const te = this.elements;
    te[ 0 ] = r0.x; te[ 1 ] = r1.x;
    te[ 2 ] = r0.y; te[ 3 ] = r1.y;
    return this;
  },

  getRow: function (i) {
    const te = this.elements;
    switch (i) {
      case 0:
        return new Vector2(te[0], te[2]);
      case 1:
        return new Vector2(te[1], te[3]);
      default:
        throw new Error('No row defined at ' + i + '.');
    }
  },

  getColumn: function (i) {
    const te = this.elements;
    switch (i) {
      case 0:
        return new Vector2(te[0], te[1]);
      case 1:
        return new Vector2(te[2], te[3]);
      default:
        throw new Error('No column defined at ' + i + '.');
    }
  },

  identity: function () {
    this.set(
      1, 0,
      0, 1
    );
    return this;
  },

  clone: function () {
    return new this.constructor().fromArray(this.elements);
  },

  copy: function (m) {
    const te = this.elements;
    const me = m.elements;
    te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ];
    te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
    return this;
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
    const a12 = ae[ 2 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 3 ];

    const b11 = be[ 0 ];
    const b12 = be[ 2 ];
    const b21 = be[ 1 ];
    const b22 = be[ 3 ];

    te[ 0 ] = a11 * b11 + a12 * b21;
    te[ 1 ] = a21 * b11 + a22 * b21;
    te[ 2 ] = a11 * b12 + a12 * b22;
    te[ 3 ] = a21 * b12 + a22 * b22;

    return this;
  },

  multiplyScalar: function (s) {
    const te = this.elements;
    te[ 0 ] *= s; te[ 2 ] *= s;
    te[ 1 ] *= s; te[ 3 ] *= s;
    return this;
  },

  determinant: function () {
    const te = this.elements;
    const a = te[ 0 ];
    const b = te[ 2 ];
    const c = te[ 1 ];
    const d = te[ 3 ];
    return a * d - b * c;
  },

  getInverse: function (matrix, throwOnDegenerate) {
    const me = matrix.elements;
    const te = this.elements;
    const a = me[ 0 ];
    const b = me[ 2 ];
    const c = me[ 1 ];
    const d = me[ 3 ];

    const det = a * d - b * c;

    if (det === 0) {
      const msg = 'Matrix2.getInverse(): cannot invert matrix, determinant is 0';
      if (throwOnDegenerate === true) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }
      return this.identity();
    }

    const detInv = 1.0 / det;
    te[ 0 ] = d * detInv;
    te[ 2 ] = -b * detInv;
    te[ 1 ] = -c * detInv;
    te[ 3 ] = a * detInv;

    return this;
  },

  invert: function (throwOnDegenerate) {
    return this.getInverse(this, throwOnDegenerate);
  },

  transpose: function () {
    const m = this.elements;

    let tmp = m[ 1 ];
    m[ 1 ] = m[ 2 ];
    m[ 2 ] = tmp;
    return this;
  },

  equals: function (matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 4; i++) {
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
    for (let i = 0; i < 4; i++) {
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

    return array;
  },

  getOuterProduct: function (a, b, scalar) {
    const alpha = (scalar === undefined ? 1 : scalar);
    const n11 = alpha * a.x * b.x;
    const n12 = alpha * a.x * b.y;
    const n21 = alpha * a.y * b.x;
    const n22 = alpha * a.y * b.y;
    return this.set(n11, n12, n21, n22);
  },

  addOuterProduct: function (a, b, scalar) {
    const te = this.elements;
    const alpha = (scalar === undefined ? 1 : scalar);
    const n11 = alpha * a.x * b.x;
    const n12 = alpha * a.x * b.y;
    const n21 = alpha * a.y * b.x;
    const n22 = alpha * a.y * b.y;
    te[ 0 ] += n11;
    te[ 2 ] += n12;
    te[ 1 ] += n21;
    te[ 3 ] += n22;
    return this;
  },

  addMatrices: function (a, b, scalar) {
    const alpha = (scalar === undefined ? 1 : scalar);
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;

    const a11 = ae[ 0 ];
    const a12 = ae[ 2 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 3 ];

    const b11 = be[ 0 ];
    const b12 = be[ 2 ];
    const b21 = be[ 1 ];
    const b22 = be[ 3 ];

    te[ 0 ] = a11 + (b11 * alpha);
    te[ 2 ] = a12 + (b12 * alpha);
    te[ 1 ] = a21 + (b21 * alpha);
    te[ 3 ] = a22 + (b22 * alpha);

    return this;
  },

  add: function (m) {
    return this.addMatrices(this, m);
  },

  prettyPrint: function () {
    return Utils.printMatrix2(this);
  }
});

module.exports = Matrix2;
