import { Vector3 } from './vector3';
import { Matrix } from './interfaces';
export declare class Matrix4 implements Matrix {
    private _elements;
    get elements(): number[];
    readonly dimension: number;
    constructor();
    /** Sets the matrix values in a row-major ordered fashion. */
    set(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, n41: number, n42: number, n43: number, n44: number): this;
    identity(): this;
    clone(): this;
    copy(m: this): this;
    copyPosition(m: this): this;
    /**
   * Adds a given matrix to this matrix.
   * @param {Matrix4} m The given matrix.
   */
    add(m: this): this;
    /**
   * Adds 2 matrices together and optionally scales the result: a + alpha * b.
   * @param {Matrix4} a The first matrix.
   * @param {Matrix4} b The second matrix.
   * @param {number} scalar The number to scale the result by.
   */
    addMatrices(a: this, b: this, scalar?: number): this;
    /**
   * Swaps rows in-place in the matrix. Zero is the first row.
   */
    swapRows(i: number, j: number): this;
    /**
     * Swaps columns in-place in the matrix. Zero is the first column.
     */
    swapColumns(i: number, j: number): this;
    extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this;
    makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this;
    multiply(m: this): this;
    premultiply(m: this): this;
    multiplyMatrices(a: this, b: this): this;
    multiplyScalar(s: number): this;
    determinant(): number;
    trace(): number;
    transpose(): this;
    setPosition(x: number, y: number, z: number): this;
    adjugate(): this;
    getAdjugate(matrix: this): this;
    invert(throwOnDegenerate?: boolean): this;
    getInverse(m: this, throwOnDegenerate: boolean, singularTol?: number): this;
    scale(v: Vector3): this;
    makeTranslation(x: number, y: number, z: number): this;
    makeRotationX(theta: number): this;
    makeRotationY(theta: number): this;
    makeRotationZ(theta: number): this;
    makeRotationAxis(axis: Vector3, angle: number): this;
    makeScale(x: number, y: number, z: number): this;
    makeShear(x: number, y: number, z: number): this;
    equals(matrix: this): boolean;
    fromArray(array: number[], offset?: number): this;
    toArray(array?: number[], offset?: number): number[];
    /**
   * Pretty prints this matrix.
   */
    prettyPrint(): string;
}
