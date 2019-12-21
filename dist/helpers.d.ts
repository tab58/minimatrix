import { Vector2 } from './vector2';
import { Vector3 } from './vector3';
import { Vector4 } from './vector4';
import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';
declare type Vector = Vector2 | Vector3 | Vector4;
declare type Matrix = Matrix2 | Matrix3 | Matrix4;
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
    static setMatrixOuterProduct(A: Matrix, a: Vector, b: Vector, scalar?: number): Matrix;
    /**
     * Computes the outer product ab^T and applies it to a matrix.
     * @param a
     * @param b
     * @param scalar
     */
    static addMatrixOuterProduct(A: Matrix, a: Vector, b: Vector, scalar?: number): Matrix;
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
    /**
   * Transforms (multiplies) a vector by a matrix.
   * @param m The matrix to transform the vector by.
   * @param v The vector to transform.
   */
    static transformRowVector(m: Matrix, v: Vector): Vector;
}
export {};
