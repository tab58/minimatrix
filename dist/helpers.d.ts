import { Vector, Matrix } from './interfaces';
/** Helpers for common linear algebra functions. */
export declare class LinAlgHelpers {
    static getOuterProduct(v: Vector): Matrix;
    static getRow(m: Matrix, i: number): Vector;
    static getColumn(m: Matrix, i: number): Vector;
    static vectorFromValues(a: number[], n: number, offset?: number): Vector;
}
