'use strict';

/*
 * Base code from THREE.js authors below.
 * Additions by Tim Bright
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */

const Utils = require('./utils.js');
const Vector2 = require('./vector2.js');
const Vector3 = require('./vector3.js');
const PolyRoots = require('cubic-roots');
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

/**
 * A 3x3 matrix stored in column-major order.
 * @class Matrix3
 */
class Matrix3 {
  constructor () {
    this.elements = [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ];
    if (arguments.length > 0) {
      console.error('Matrix3: the constructor no longer reads arguments. use .set() instead.');
    }
  }

  /**
   * Sets the values of the matrix elements.
   * @param {number} n11 Element a11.
   * @param {number} n12 Element a12.
   * @param {number} n13 Element a13.
   * @param {number} n21 Element a21.
   * @param {number} n22 Element a22.
   * @param {number} n23 Element a23.
   * @param {number} n31 Element a31.
   * @param {number} n32 Element a32.
   * @param {number} n33 Element a33.
   */
  set (n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    const te = this.elements;
    te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
    te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
    te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;
    return this;
  }

  /**
   * Sets a row of the matrix.
   * @param {number} i The row index (0-2).
   * @param {Vector3} row The vector holding the values.
   */
  setRow (i, row) {
    const te = this.elements;
    te[ i + 0 ] = row.x;
    te[ i + 3 ] = row.y;
    te[ i + 6 ] = row.z;
    return this;
  }

  /**
   * Sets a column of the matrix.
   * @param {number} i The row index (0-2).
   * @param {Vector3} col The vector holding the values.
   */
  setColumn (i, col) {
    const te = this.elements;
    const to = i * 3;
    te[ to + 0 ] = col.x;
    te[ to + 1 ] = col.y;
    te[ to + 2 ] = col.z;
    return this;
  }

  /**
   * Sets the columns of the matrix.
   * @param {Vector3} c0 The first column.
   * @param {Vector3} c1 The second column.
   * @param {Vector3} c2 The third column.
   */
  setColumns (c0, c1, c2) {
    const te = this.elements;
    te[ 0 ] = c0.x; te[ 1 ] = c0.y; te[ 2 ] = c0.z;
    te[ 3 ] = c1.x; te[ 4 ] = c1.y; te[ 5 ] = c1.z;
    te[ 6 ] = c2.x; te[ 7 ] = c2.y; te[ 8 ] = c2.z;
    return this;
  }

  /**
   * Sets the rows of the matrix.
   * @param {Vector3} r0 The first row.
   * @param {Vector3} r1 The second row.
   * @param {Vector3} r2 The third row.
   */
  setRows (r0, r1, r2) {
    const te = this.elements;
    te[ 0 ] = r0.x; te[ 1 ] = r1.x; te[ 2 ] = r2.x;
    te[ 3 ] = r0.y; te[ 4 ] = r1.y; te[ 5 ] = r2.y;
    te[ 6 ] = r0.z; te[ 7 ] = r1.z; te[ 8 ] = r2.z;
    return this;
  }

  /**
   * Sets the matrix as the identity matrix.
   */
  identity () {
    this.set(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    );
    return this;
  }

  /**
   * Sets this matrix as skew-symmetric based on a given vector.
   * @param {Vector3} v The given vector.
   */
  setSkewSymmetric (v) {
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
  }

  /**
   * Clones the matrix.
   * @returns {Matrix3} A new matrix with the same element values.
   */
  clone () {
    return new this.constructor().fromArray(this.elements);
  }

  /**
   * Copies the element values of the given matrix.
   * @param {Matrix3} m The given matrix.
   */
  copy (m) {
    const te = this.elements;
    const me = m.elements;
    te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
    te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
    te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];
    return this;
  }

  /**
   * Adds 2 matrices together and optionally scales the result.
   * @param {Matrix3} a The first matrix.
   * @param {Matrix3} b The second matrix.
   * @param {number} scalar The number to scale the result by.
   */
  addMatrices (a, b, scalar) {
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
  }

  /**
   * Adds a given matrix to this matrix.
   * @param {Matrix3} m The given matrix.
   */
  add (m, scalar) {
    return this.addMatrices(this, m, scalar);
  }

  /**
   * Right-multiplies the given matrix with this one (this * m).
   * @param {Matrix3} m The given matrix.
   */
  multiply (m) {
    return this.multiplyMatrices(this, m);
  }

  /**
   * Left-multiplies the given matrix with this one (m * this).
   * @param {Matrix3} m The given matrix.
   */
  premultiply (m) {
    return this.multiplyMatrices(m, this);
  }

  /**
   * Multiplies two 3x3 matrices (A * B).
   * @param {Matrix3} a The A matrix.
   * @param {Matrix3} b The B matrix.
   */
  multiplyMatrices (a, b) {
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
  }

  /**
   * Scales a matrix.
   * @param {number} s The number to scale by.
   */
  multiplyScalar (s) {
    const te = this.elements;
    te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
    te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
    te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;
    return this;
  }

  /**
   * Computes the determinant of the matrix.
   * @returns {number} The determinant.
   */
  determinant () {
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
  }

  /**
   * Inverts this matrix.
   * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
   */
  invert (throwOnDegenerate) {
    return this.getInverse(this, throwOnDegenerate);
  }

  /**
   * Computes the adjugates of this matrix in-place.
   */
  adjugate () {
    return this.getAdjugate(this);
  }

  /**
   * Computes the adjugate of the given matrix and assigns it to this matrix.
   * @param {Matrix3} matrix The given matrix.
   */
  getAdjugate (matrix) {
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
  }

  /**
   * Computes the inverse of the given matrix and assigns it to this matrix.
   * @param {Matrix3} matrix The given matrix.
   * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
   */
  getInverse (matrix, throwOnDegenerate) {
    const { P, A } = MathHelpers.luDecomposition(matrix, true);
    matrix.setRow(0, helpers.luSolve(A, P, matrix.E0));
    matrix.setRow(1, helpers.luSolve(A, P, matrix.E1));
    matrix.setRow(2, helpers.luSolve(A, P, matrix.E2));
    return matrix;
  }

  /**
   * Transposes this matrix in-place.
   */
  transpose () {
    let tmp;
    const m = this.elements;

    tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
    tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
    tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;
    return this;
  }

  /**
   * Computes the trace of this matrix.
   * @returns {number} The matrix trace.
   */
  trace () {
    const me = this.elements;
    const n11 = me[ 0 ];
    const n22 = me[ 4 ];
    const n33 = me[ 8 ];
    return n11 + n22 + n33;
  }

  /**
   * Compares the equality with a given matrix (strict).
   * @param {Matrix3} matrix The given matrix.
   */
  equals (matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 9; i++) {
      if (te[i] !== me[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Loads values from an array into a matrix.
   * @param {number[]} array The array to populate the matrix from.
   * @param {number} offset The numeric array offset.
   */
  fromArray (array, offset) {
    if (offset === undefined) {
      offset = 0;
    }
    for (let i = 0; i < 9; i++) {
      this.elements[ i ] = array[i + offset];
    }
    return this;
  }

  /**
   * Loads values into an array into a matrix.
   * @param {number[]} array The array to populate the matrix values into.
   * @param {number} offset The numeric array offset.
   */
  toArray (array, offset) {
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
  }

  /**
   * Gets the eigenvalues of the matrix.
   * @returns {Object} A0 is the real eigenvalue, A1 and A2 are real coefficients, B1 and B2 are complex coefficients.
   */
  getEigenvalues () {
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
  }

  /**
   * Computes the outer product of two vectors (a*b^T).
   * @param {Vector3} a The first vector.
   * @param {Vector3} b The second vector.
   * @param {number} scalar The number to scale the matrix by (defaults to 1).
   */
  getOuterProduct (a, b, scalar) {
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
  }

  /**
   * Adds the outer product of two vectors (a*b^T) to this matrix.
   * @param {Vector3} a The first vector.
   * @param {Vector3} b The second vector.
   * @param {number} scalar The number to scale the matrix by (defaults to 1).
   */
  addOuterProduct (a, b, scalar) {
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
  }

  /**
   * Finds the largest element of the matrix.
   */
  findLargestAbsElement () {
    return MathHelpers.findLargestAbsElement(this);
  }

  /**
   * Gets the row at the specified index of the matrix.
   * @param {number} i The index of the row (0-2).
   * @returns {Vector3} The vector with the row values.
   */
  getRow (i) {
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
  }

  /**
   * Gets the column at the specified index of the matrix.
   * @param {number} i The index of the column (0-2).
   * @returns {Vector3} The vector with the column values.
   */
  getColumn (i) {
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
  }

  /**
   * Finds the first number below the specified numerical tolerance.
   * @param {number} TOL The numerical tolerance.
   */
  findFirstNonvanishing (TOL = 1e-14) {
    return MathHelpers.findFirstNonvanishing(this, TOL);
  }

  /**
   * Rounds every element below the numerical tolerance to zero.
   * @param {number} TOL The numerical tolerance.
   */
  thresholdEntriesToZero (TOL = 1e-14) {
    return MathHelpers.thresholdToZero(this, TOL);
  }

  /**
   * Gets the rank of this matrix.
   * @param {number} TOL The numerical tolerance (defaults to 1e-14).
   */
  getRank (TOL = 1e-14) {
    return MathHelpers.getRank(this, TOL);
  }

  /**
   * Computes the QR decomposition.
   * @param {boolean} inPlace Replaces this matrix with the R matrix.
   */
  decomposeQR (inPlace = false) {
    return MathHelpers.qrDecomposition(this);
  }

  /**
   * Computes the Crout LU decomposition.
   * @param {boolean} inPlace Replaces this matrix with the LU decomposition.
   */
  decomposeLU (inPlace = true) {
    return MathHelpers.luDecomposition(this, inPlace);
  }

  /**
   * Solves an Ax=b problem using the LU decomposition computed earlier.
   * @param {Matrix3} P The permutation matrix.
   * @param {Vector3} b The result row vector.
   * @param {Vector3} X The solution vector.
   */
  solveLU (P, b, x) {
    return helpers.luSolve(this, P, b, x);
  }

  /**
   * Pretty prints this matrix.
   */
  prettyPrint () {
    return Utils.printMatrix3(this);
  }

  /**
   * Creates a Householder matrix from this vector.
   * @param {Vector3} v The vector.
   * @param {number} beta Optional. Scales the outer product, defaults to 2/(v *v).
   */
  multiplyHouseholderMatrix (v, beta) {
    if (!v.isVector3) {
      throw new Error('multiplyHouseholderMatrix(): expected a Vector3.');
    }
    const BETA = beta || 2 / (v.dot(v));
    const w = v.multiplyMatrix3(this);
    return this.addOuterProduct(w, v, -BETA);
  }

  /**
   * Converts the matrix to Hessenberg form.
   */
  convertToHessenberg () {
    const te = this.elements;
    const x0 = new Vector2(te[1], te[2]);
    const { v, beta } = x0.getHouseholderVector();
    const n11 = beta * v.x * v.x;
    const n12 = beta * v.x * v.y;
    const n21 = beta * v.y * v.x;
    const n22 = beta * v.y * v.y;
    // TODO: unroll this multiplication
    const P = new Matrix3();
    P.set(1, 0, 0, 0, 1 - n11, -n12, 0, -n21, 1 - n22);
    return this.multiply(P).premultiply(P);
  }

  /**
   * Takes a QR step in Hessenberg form.
   */
  takeHessenbergQRStep () {
    return MathHelpers.hessenbergQRStep(this);
  }
}

Object.defineProperties(Matrix3.prototype, {
  /**
   * @memberOf Matrix3#isMatrix3
   */
  isMatrix3: {
    value: true,
    writable: false
  },
  /**
   * @memberOf Matrix3#dimension
   */
  dimension: {
    value: 3,
    writable: false
  },
  /**
   * @memberOf Matrix3#E0
   */
  E0: {
    value: Object.freeze(new Vector3(1, 0, 0)),
    writable: false
  },
  /**
   * @memberOf Matrix3#E1
   */
  E1: {
    value: Object.freeze(new Vector3(0, 1, 0)),
    writable: false
  },
  /**
   * @memberOf Matrix3#E2
   */
  E2: {
    value: Object.freeze(new Vector3(0, 0, 1)),
    writable: false
  }
});

module.exports = Matrix3;
