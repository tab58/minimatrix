import { Vector2 } from './vector2';
import { Matrix } from './interfaces';
/**
 * A 2x2 matrix stored in column-major order.
 * @class Matrix2
 */
export declare class Matrix2 implements Matrix {
    private _elements;
    private _tempElements;
    readonly rowDimension: number;
    readonly colDimension: number;
    readonly E0: Vector2;
    readonly E1: Vector2;
    constructor();
    set(i: number, j: number, value: number): this;
    get(i: number, j: number): number;
    /**
     * Sets the matrix values in a row-major ordered fashion.
     * @param {number} n11 Element a11.
     * @param {number} n12 Element a12.
     * @param {number} n21 Element a21.
     * @param {number} n22 Element a22.
     */
    setElements(n11: number, n12: number, n21: number, n22: number): this;
    /**
     * Sets a row of the matrix.
     * @param {number} i The row index (0-1).
     * @param {Vector2} row The vector holding the values.
     */
    setRow(i: number, row: Vector2): this;
    /**
     * Sets a column of the matrix.
     * @param {number} i The row index (0-1).
     * @param {Vector2} col The vector holding the values.
     */
    setColumn(i: number, col: Vector2): this;
    /**
     * Sets the columns of the matrix.
     * @param {Vector2} c0 The first column.
     * @param {Vector2} c1 The second column.
     */
    setColumns(c0: Vector2, c1: Vector2): this;
    /**
     * Sets the rows of the matrix.
     * @param {Vector2} r0 The first row.
     * @param {Vector2} r1 The second row.
     */
    setRows(r0: Vector2, r1: Vector2): this;
    /**
     * Gets the row at the specified index of the matrix.
     * @param {number} i The index of the row (0-1).
     * @returns {Vector2} The vector with the row values.
     */
    getRow(i: number): Vector2;
    /**
     * Gets the column at the specified index of the matrix.
     * @param {number} i The index of the column (0-1).
     * @returns {Vector2} The vector with the column values.
     */
    getColumn(i: number): Vector2;
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
     * Clones the matrix.
     */
    clone(): this;
    /**
     * Copies the element values of the given matrix.
     * @param {Matrix2} m The given matrix.
     */
    copy(m: this): this;
    /**
     * Multiplies a vector by a 2x2 matrix.
     * @param {Vector2} a The vector to transform.
     * @returns {Vector2} This vector.
     */
    transformVector2(v: Vector2): Vector2;
    /**
     * Right-multiplies the given matrix with this one (this * m).
     * @param {Matrix2} m The given matrix.
     */
    multiply(m: this): this;
    /**
     * Left-multiplies the given matrix with this one (m * this).
     * @param {Matrix2} m The given matrix.
     */
    premultiply(m: this): this;
    /**
     * Multiplies two 2x2 matrices (A * B).
     * @param {Matrix2} a The A matrix.
     * @param {Matrix2} b The B matrix.
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
     * Computes the inverse of the given matrix and assigns it to this matrix.
     * @param {Matrix2} matrix The given matrix.
     * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
     */
    getInverse(matrix: this, throwOnDegenerate: boolean): this;
    /**
     * Inverts this matrix.
     * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
     */
    invert(throwOnDegenerate?: boolean): this;
    /**
     * Transposes this matrix in-place.
     */
    transpose(): this;
    /**
     * Computes the adjugates of this matrix in-place.
     */
    adjugate(): this;
    /**
     * Computes the adjugate of the given matrix and assigns it to this matrix.
     * @param {Matrix2} matrix The given matrix.
     */
    getAdjugate(matrix: this): this;
    /**
     * Computes the trace of this matrix.
     * @returns {number} The matrix trace.
     */
    trace(): number;
    /**
     * Compares the equality with a given matrix (strict).
     * @param {Matrix2} matrix The given matrix.
     */
    equals(matrix: this): boolean;
    /**
     * Loads values from an array into a matrix.
     * @param array The array to populate the matrix from.
     * @param offset The numeric array offset.
     */
    fromArray(array: number[], offset?: number): this;
    /**
     * Loads values into an array into a matrix.
     * @param {number[]} array The array to populate the matrix values into.
     * @param {number} offset The numeric array offset.
     */
    toArray(array?: number[], offset?: number): number[];
    /**
     * Computes the outer product of two vectors (a*b^T).
     * @param {Vector2} a The first vector.
     * @param {Vector2} b The second vector.
     * @param {number} scalar The number to scale the matrix by (defaults to 1).
     */
    getOuterProduct(a: Vector2, b: Vector2, scalar: number): this;
    /**
     * Adds the outer product of two vectors (a*b^T) to this matrix.
     * @param {Vector2} a The first vector.
     * @param {Vector2} b The second vector.
     * @param {number} scalar The number to scale the matrix by (defaults to 1).
     */
    addOuterProduct(a: Vector2, b: Vector2, scalar: number): this;
    /**
     * Adds 2 matrices together and optionally scales the result.
     * @param {Matrix2} a The first matrix.
     * @param {Matrix2} b The second matrix.
     * @param {number} scalar The number to scale the result by.
     */
    addMatrices(a: this, b: this, scalar?: number): this;
    /**
     * Adds a given matrix to this matrix.
     * @param {Matrix2} m The given matrix.
     */
    add(m: this): this;
    /**
     * Pretty prints this matrix.
     */
    prettyPrint(): string;
    applyFunction(fn: (elements: number[], rowDim: number, colDim: number) => void): void;
}
