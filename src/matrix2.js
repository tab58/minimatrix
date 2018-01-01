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
const MathHelpers = require('./math-helpers.js');
const PolyRoots = require('cubic-roots');

/**
 * A 2x2 matrix stored in column-major order.
 * @class Matrix2
 */
class Matrix2 {
  constructor () {
    this.elements = [
      1, 0,
      0, 1
    ];
  }

  /**
   * Sets the matrix elements.
   * @param {number} n11 Element a11.
   * @param {number} n12 Element a12.
   * @param {number} n21 Element a21.
   * @param {number} n22 Element a22.
   */
  set (n11, n12, n21, n22) {
    const te = this.elements;
    te[ 0 ] = n11; te[ 1 ] = n21;
    te[ 2 ] = n12; te[ 3 ] = n22;
    return this;
  }

  /**
   * Sets a row of the matrix.
   * @param {number} i The row index (0-1).
   * @param {Vector2} row The vector holding the values.
   */
  setRow (i, row) {
    const te = this.elements;
    te[ i + 0 ] = row.x;
    te[ i + 2 ] = row.y;
    return this;
  }

  /**
   * Sets a column of the matrix.
   * @param {number} i The row index (0-1).
   * @param {Vector2} col The vector holding the values.
   */
  setColumn (i, col) {
    const te = this.elements;
    const to = i * 2;
    te[ to + 0 ] = col.x;
    te[ to + 1 ] = col.y;
    return this;
  }

  /**
   * Sets the columns of the matrix.
   * @param {Vector2} c0 The first column.
   * @param {Vector2} c1 The second column.
   */
  setColumns (c0, c1) {
    const te = this.elements;
    te[ 0 ] = c0.x; te[ 1 ] = c0.y;
    te[ 2 ] = c1.x; te[ 3 ] = c1.y;
    return this;
  }

  /**
   * Sets the rows of the matrix.
   * @param {Vector2} r0 The first row.
   * @param {Vector2} r1 The second row.
   */
  setRows (r0, r1) {
    const te = this.elements;
    te[ 0 ] = r0.x; te[ 1 ] = r1.x;
    te[ 2 ] = r0.y; te[ 3 ] = r1.y;
    return this;
  }

  /**
   * Gets the row at the specified index of the matrix.
   * @param {number} i The index of the row (0-1).
   * @returns {Vector2} The vector with the row values.
   */
  getRow (i) {
    const te = this.elements;
    switch (i) {
      case 0:
        return new Vector2(te[0], te[2]);
      case 1:
        return new Vector2(te[1], te[3]);
      default:
        throw new Error('No row defined at ' + i + '.');
    }
  }

  /**
   * Gets the column at the specified index of the matrix.
   * @param {number} i The index of the column (0-1).
   * @returns {Vector2} The vector with the column values.
   */
  getColumn (i) {
    const te = this.elements;
    switch (i) {
      case 0:
        return new Vector2(te[0], te[1]);
      case 1:
        return new Vector2(te[2], te[3]);
      default:
        throw new Error('No column defined at ' + i + '.');
    }
  }

  /**
   * Sets the matrix as the identity matrix.
   */
  identity () {
    this.set(
      1, 0,
      0, 1
    );
    return this;
  }

  /**
   * Clones the matrix.
   * @returns {Matrix2} A new matrix with the same element values.
   */
  clone () {
    return new this.constructor().fromArray(this.elements);
  }

  /**
   * Copies the element values of the given matrix.
   * @param {Matrix2} m The given matrix.
   */
  copy (m) {
    const te = this.elements;
    const me = m.elements;
    te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ];
    te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
    return this;
  }

  /**
   * Right-multiplies the given matrix with this one (this * m).
   * @param {Matrix2} m The given matrix.
   */
  multiply (m) {
    return this.multiplyMatrices(this, m);
  }

  /**
   * Left-multiplies the given matrix with this one (m * this).
   * @param {Matrix2} m The given matrix.
   */
  premultiply (m) {
    return this.multiplyMatrices(m, this);
  }

  /**
   * Multiplies two 2x2 matrices (A * B).
   * @param {Matrix2} a The A matrix.
   * @param {Matrix2} b The B matrix.
   */
  multiplyMatrices (a, b) {
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
  }

  /**
   * Scales a matrix.
   * @param {number} s The number to scale by.
   */
  multiplyScalar (s) {
    const te = this.elements;
    te[ 0 ] *= s; te[ 2 ] *= s;
    te[ 1 ] *= s; te[ 3 ] *= s;
    return this;
  }

  /**
   * Computes the determinant of the matrix.
   * @returns {number} The determinant.
   */
  determinant () {
    const te = this.elements;
    const a = te[ 0 ];
    const b = te[ 2 ];
    const c = te[ 1 ];
    const d = te[ 3 ];
    return a * d - b * c;
  }

  /**
   * Computes the inverse of the given matrix and assigns it to this matrix.
   * @param {Matrix2} matrix The given matrix.
   * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
   */
  getInverse (matrix, throwOnDegenerate) {
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
  }

  /**
   * Inverts this matrix.
   * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
   */
  invert (throwOnDegenerate) {
    return this.getInverse(this, throwOnDegenerate);
  }

  /**
   * Transposes this matrix in-place.
   */
  transpose () {
    const m = this.elements;

    let tmp = m[ 1 ];
    m[ 1 ] = m[ 2 ];
    m[ 2 ] = tmp;
    return this;
  }

  /**
   * Computes the adjugates of this matrix in-place.
   */
  adjugate () {
    return this.getAdjugate(this);
  }

  /**
   * Computes the adjugate of the given matrix and assigns it to this matrix.
   * @param {Matrix2} matrix The given matrix.
   */
  getAdjugate (matrix) {
    const me = matrix.elements;
    const a = me[ 0 ];
    const c = me[ 1 ];
    const b = me[ 2 ];
    const d = me[ 3 ];

    const te = this.elements;
    te[0] = d;
    te[1] = -c;
    te[2] = -b;
    te[3] = a;
    return this;
  }

  /**
   * Computes the trace of this matrix.
   * @returns {number} The matrix trace.
   */
  trace () {
    const te = this.elements();
    return te[0] + te[3];
  }

  /**
   * Compares the equality with a given matrix (strict).
   * @param {Matrix2} matrix The given matrix.
   */
  equals (matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 4; i++) {
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
    for (let i = 0; i < 4; i++) {
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

    return array;
  }

  /**
   * Computes the outer product of two vectors (a*b^T).
   * @param {Vector2} a The first vector.
   * @param {Vector2} b The second vector.
   * @param {number} scalar The number to scale the matrix by (defaults to 1).
   */
  getOuterProduct (a, b, scalar) {
    const alpha = (scalar === undefined ? 1 : scalar);
    const n11 = alpha * a.x * b.x;
    const n12 = alpha * a.x * b.y;
    const n21 = alpha * a.y * b.x;
    const n22 = alpha * a.y * b.y;
    return this.set(n11, n12, n21, n22);
  }

  /**
   * Adds the outer product of two vectors (a*b^T) to this matrix.
   * @param {Vector2} a The first vector.
   * @param {Vector2} b The second vector.
   * @param {number} scalar The number to scale the matrix by (defaults to 1).
   */
  addOuterProduct (a, b, scalar) {
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
  }

  /**
   * Adds 2 matrices together and optionally scales the result.
   * @param {Matrix2} a The first matrix.
   * @param {Matrix2} b The second matrix.
   * @param {number} scalar The number to scale the result by.
   */
  addMatrices (a, b, scalar) {
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
  }

  /**
   * Adds a given matrix to this matrix.
   * @param {Matrix2} m The given matrix.
   */
  add (m) {
    return this.addMatrices(this, m);
  }

  /**
   * Pretty prints this matrix.
   */
  prettyPrint () {
    return Utils.printMatrix2(this);
  }

  /**
   * Finds the largest element of the matrix.
   */
  findLargestAbsElement () {
    return MathHelpers.findLargestAbsElement(this);
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
   * Computes the QR decomposition.
   * @param {boolean} inPlace Replaces this matrix with the R matrix.
   */
  decomposeQR (inPlace = false) {
    return MathHelpers.qrDecomposition(this, inPlace);
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
   * @param {Matrix2} P The permutation matrix.
   * @param {Vector2} b The result row vector.
   * @param {Vector2} X The solution vector.
   */
  solveLU (P, b, X) {
    return MathHelpers.luSolve(this, P, b, X);
  }

  /**
   * Gets the rank of this matrix.
   * @param {number} TOL The numerical tolerance (defaults to 1e-14).
   */
  getRank (TOL = 1e-14) {
    return MathHelpers.getRank(this, TOL);
  }

  /**
   * Gets the eigenvalues of the matrix.
   * @returns {Object} A1 and A2 are real coefficients, B1 and B2 are complex coefficients.
   */
  getEigenvalues () {
    // Bad way of doing this!
    // TODO: Find better way other than roots of characteristic polynomial
    const je = this.elements;
    const a = je[ 0 ];
    const b = je[ 2 ];
    const c = je[ 1 ];
    const d = je[ 3 ];

    const A = 1;
    const B = -(a + d);
    const C = -b * c;
    return PolyRoots.getQuadraticRoots(A, B, C);
  }

  /**
   * Creates a Householder matrix from this vector.
   * @param {Vector2} v The vector.
   * @param {number} beta Optional. Scales the outer product, defaults to 2/(v *v).
   */
  multiplyHouseholderMatrix (v, beta) {
    if (!v.isVector2) {
      throw new Error('multiplyHouseholderMatrix(): expected a Vector2.');
    }
    const BETA = beta || 2 / (v.dot(v));
    const w = v.multiplyMatrix3(this);
    return this.addOuterProduct(w, v, -BETA);
  }

  /**
   * Converts the matrix to Hessenberg form.
   */
  convertToHessenberg () {
    // 2x2 matrices are Hessenberg
    return this;
  }

  /**
   * Takes a QR step in Hessenberg form.
   */
  takeHessenbergQRStep () {
    return MathHelpers.hessenbergQRStep(this);
  }
}

Object.defineProperties(Matrix2.prototype, {
  /**
   * @memberOf Matrix2#isMatrix2
   */
  isMatrix2: {
    value: true,
    writable: false
  },
  /**
   * @memberOf Matrix2#dimension
   */
  dimension: {
    value: 2,
    writable: false
  },
  /**
   * @memberOf Matrix2#E0
   */
  E0: {
    value: Object.freeze(new Vector2(1, 0)),
    writable: false
  },
  /**
   * @memberOf Matrix2#E1
   */
  E1: {
    value: Object.freeze(new Vector2(0, 1)),
    writable: false
  }
});

module.exports = Matrix2;
