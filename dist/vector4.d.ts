import { Matrix4 } from './matrix4';
import { MathVector } from './interfaces';
export declare class Vector4 implements MathVector {
    private _components;
    private get _x();
    private set _x(value);
    private get _y();
    private set _y(value);
    private get _z();
    private set _z(value);
    private get _w();
    private set _w(value);
    get x(): number;
    get y(): number;
    get z(): number;
    get w(): number;
    readonly dimension: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    set(x: number, y: number, z: number, w: number): this;
    setScalar(scalar: number): this;
    setX(x: number): this;
    setY(y: number): this;
    setZ(z: number): this;
    setW(w: number): this;
    setComponent(index: number, value: number): this;
    getComponent(index: number): number;
    clone(): this;
    copy(v: this): this;
    add(v: this): this;
    addScalar(s: number): this;
    addVectors(a: this, b: this): this;
    addScaledVector(v: this, s: number): this;
    sub(v: this): this;
    subScalar(s: number): this;
    subVectors(a: this, b: this): this;
    /**
     * Multiplies element-wise a vector with this one.
     * @param {Vector3} v The vector.
     * @returns {Vector3} This vector.
     */
    multiply(v: this): this;
    multiplyScalar(scalar: number): this;
    /**
     * Multiplies the vector components element-wise.
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @returns {Vector3} This vector.
     */
    multiplyVectors(a: this, b: this): this;
    /**
     * Divides element-wise this vector by a vector.
     * @param {Vector4} v The vector to divide by.
     * @returns {Vector4} This vector.
     */
    divide(v: this): this;
    divideScalar(scalar: number): this;
    /**
     * Calculates the angle between this vector and the given vector.
     * @param {Vector4} v The given vector.
     * @returns {number} The angle.
     */
    angleTo(v: this): number;
    /**
     * Computes the distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {number} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    distanceTo(v: this): number;
    /**
     * Computes the squared distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {number} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    distanceToSquared(v: this): number;
    /**
   * Calculates the outer product of the matrix.
   * @param scalar A scalar to multiply the outer product by.
   */
    getOuterProduct(scalar?: number): Matrix4;
    min(v: this): this;
    max(v: this): this;
    clamp(min: this, max: this): this;
    clampScalar(minVal: number, maxVal: number): this;
    clampLength(min: number, max: number): this;
    floor(): this;
    ceil(): this;
    round(): this;
    roundToZero(): this;
    negate(): this;
    dot(v: this): number;
    lengthSq(): number;
    length(): number;
    normalize(): this;
    setLength(length: number): this;
    lerp(v: this, alpha: number): this;
    lerpVectors(v1: this, v2: this, alpha: number): this;
    fromArray(array: number[], offset?: number): this;
    toArray(array?: number[], offset?: number): number[];
}
