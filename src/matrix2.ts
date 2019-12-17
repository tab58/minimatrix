/*
 * Base code from THREE.js authors below.
 * Additions by Tim Bright
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */
import { Vector2 } from './vector2';
import { Matrix } from './interfaces';
import { formatPrintNumber } from './utils';

/**
 * A 2x2 matrix stored in column-major order.
 * @class Matrix2
 */
export class Matrix2 implements Matrix {
  private _elements: number[];
  private _tempElements: number[];

  public readonly rowDimension: number = 2;
  public readonly colDimension: number = 2;

  public readonly E0 = new Vector2(1, 0);
  public readonly E1 = new Vector2(0, 1);
  
  constructor () {
    const a = [
      1, 0,
      0, 1
    ];
    this._elements = a;
    this._tempElements = a.slice();
  }

  set (i: number, j: number, value: number): this {
    const n = this.colDimension;
    this._elements[i + j * n] = value;
    return this;
  }

  get (i: number, j: number): number {
    const n = this.colDimension;
    return this._elements[i + j * n];
  }

  /**
   * Sets the matrix values in a row-major ordered fashion.
   * @param {number} n11 Element a11.
   * @param {number} n12 Element a12.
   * @param {number} n21 Element a21.
   * @param {number} n22 Element a22.
   */
  setElements (n11: number, n12: number, n21: number, n22: number): this {
    const te = this._elements;
    te[ 0 ] = n11; te[ 1 ] = n21;
    te[ 2 ] = n12; te[ 3 ] = n22;
    return this;
  }

  /**
   * Sets a row of the matrix.
   * @param {number} i The row index (0-1).
   * @param {Vector2} row The vector holding the values.
   */
  setRow (i: number, row: Vector2): this {
    const te = this._elements;
    te[ i + 0 ] = row.x;
    te[ i + 2 ] = row.y;
    return this;
  }

  /**
   * Sets a column of the matrix.
   * @param {number} i The row index (0-1).
   * @param {Vector2} col The vector holding the values.
   */
  setColumn (i: number, col: Vector2): this {
    const te = this._elements;
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
  setColumns (c0: Vector2, c1: Vector2): this {
    const te = this._elements;
    te[ 0 ] = c0.x; te[ 1 ] = c0.y;
    te[ 2 ] = c1.x; te[ 3 ] = c1.y;
    return this;
  }

  /**
   * Sets the rows of the matrix.
   * @param {Vector2} r0 The first row.
   * @param {Vector2} r1 The second row.
   */
  setRows (r0: Vector2, r1: Vector2): this {
    const te = this._elements;
    te[ 0 ] = r0.x; te[ 1 ] = r1.x;
    te[ 2 ] = r0.y; te[ 3 ] = r1.y;
    return this;
  }

  /**
   * Gets the row at the specified index of the matrix.
   * @param {number} i The index of the row (0-1).
   * @returns {Vector2} The vector with the row values.
   */
  getRow (i: number): Vector2 {
    const te = this._elements;
    switch (i) {
      case 0:
        return new Vector2(te[0], te[2]);
      case 1:
        return new Vector2(te[1], te[3]);
      default:
        throw new Error('getRow(): no row defined at ' + i + '.');
    }
  }

  /**
   * Gets the column at the specified index of the matrix.
   * @param {number} i The index of the column (0-1).
   * @returns {Vector2} The vector with the column values.
   */
  getColumn (i: number): Vector2 {
    const te = this._elements;
    switch (i) {
      case 0:
        return new Vector2(te[0], te[1]);
      case 1:
        return new Vector2(te[2], te[3]);
      default:
        throw new Error('getColumn(): no column defined at ' + i + '.');
    }
  }

  /**
   * Swaps rows in-place in the matrix. Zero is the first row.
   */
  swapRows (i: number, j: number): this {
    const A = this._elements;
    if (i > 1 || j > 1) {
      throw new Error(`swapRows(): row index out of bounds.`);
    }
    if (i !== j) {
      let tmp = A[1];
      A[1] = A[0];
      A[0] = tmp;
      
      tmp = A[3];
      A[3] = A[2];
      A[2] = tmp;
    }
    return this;
  }

  /**
   * Swaps columns in-place in the matrix. Zero is the first column.
   */
  swapColumns (i: number, j: number): this {
    const A = this._elements;
    if (i > 1 || j > 1) {
      throw new Error(`swapRows(): row index out of bounds.`);
    }
    if (i !== j) {
      let tmp = A[2];
      A[2] = A[0];
      A[0] = tmp;
      
      tmp = A[3];
      A[3] = A[1];
      A[1] = tmp;
    }
    return this;
  }

  /**
   * Sets the matrix as the identity matrix.
   */
  identity (): this {
    this.setElements(
      1, 0,
      0, 1
    );
    return this;
  }

  /**
   * Clones the matrix.
   */
  clone (): this {
    const m = new Matrix2() as this;
    return m.fromArray(this._elements);
  }

  /**
   * Copies the element values of the given matrix.
   * @param {Matrix2} m The given matrix.
   */
  copy (m: this): this {
    const te = this._elements;
    const me = m._elements;
    te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ];
    te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
    return this;
  }

  /**
   * Multiplies a vector by a 2x2 matrix.
   * @param {Vector2} a The vector to transform.
   * @returns {Vector2} This vector.
   */
  transformVector2 (v: Vector2): Vector2 {
    const ae = this._elements;
    const a11 = ae[ 0 ];
    const a12 = ae[ 2 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 3 ];
    const x = v.x;
    const y = v.y;
    const _x = a11 * x + a12 * y;
    const _y = a21 * x + a22 * y;
    return v.set(_x, _y);
  }

  /**
   * Right-multiplies the given matrix with this one (this * m).
   * @param {Matrix2} m The given matrix.
   */
  multiply (m: this): this {
    return this.multiplyMatrices(this, m);
  }

  /**
   * Left-multiplies the given matrix with this one (m * this).
   * @param {Matrix2} m The given matrix.
   */
  premultiply (m: this): this {
    return this.multiplyMatrices(m, this);
  }

  /**
   * Multiplies two 2x2 matrices (A * B).
   * @param {Matrix2} a The A matrix.
   * @param {Matrix2} b The B matrix.
   */
  multiplyMatrices (a: this, b: this): this {
    const ae = a._elements;
    const be = b._elements;
    const te = this._elements;

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
  multiplyScalar (s: number): this {
    const te = this._elements;
    te[ 0 ] *= s; te[ 2 ] *= s;
    te[ 1 ] *= s; te[ 3 ] *= s;
    return this;
  }

  /**
   * Computes the determinant of the matrix.
   * @returns {number} The determinant.
   */
  determinant (): number {
    const te = this._elements;
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
  getInverse (matrix: this, throwOnDegenerate: boolean) {
    const me = matrix._elements;
    const te = this._elements;
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
  invert (throwOnDegenerate: boolean = false): this {
    return this.getInverse(this, throwOnDegenerate);
  }

  /**
   * Transposes this matrix in-place.
   */
  transpose (): this {
    const m = this._elements;
    let tmp = m[ 1 ];
    m[ 1 ] = m[ 2 ];
    m[ 2 ] = tmp;
    return this;
  }

  /**
   * Computes the adjugates of this matrix in-place.
   */
  adjugate (): this {
    return this.getAdjugate(this);
  }

  /**
   * Computes the adjugate of the given matrix and assigns it to this matrix.
   * @param {Matrix2} matrix The given matrix.
   */
  getAdjugate (matrix: this): this {
    const me = matrix._elements;
    const a = me[ 0 ];
    const c = me[ 1 ];
    const b = me[ 2 ];
    const d = me[ 3 ];

    const te = this._elements;
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
  trace (): number {
    const te = this._elements;
    return te[0] + te[3];
  }

  /**
   * Compares the equality with a given matrix (strict).
   * @param {Matrix2} matrix The given matrix.
   */
  equals (matrix: this): boolean {
    const te = this._elements;
    const me = matrix._elements;
    for (let i = 0; i < 4; i++) {
      if (te[i] !== me[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Loads values from an array into a matrix.
   * @param array The array to populate the matrix from.
   * @param offset The numeric array offset.
   */
  fromArray (array: number[], offset = 0): this {
    for (let i = 0; i < 4; i++) {
      this._elements[i] = array[i + offset];
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
    return array;
  }

  /**
   * Computes the outer product of two vectors (a*b^T).
   * @param {Vector2} a The first vector.
   * @param {Vector2} b The second vector.
   * @param {number} scalar The number to scale the matrix by (defaults to 1).
   */
  getOuterProduct (a: Vector2, b: Vector2, scalar: number): this {
    const alpha = (scalar === undefined ? 1 : scalar);
    const n11 = alpha * a.x * b.x;
    const n12 = alpha * a.x * b.y;
    const n21 = alpha * a.y * b.x;
    const n22 = alpha * a.y * b.y;
    return this.setElements(n11, n12, n21, n22);
  }

  /**
   * Adds the outer product of two vectors (a*b^T) to this matrix.
   * @param {Vector2} a The first vector.
   * @param {Vector2} b The second vector.
   * @param {number} scalar The number to scale the matrix by (defaults to 1).
   */
  addOuterProduct (a: Vector2, b: Vector2, scalar: number): this {
    const te = this._elements;
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
  addMatrices (a: this, b: this, scalar: number = 1): this {
    const alpha = scalar;
    const ae = a._elements;
    const be = b._elements;
    const te = this._elements;

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
  add (m: this): this {
    return this.addMatrices(this, m);
  }

  /**
   * Pretty prints this matrix.
   */
  prettyPrint (): string {
    const tStr = this._elements.map(formatPrintNumber);
    const matrixString = `
    +-                -+
    | ${tStr[0]}  ${tStr[2]} |
    | ${tStr[1]}  ${tStr[3]} |
    +-                -+`;
    return matrixString;
  }

  applyFunction (fn: (elements: number[]) => void): void {
    const ee = this._elements;
    const te = this._tempElements;
    const n = ee.length;
    for (let i = 0; i < n; ++i) { te[i] = ee[i]; }
    fn.call(null, te);
    for (let i = 0; i < n; ++i) { ee[i] = te[i]; }
  }
}