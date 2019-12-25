import _Math from './core';
import { Vector } from './vector';

/**
 * A dense matrix stored in column-major order.
 * Functions as a collection of fallback implementations for common operations; not meant to be optimized.
 * Classes should override these behaviors with specific ones.
 */
export class Matrix {
  protected _elements: number[];
  protected _tempElements: number[];

  public readonly rows: number;
  public readonly columns: number;

  constructor (rows: number, columns: number) {
    const a: number[] = [];
    for (let i = 0; i < rows * columns; ++i) { a[i] = 0; }

    this._elements = a;
    this._tempElements = a.slice();
    this.rows = rows;
    this.columns = columns;
  }

  set (i: number, j: number, value: number): this {
    const n = this.rows;
    this._elements[i + j * n] = value;
    return this;
  }

  get (i: number, j: number): number {
    const n = this.rows;
    return this._elements[i + j * n];
  }

  /**
   * Sets elements of the matrix.
   * @param elements The element values in row-major order (n11, n12, n13, ...).
   */
  setElements (...elements: number[]): this {
    const m = this.rows;
    const n = this.columns;
    const te = this._elements;
    if (elements.length === te.length) {
      for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
          te[i + j * m] = elements[j + i * m];
        }
      }
      return this;
    } else {
      throw new Error(`Matrix.setElements(): number of elements does not agree with matrix dimensions.`);
    }
  }

  /**
   * Sets a row of the matrix.
   * @param {number} i The row index.
   * @param {Vector} row The vector holding the values.
   */
  setRow (i: number, row: Vector): this {
    if (row.dimension === this.columns) {
      const te = this._elements;
      const n = this.rows;
      for (let j = 0; j < row.dimension; ++j) {
        te[i + j * n] = row.get(j);
      }
      return this;  
    } else {
      throw new Error(`Matrix.setRow(): vector and matrix dimensions do not match.`);
    }  
  }

  /**
   * Sets a column of the matrix.
   * @param {number} i The column index.
   * @param {Vector} col The vector holding the values.
   */
  setColumn (i: number, col: Vector): this {
    if (col.dimension === this.rows) {
      const te = this._elements;
      const n = this.rows;
      const offset = i * n;
      for (let j = 0; j < n; ++j) {
        te[offset + j] = col.get(j);
      }
      return this;  
    } else {
      throw new Error(`Matrix.setColumn(): vector and matrix dimensions do not match.`);
    }
  }

  /**
   * Swaps rows in-place in the matrix. Zero is the first row.
   */
  swapRows (i: number, j: number): this {
    const A = this._elements;
    const n = this.rows;
    if (i > n - 1 || j > n - 1) {
      throw new Error(`Matrix.swapRows(): row index out of bounds.`);
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
    const m = this.columns;
    if (i > m - 1 || j > m - 1) {
      throw new Error(`Matrix.swapColumns(): column index out of bounds.`);
    }
    if (i !== j) {
      const n = this.rows;
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
   * Clones the matrix.
   * @returns {Matrix} A new matrix with the same element values.
   */
  clone (): this {
    return new Matrix(this.rows, this.columns).fromArray(this._elements) as this;
  }

  /**
   * Copies the element values of the given matrix.
   * @param {Matrix} m The given matrix.
   */
  copy (m: this): this {
    if (m.rows === this.rows && m.columns === this.columns) {
      const te = this._elements;
      const me = m._elements;
      const n = this._elements.length;
      for (let i = 0; i < n; ++i) {
        te[i] = me[i];
      }
      return this;
    } else {
      throw new Error(`Matrix.copy(): matrix dimensions do not agree.`);
    }  
  }

  /**
   * Adds 2 matrices together and optionally scales the result: a + alpha * b.
   * @param {Matrix} a The first matrix.
   * @param {Matrix} b The second matrix.
   * @param {number} scalar The number to scale the result by.
   */
  addMatrices (a: this, b: this, scalar = 1): this {
    if (a.rows === this.rows && a.columns === this.columns &&
      b.rows === this.rows && b.columns === this.columns) {
      const alpha = scalar;
      const ae = a._elements;
      const be = b._elements;
      const te = this._elements;
      const n = te.length;
      for (let i = 0; i < n; ++i) {
        te[i] = ae[i] + (be[i] * alpha);
      }
      return this;
    } else {
      throw new Error(`Matrix.addMatrices(): matrix dimensions do not agree.`);
    }
  }

  /**
   * Adds a given matrix to this matrix.
   * @param {Matrix3} m The given matrix.
   */
  add (m: this): this {
    return this.addMatrices(this, m, 1);
  }

  /**
   * Left-multiplies a vector by a matrix (result is x^T*A).
   * @param {Vector} a The vector to transform.
   * @returns {Vector} The original vector, transformed.
   */
  transformRowVector (a: Vector): Vector {
    const m = this.rows;
    const n = this.columns;
    if (a.dimension === m) {
      const ae = this._elements;
      const aa = [];
      for (let j = 0; j < n; ++j) {
        const colOffset = j * m;
        let sum = 0;
        for (let k = 0; k < m; ++k) {
          sum += ae[k + colOffset] * a.get(k);
        }
        aa[j] = sum;
      }
      return new Vector(n).fromArray(aa);
    } else {
      throw new Error(`Matrix.transformRowVector(): matrix and vector dimensions do not agree.`);
    }
  }

  /**
   * Right-multiplies a vector by a matrix (result is Ax).
   * @param {Vector} a The vector to transform.
   * @returns {Vector} The original vector, transformed.
   */
  transformVector (a: Vector): Vector {
    const m = this.rows;
    const n = this.columns;
    if (a.dimension === n) {
      const ae = this._elements;
      const aa = [];
      for (let i = 0; i < m; ++i) {
        let sum = 0;
        for (let k = 0; k < n; ++k) {
          sum += ae[i + k * m] * a.get(k);
        }
        aa[i] = sum;
      }
      return new Vector(m).fromArray(aa);
    } else {
      throw new Error(`Matrix.transformVector(): matrix and vector dimensions do not agree.`);
    }
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
    const m = this.rows;
    const n = this.columns;
    if (a.columns === b.rows && m === a.rows && n === b.columns) {
      const r = a.columns;
      const ae = a._elements;
      const be = b._elements;
      const te = this._elements;
      for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++i) {
          let sum = 0;
          for (let k = 0; k < r; ++i) {
            sum += ae[i + k * r] * be[k + j * r];
          }
          te[i + j * m] = sum;
        }
      }
      return this;
    } else {
      throw new Error(`Matrix.multiplyMatrices(): matrix dimensions do not agree.`);
    }
  }

  /**
   * Scales a matrix.
   * @param {number} s The number to scale by.
   */
  multiplyScalar (s: number): this {
    const te = this._elements;
    const n = this._elements.length;
    for (let i = 0; i < n; ++i) {
      te[i] *= s;
    }
    return this;
  }

  /**
   * Loads values from an array into a matrix.
   * @param {number[]} array The array to populate the matrix from.
   * @param {number} offset The numeric array offset.
   */
  fromArray (array: number[], offset = 0): this {
    const elemLength = this._elements.length;
    if (array.length >= offset + elemLength) {
      for (let i = 0; i < elemLength; i++) {
        this._elements[ i ] = array[i + offset];
      }
      return this;
    } else {
      throw new Error(`Matrix.fromArray(): array and matrix dimensions do not agree.`);
    }  
  }

  /**
   * Loads values into an array into a matrix.
   * @param {number[]} array The array to populate the matrix values into.
   * @param {number} offset The numeric array offset.
   */
  toArray (array?: number[], offset = 0): number[] {
    const te = this._elements;
    if (array === undefined) {
      return this._elements.slice();
    } else {
      const n = te.length;
      for (let i = 0; i < n; ++i) {
        array[offset + i] = te[i];
      }
      return array;
    }
  }

  /**
   * Computes the outer product of two vectors (a*b^T).
   * @param {Vector} a The first vector.
   * @param {Vector} b The second vector.
   * @param {number} scalar The number to scale the matrix by (defaults to 1).
   */
  setOuterProduct (a: Vector, b: Vector, scalar = 1): this {
    // computes alpha * (ab^T)
    const m = this.rows;
    const n = this.columns;
    if (a.dimension === n && b.dimension === m) {
      const te = this._elements;
      const alpha = scalar;
      for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
          te[i + j * m] = alpha * a.get(i) * b.get(j);
        }
      }
      return this;
    } else {
      throw new Error(`Matrix.setOuterProduct(): matrix and vector dimensions do not agree.`);
    }
  }

  /**
   * Adds the outer product of two vectors alpha*(a*b^T) to this matrix.
   * @param {Vector3} a The first vector.
   * @param {Vector3} b The second vector.
   * @param {number} scalar The number to scale the matrix by (defaults to 1).
   */
  addOuterProduct (a: Vector, b: Vector, scalar = 1): this {
    // computes [this + alpha * (ab^T)]
    const m = this.rows;
    const n = this.columns;
    if (a.dimension === n && b.dimension === m) {
      const te = this._elements;
      const alpha = scalar;
      for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
          te[i + j * m] += alpha * a.get(i) * b.get(j);
        }
      }
      return this;
    } else {
      throw new Error(`Matrix.addOuterProduct(): matrix and vector dimensions do not agree.`);
    }
  }

  /**
   * Gets the row at the specified index of the matrix.
   * @param {number} i The index of the row (0-2).
   * @returns {Vector3} The vector with the row values.
   */
  getRow (i: number): Vector {
    const te = this._elements;
    const m = this.rows;
    if (i < m && i >= 0 && i === _Math.floor(i)) {
      const row = [];
      const n = this.columns;
      for (let j = 0; j < n; ++j) {
        row[i] = te[i + j * m];
      }
      return new Vector(n).setComponents(row);
    } else {
      throw new Error(`Matrix.getRow(): row index is out of bounds.`);
    }
  }

  /**
   * Gets the column at the specified index of the matrix.
   * @param {number} i The index of the column (0-2).
   * @returns {Vector3} The vector with the column values.
   */
  getColumn (i: number): Vector {
    const te = this._elements;
    const m = this.rows;
    const n = this.columns;
    if (i < n && i >= 0 && i === _Math.floor(i)) {
      const col = [];
      for (let j = 0; j < n; ++j) {
        col[i] = te[j + i * m];
      }
      return new Vector(m).setComponents(col);
    } else {
      throw new Error(`Matrix.getRow(): row index is out of bounds.`);
    }
  }

  applyFunction (fn: (elements: number[], rowDim: number, colDim: number) => void): void {
    const ee = this._elements;
    const te = this._tempElements;
    const n = ee.length;
    const r = this.rows;
    const c = this.columns;

    for (let i = 0; i < n; ++i) { te[i] = ee[i]; }
    fn.call(null, te, r, c);
    for (let i = 0; i < n; ++i) { ee[i] = te[i]; }
  }
}