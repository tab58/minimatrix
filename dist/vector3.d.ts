import { Vector } from './interfaces';
import { Matrix3 } from './matrix3';
/**
 * A 2-dimensional vector.
 */
export declare class Vector3 implements Vector {
    private _x;
    private _y;
    private _z;
    get x(): number;
    get y(): number;
    get z(): number;
    readonly dimension: number;
    constructor(x?: number, y?: number, z?: number);
    /**
     * Sets the components of the vector.
     * @param {number} x The x-component.
     * @param {number} y The y-component.
     * @param {number} z The z-component.
     * @returns {Vector3} This vector.
     */
    set(x: number, y: number, z: number): this;
    /**
     * Sets the vector components to a scalar.
     * @param {number} scalar The scalar.
     * @returns {Vector3} This vector.
     */
    setScalar(scalar: number): this;
    /**
     * Sets the X component of the vector.
     * @param {number} x The x-component.
     * @returns {Vector3} This vector.
     */
    setX(x: number): this;
    /**
     * Sets the Y component of the vector.
     * @param {number} y The y-component.
     * @returns {Vector3} This vector.
     */
    setY(y: number): this;
    /**
     * Sets the Z component of the vector.
     * @param {number} z The z-component.
     * @returns {Vector3} This vector.
     */
    setZ(z: number): this;
    /**
     * Sets the vector component by index: [X, Y, Z]
     * @param {number} idx The index of the component (0-1).
     * @param {number} val The value to set the component to.
     * @returns {Vector3} This vector.
     */
    setComponent(index: number, value: number): this;
    /**
     * Gets the vector component by index: [X, Y, Z]
     * @param {number} index The index of the component (0-1).
     * @returns {number} The component value.
     */
    getComponent(index: number): number;
    /**
     * Clamps the components of this vector between the minimum and maximum values.
     * @param {number} minVal The minimum value.
     * @param {number} maxVal The maximum value.
     */
    clampScalar(minVal: number, maxVal: number): this;
    /**
     * Clones the vector.
     * @returns {Vector3} A new vector with the same components.
     */
    clone(): this;
    /**
     * Copies the component values of a vector to this vector.
     * @param {Vector3} v The vector to copy.
     * @returns {Vector3} This vector.
     */
    copy(v: this): this;
    /**
     * Adds a vector to this vector.
     * @param {Vector3} v The vector to add.
     * @returns {Vector3} This vector.
     */
    add(v: this): this;
    /**
     * Adds a scalar to every component of this vector.
     * @param {number} s The scalar to add.
     * @returns {Vector3} This vector.
     */
    addScalar(s: number): this;
    /**
     * Adds 2 vectors and assigns the result to this vector.
     * @param {Vector3} a The first addend.
     * @param {Vector3} b The second addend.
     * @returns {Vector3} This vector.
     */
    addVectors(a: this, b: this): this;
    /**
     * Scales a vector by a scalar and adds the result to this vector.
     * @param {Vector3} v The vector.
     * @param {number} s The scalar to scale by.
     * @returns {Vector3} This vector.
     */
    addScaledVector(v: this, s: number): this;
    /**
     * Subtracts a vector from this vector.
     * @param {Vector3} v The vector to subtract.
     * @returns {Vector3} This vector.
     */
    sub(v: this): this;
    /**
     * Subtracts a scalar from each component of this vector.
     * @param {number} s The scalar to subtract.
     * @returns {Vector3} This vector.
     */
    subScalar(s: number): this;
    /**
     * Subtracts 2 vectors and assigns the value to this vector.
     * @param {Vector3} a The minuend.
     * @param {Vector3} b The subtrahend.
     * @returns {Vector3} This vector.
     */
    subVectors(a: this, b: this): this;
    /**
     * Multiplies element-wise a vector with this one.
     * @param {Vector3} v The vector.
     * @returns {Vector3} This vector.
     */
    multiply(v: this): this;
    /**
     * Multiplies this vector by a Matrix3.
     * @param {Matrix3} m The matrix to scale this vector by.
     * @return {Vector3} This vector.
     */
    multiplyMatrix3(m: Matrix3): this;
    /**
     * Scales this vector by a number.
     * @param {number} scalar The number to scale by.
     * @returns {Vector3} This vector.
     */
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
     * @param {Vector3} v The vector to divide by.
     * @returns {Vector3} This vector.
     */
    divide(v: this): this;
    /**
     * Scales this vector by the inverse of the given scalar.
     * Doesn't check for divide by zero.
     * @param {number} scalar The scalar to divide by.
     * @returns {Vector3} This vector.
     */
    divideScalar(scalar: number): this;
    /**
     * Takes the minimum of each component of this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {Vector3} This vector.
     */
    min(v: this): this;
    /**
     * Takes the maximum of each component of this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {Vector3} This vector.
     */
    max(v: this): this;
    /**
     * Clamps this vector between the values of the minimum and maximum vectors.
     * This function assumes min < max, if this assumption isn't true it will not operate correctly.
     * @param {Vector3} min The minimum value vector.
     * @param {Vector3} max The maximum value vector.
     * @returns {Vector3} This vector.
     */
    clamp(min: this, max: this): this;
    /**
     * Clamps this vector's length between the minimum and maximum values.
     * @param {number} min The minimum length.
     * @param {number} max The maximum length.
     * @returns {Vector3} This vector.
     */
    clampLength(min: number, max: number): this;
    /**
     * Rounds each component of the vector to the lowest integer.
     * @returns {Vector3} This vector.
     */
    floor(): this;
    /**
     * Rounds each component of the vector to the highest integer.
     * @returns {Vector3} This vector.
     */
    ceil(): this;
    /**
     * Rounds each component of the vector via _Math.round().
     * @returns {Vector3} This vector.
     */
    round(): this;
    /**
     * Rounds each component of the vector toward zero (down if positive, up if negative).
     * @returns {Vector3} This vector.
     */
    roundToZero(): this;
    /**
     * Negates each component of the vector.
     * @returns {Vector3} This vector.
     */
    negate(): this;
    /**
     * Computes the dot product between this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {number} The dot product.
     */
    dot(v: this): number;
    /**
     * Computes the square of the length of the vector,
     * i.e. the dot product of this vector with itself.
     * @returns {number} The squared length of the vector.
     */
    lengthSq(): number;
    /**
     * Computes the length of the vector. Compensates for over/underflow.
     * @returns {number} The length of the vector.
     */
    length(): number;
    /**
     * Normalizes the vector, i.e. makes it unit length.
     * @returns {Vector3} This vector.
     */
    normalize(): this;
    /**
     * Sets the length of this vector/
     * @param {number} length The new length of the vector.
     * @returns {Vector3} This vector.
     */
    setLength(length: number): this;
    /**
     * Computes a linear interpolation between this vector and the given vector.
     * @param {Vector3} v The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector3} This vector.
     */
    lerp(v: this, alpha: number): this;
    /**
     * Computes the linear interpolation between two vectors.
     * @param {Vector3} v1 The vector at alpha = 0.
     * @param {Vector3} v2 The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector3} This vector.
     */
    lerpVectors(v1: this, v2: this, alpha: number): this;
    /**
     * Computes the cross product between this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {Vector3} This vector.
     */
    cross(v: this): this;
    /**
     * Computes the cross product (a x b).
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @returns {Vector3} This vector.
     */
    crossVectors(a: this, b: this): this;
    /**
     * Calculates the projection of this vector onto the given vector.
     * @param {Vector3} vector The given vector.
     * @returns {Vector3} This vector.
     */
    projectOnVector(vector: this): this;
    /**
     * Projects this vector onto a plane defined by the normal to the plane.
     * @param {Vector3} planeNormal The plane normal.
     * @returns {Vector3} This vector.
     */
    projectOnPlane(planeNormal: this): this;
    /**
     * Reflects this vector through a plane defined by its normal.
     * @param {Vector3} normal The plane normal.
     * @param {Vector3} vector This vector.
     */
    reflect(normal: this): this;
    /**
     * Assigns zero to component values below the numerical tolerance.
     * @param {number} tol The numerical tolerance.
     * @returns {Vector3} This vector.
     */
    thresholdValuesToZero(tol: number): this;
    /**
     * Calculates the angle between this vector and the given vector.
     * @param {Vector3} v The given vector.
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
     * Determines equality between this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @param {number} tol The numerical tolerance.
     * @returns {boolean} True if all the component value differences are below the numeric tolerance, false if not.
     */
    equals(v: this, tol?: number): boolean;
    /**
     * Loads a vector from an array.
     * @param {number} array The array with values.
     * @param {number} offset The offset to start from in the array. Default is zero.
     * @returns {Vector3} This vector.
     */
    fromArray(array: number[], offset?: number): this;
    /**
     * Loads an array from this vector.
     * @param {number[]} array The array to put the values in.
     * @param {number} offset The offset to start from in the array. Default is zero.
     * @returns {number[]} The array argument.
     */
    toArray(array?: number[], offset?: number): number[];
    /**
     * Rotates a vector by an angle about another vector.
     * @param {Vector} center The center of rotation.
     * @param {number} angle The angle in radians to rotate the vector by.
     * @returns {Vector} This vector.
     */
    rotateAround(axis: this, angle: number): this;
}
