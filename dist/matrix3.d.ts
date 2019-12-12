import { Matrix } from './interfaces';
import { Vector3 } from './vector3';
import { Complex } from './complex';
/**
 * A 3x3 matrix stored in column-major order.
 * @class Matrix3
 */
export declare class Matrix3 implements Matrix {
    private _elements;
    get elements(): number[];
    constructor();
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
    set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number): this;
    /**
     * Sets a row of the matrix.
     * @param {number} i The row index (0-2).
     * @param {Vector3} row The vector holding the values.
     */
    setRow(i: number, row: Vector3): this;
    /**
     * Sets a column of the matrix.
     * @param {number} i The row index (0-2).
     * @param {Vector3} col The vector holding the values.
     */
    setColumn(i: number, col: Vector3): this;
    /**
     * Sets the columns of the matrix.
     * @param {Vector3} c0 The first column.
     * @param {Vector3} c1 The second column.
     * @param {Vector3} c2 The third column.
     */
    setColumns(c0: Vector3, c1: Vector3, c2: Vector3): this;
    /**
     * Sets the rows of the matrix.
     * @param {Vector3} r0 The first row.
     * @param {Vector3} r1 The second row.
     * @param {Vector3} r2 The third row.
     */
    setRows(r0: Vector3, r1: Vector3, r2: Vector3): this;
    /**
     * Swaps rows in-place in the matrix. Zero is the first row.
     */
    swapRows(i: number, j: number): this;
    /**
     * Swaps columns in-place in the matrix. Zero is the first column.
     */
    swapColumns(i: number, j: number): this;
    /**
     * Sets the matrix as the identity matrix.
     */
    identity(): this;
    /**
     * Sets this matrix as skew-symmetric based on a given vector.
     * @param {Vector3} v The given vector.
     */
    setSkewSymmetric(v: Vector3): this;
    /**
     * Clones the matrix.
     * @returns {Matrix3} A new matrix with the same element values.
     */
    clone(): this;
    /**
     * Copies the element values of the given matrix.
     * @param {Matrix3} m The given matrix.
     */
    copy(m: this): this;
    /**
     * Adds 2 matrices together and optionally scales the result: a + alpha * b.
     * @param {Matrix3} a The first matrix.
     * @param {Matrix3} b The second matrix.
     * @param {number} scalar The number to scale the result by.
     */
    addMatrices(a: this, b: this, scalar?: number): this;
    /**
     * Adds a given matrix to this matrix.
     * @param {Matrix3} m The given matrix.
     */
    add(m: this): this;
    /**
     * Right-multiplies the given matrix with this one (this * m).
     * @param {Matrix3} m The given matrix.
     */
    multiply(m: this): this;
    /**
     * Left-multiplies the given matrix with this one (m * this).
     * @param {Matrix3} m The given matrix.
     */
    premultiply(m: this): this;
    /**
     * Multiplies two 3x3 matrices (A * B).
     * @param {Matrix3} a The A matrix.
     * @param {Matrix3} b The B matrix.
     */
    multiplyMatrices(a: this, b: this): this;
    /**
     * Scales a matrix.
     * @param {number} s The number to scale by.
     */
    multiplyScalar(s: number): this;
    /**
     * Computes the determinant of the matrix.
     * @returns {number} The determinant.
     */
    determinant(): number;
    /**
     * Inverts this matrix.
     * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
     */
    invert(throwOnDegenerate?: boolean): this;
    /**
     * Computes the adjugates of this matrix in-place.
     */
    adjugate(): this;
    /**
     * Computes the adjugate of the given matrix and assigns it to this matrix.
     * @param {Matrix3} matrix The given matrix.
     */
    getAdjugate(matrix: this): this;
    /**
     * Computes the inverse of the given matrix and assigns it to this matrix.
     * @param {Matrix3} matrix The given matrix.
     * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
     */
    getInverse(matrix: this, throwOnDegenerate: boolean, singularTol?: number): this;
    /**
     * Transposes this matrix in-place.
     */
    transpose(): this;
    /**
     * Computes the trace of this matrix.
     * @returns {number} The matrix trace.
     */
    trace(): number;
    /**
     * Compares the equality with a given matrix (strict).
     * @param {Matrix3} matrix The given matrix.
     */
    equals(matrix: this): boolean;
    /**
     * Loads values from an array into a matrix.
     * @param {number[]} array The array to populate the matrix from.
     * @param {number} offset The numeric array offset.
     */
    fromArray(array: number[], offset?: number): this;
    /**
     * Loads values into an array into a matrix.
     * @param {number[]} array The array to populate the matrix values into.
     * @param {number} offset The numeric array offset.
     */
    toArray(array?: number[], offset?: number): number[];
    /**
     * Gets the eigenvalues of the matrix.
     * @returns {Object} A0 is the real eigenvalue, A1 and A2 are real coefficients, B1 and B2 are complex coefficients.
     */
    getEigenvalues(): Complex[];
    /**
     * Computes the outer product of two vectors (a*b^T).
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @param {number} scalar The number to scale the matrix by (defaults to 1).
     */
    getOuterProduct(a: Vector3, b: Vector3, scalar: number): this;
    /**
     * Adds the outer product of two vectors (a*b^T) to this matrix.
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @param {number} scalar The number to scale the matrix by (defaults to 1).
     */
    addOuterProduct(a: Vector3, b: Vector3, scalar: number): this;
    /**
     * Gets the row at the specified index of the matrix.
     * @param {number} i The index of the row (0-2).
     * @returns {Vector3} The vector with the row values.
     */
    getRow(i: number): Vector3;
    /**
     * Gets the column at the specified index of the matrix.
     * @param {number} i The index of the column (0-2).
     * @returns {Vector3} The vector with the column values.
     */
    getColumn(i: number): Vector3;
    /**
     * Pretty prints this matrix.
     */
    prettyPrint(): string;
}
