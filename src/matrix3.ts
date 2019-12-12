'use strict';

/*
 * Base code from THREE.js authors below.
 * Additions by Tim Bright
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */
import _Math from './core';
import { Matrix } from './interfaces';
import { Vector3 } from './vector3';
import { formatPrintNumber } from './utils';
import { getCubicRoots } from 'minimatrix-polyroots';
import { Complex } from './complex';

/**
 * A 3x3 matrix stored in column-major order.
 * @class Matrix3
 */
export class Matrix3 implements Matrix {
  private _elements: number[];

  public get elements (): number[] { return this._elements.slice(); }

  constructor () {
    this._elements = [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ];
  }

  /**
   * Sets the matrix values in a row-major ordered fashion.
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
  set (n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number): this {
    const te = this._elements;
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
  setRow (i: number, row: Vector3): this {
    const te = this._elements;
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
  setColumn (i: number, col: Vector3): this {
    const te = this._elements;
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
  setColumns (c0: Vector3, c1: Vector3, c2: Vector3): this {
    const te = this._elements;
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
  setRows (r0: Vector3, r1: Vector3, r2: Vector3): this {
    const te = this._elements;
    te[ 0 ] = r0.x; te[ 1 ] = r1.x; te[ 2 ] = r2.x;
    te[ 3 ] = r0.y; te[ 4 ] = r1.y; te[ 5 ] = r2.y;
    te[ 6 ] = r0.z; te[ 7 ] = r1.z; te[ 8 ] = r2.z;
    return this;
  }

  /**
   * Swaps rows in-place in the matrix. Zero is the first row.
   */
  swapRows (i: number, j: number): this {
    const A = this._elements;
    const n = 3;
    if (i > n - 1 || j > n - 1) {
      throw new Error(`swapRows(): row index out of bounds.`);
    }
    if (i !== j) {
      for (let k = 0; k < n; ++k) {
        const offset = k * n;
        const tmp = A[i + offset];
        A[i + offset] = A[j + offset];
        A[j + offset] = tmp;
      }
    }
    return this;
  }

  /**
   * Swaps columns in-place in the matrix. Zero is the first column.
   */
  swapColumns (i: number, j: number): this {
    const A = this._elements;
    const n = 3;
    if (i > n - 1 || j > n - 1) {
      throw new Error(`swapColumns(): column index out of bounds.`);
    }
    if (i !== j) {
      const iOffset = i * n;
      const jOffset = j * n;
      for (let k = 0; k < n; ++k) {
        const tmp = A[iOffset + k];
        A[iOffset + k] = A[jOffset + k];
        A[jOffset + k] = tmp;
      }
    }
    return this;
  }

  /**
   * Sets the matrix as the identity matrix.
   */
  identity (): this {
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
  setSkewSymmetric (v: Vector3): this {
    const te = this._elements;
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
  clone (): this {
    return new Matrix3().fromArray(this._elements) as this;
  }

  /**
   * Copies the element values of the given matrix.
   * @param {Matrix3} m The given matrix.
   */
  copy (m: this): this {
    const te = this._elements;
    const me = m._elements;
    te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
    te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
    te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];
    return this;
  }

  /**
   * Adds 2 matrices together and optionally scales the result: a + alpha * b.
   * @param {Matrix3} a The first matrix.
   * @param {Matrix3} b The second matrix.
   * @param {number} scalar The number to scale the result by.
   */
  addMatrices (a: this, b: this, scalar: number = 1): this {
    const alpha = scalar;
    const ae = a._elements;
    const be = b._elements;
    const te = this._elements;

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
  add (m: this): this {
    return this.addMatrices(this, m, 1);
  }

  /**
   * Right-multiplies the given matrix with this one (this * m).
   * @param {Matrix3} m The given matrix.
   */
  multiply (m: this): this {
    return this.multiplyMatrices(this, m);
  }

  /**
   * Left-multiplies the given matrix with this one (m * this).
   * @param {Matrix3} m The given matrix.
   */
  premultiply (m: this): this {
    return this.multiplyMatrices(m, this);
  }

  /**
   * Multiplies two 3x3 matrices (A * B).
   * @param {Matrix3} a The A matrix.
   * @param {Matrix3} b The B matrix.
   */
  multiplyMatrices (a: this, b: this): this {
    const ae = a._elements;
    const be = b._elements;
    const te = this._elements;

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
  multiplyScalar (s: number): this {
    const te = this._elements;
    te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
    te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
    te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;
    return this;
  }

  /**
   * Computes the determinant of the matrix.
   * @returns {number} The determinant.
   */
  determinant (): number {
    const te = this._elements;
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
  invert (throwOnDegenerate: boolean = false): this {
    return this.getInverse(this, throwOnDegenerate);
  }

  /**
   * Computes the adjugates of this matrix in-place.
   */
  adjugate (): this {
    return this.getAdjugate(this);
  }

  /**
   * Computes the adjugate of the given matrix and assigns it to this matrix.
   * @param {Matrix3} matrix The given matrix.
   */
  getAdjugate (matrix: this): this {
    const me = matrix._elements;
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

    const te = this._elements;
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
  getInverse (matrix: this, throwOnDegenerate: boolean, singularTol: number = 1e-14): this {
    const det = matrix.determinant();
    if (_Math.abs(det) <= singularTol) {
      const msg = `Matrix3.getInverse(): matrix is degenerate.`;
      if (throwOnDegenerate) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }      
    }
    return matrix.adjugate().multiplyScalar(1.0 / det);
  }

  /**
   * Transposes this matrix in-place.
   */
  transpose (): this {
    let tmp: number;
    const m = this._elements;
    tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
    tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
    tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;
    return this;
  }

  /**
   * Computes the trace of this matrix.
   * @returns {number} The matrix trace.
   */
  trace (): number {
    const me = this._elements;
    const n11 = me[ 0 ];
    const n22 = me[ 4 ];
    const n33 = me[ 8 ];
    return n11 + n22 + n33;
  }

  /**
   * Compares the equality with a given matrix (strict).
   * @param {Matrix3} matrix The given matrix.
   */
  equals (matrix: this): boolean {
    const te = this._elements;
    const me = matrix._elements;
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
  fromArray (array: number[], offset: number = 0): this {
    for (let i = 0; i < 9; i++) {
      this._elements[ i ] = array[i + offset];
    }
    return this;
  }

  /**
   * Loads values into an array into a matrix.
   * @param {number[]} array The array to populate the matrix values into.
   * @param {number} offset The numeric array offset.
   */
  toArray (array: number[] = [], offset: number = 0): number[] {
    const te = this._elements;

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
  getEigenvalues (): Complex[] {
    // Bad way of doing this!
    // TODO: Find better way
    const je = this._elements;
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

    const roots = getCubicRoots(A, B, C, D);
    return roots.map((v: { real: number; imag: number}): Complex => new Complex(v.real, v.imag));
  }

  /**
   * Computes the outer product of two vectors (a*b^T).
   * @param {Vector3} a The first vector.
   * @param {Vector3} b The second vector.
   * @param {number} scalar The number to scale the matrix by (defaults to 1).
   */
  getOuterProduct (a: Vector3, b: Vector3, scalar: number): this {
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
  addOuterProduct (a: Vector3, b: Vector3, scalar: number): this {
    // computes [this + alpha * (ab^T)]
    const te = this._elements;
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
   * Gets the row at the specified index of the matrix.
   * @param {number} i The index of the row (0-2).
   * @returns {Vector3} The vector with the row values.
   */
  getRow (i: number): Vector3 {
    const te = this._elements;
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
  getColumn (i: number): Vector3 {
    const te = this._elements;
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
   * Pretty prints this matrix.
   */
  prettyPrint (): string {
    const tStr = this._elements.map(formatPrintNumber);
    const matrixString = `
    +-                         -+
    | ${tStr[0]}  ${tStr[3]}  ${tStr[6]} |
    | ${tStr[1]}  ${tStr[4]}  ${tStr[7]} |
    | ${tStr[2]}  ${tStr[5]}  ${tStr[8]} |
    +-                         -+`;
    return matrixString;
  }
}

Object.defineProperties(Matrix3.prototype, {
  /**
   * @property {boolean} isMatrix3 Boolean to test if argument is Matrix3.
   * @memberof Matrix3
   */
  isMatrix3: {
    value: true,
    writable: false
  },
  /**
   * @property {number} dimension The dimension of the matrix.
   * @memberof Matrix3
   */
  dimension: {
    value: 3,
    writable: false
  },
  /**
   * @property {Vector3} E0 The first standard basis vector (1, 0, 0).
   * @memberof Matrix3
   */
  E0: {
    value: Object.freeze(new Vector3(1, 0, 0)),
    writable: false
  },
  /**
   * @property {Vector3} E1 The first standard basis vector (0, 1, 0).
   * @memberof Matrix3
   */
  E1: {
    value: Object.freeze(new Vector3(0, 1, 0)),
    writable: false
  },
  /**
   * @property {Vector3} E2 The first standard basis vector (0, 0, 1).
   * @memberof Matrix3
   */
  E2: {
    value: Object.freeze(new Vector3(0, 0, 1)),
    writable: false
  }
});