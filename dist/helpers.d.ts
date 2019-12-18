import { Vector, Matrix } from './interfaces';
/** Helpers for common linear algebra functions. */
export declare class LinAlgHelpers {
    /**
     * Builds the outer product from a vector.
     * @param v The vector.
     */
    static getOuterProduct(v: Vector): Matrix;
    /**
     * Computes the outer product ab^T and applies it to a matrix.
     * @param a
     * @param b
     * @param scalar
     */
    static setMatrixOuterProduct<T extends Vector, U extends Matrix>(A: U, a: T, b: T, scalar?: number): U;
    /**
     * Computes the outer product ab^T and applies it to a matrix.
     * @param a
     * @param b
     * @param scalar
     */
    static addMatrixOuterProduct<T extends Vector, U extends Matrix>(A: U, a: T, b: T, scalar?: number): U;
    /**
     * Gets a row from the matrix as a vector.
     * @param m The matrix.
     * @param i The row number (zero-based index).
     */
    static getRow(m: Matrix, i: number): Vector;
    /**
     * Gets a column from the matrix as a vector.
     * @param m The matrix.
     * @param i The column number (zero-based index).
     */
    static getColumn(m: Matrix, i: number): Vector;
    /**
     * Builds a vector of the values.
     * @param a The array with values.
     * @param n The size of the vector.
     * @param offset The offset index of the array.
     */
    static vectorFromValues(a: number[], n: number, offset?: number): Vector;
    /**
     * Transforms (multiplies) a vector by a matrix.
     * @param m The matrix to transform the vector by.
     * @param v The vector to transform.
     */
    static transformVector(m: Matrix, v: Vector): Vector;
}
