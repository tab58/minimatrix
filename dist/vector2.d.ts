import { Vector } from './interfaces';
import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';
/**
 * A 2-dimensional vector.
 */
export declare class Vector2 implements Vector {
    private _x;
    private _y;
    get x(): number;
    get y(): number;
    readonly dimension: number;
    /**
     * @constructor
     * @param {number} x The x-component value.
     * @param {number} y The y-component value.
     */
    constructor(x: number, y: number);
    /**
     * Sets the components of the vector.
     * @param {number} x The x-component.
     * @param {number} y The y-component.
     * @returns {Vector2} This vector.
     */
    set(x: number, y: number): this;
    /**
     * Sets the vector components to a scalar.
     * @param {number} scalar The scalar.
     * @returns {Vector2} This vector.
     */
    setScalar(scalar: number): this;
    /**
     * Sets the X component of the vector.
     * @param {number} X The x-component.
     * @returns {Vector2} This vector.
     */
    setX(x: number): this;
    /**
     * Sets the Y component of the vector.
     * @param {number} Y The y-component.
     * @returns {Vector2} This vector.
     */
    setY(y: number): this;
    /**
     * Sets the vector component by index: [X, Y, Z]
     * @param {number} idx The index of the component (0-1).
     * @param {number} val The value to set the component to.
     * @returns {Vector2} This vector.
     */
    setComponent(idx: number, val: number): this;
    /**
     * Gets the vector component by index: [X, Y, Z]
     * @param {number} index The index of the component (0-1).
     * @returns {number} The component value.
     */
    getComponent(index: number): number;
    /**
     * Clones the vector.
     * @returns {Vector2} A new vector with the same components.
     */
    clone(): Vector2;
    /**
     * Copies the component values of a vector to this vector.
     * @param {Vector2} v The vector to copy.
     * @returns {Vector2} This vector.
     */
    copy(v: this): this;
    /**
     * Adds a vector to this vector.
     * @param {Vector2} v The vector to add.
     * @returns {Vector2} This vector.
     */
    add(v: this): this;
    /**
     * Adds a scalar to every component of this vector.
     * @param {number} s The scalar to add.
     * @returns {Vector2} This vector.
     */
    addScalar(s: number): this;
    /**
     * Adds 2 vectors and assigns the result to this vector.
     * @param {Vector2} a The first addend.
     * @param {Vector2} b The second addend.
     * @returns {Vector2} This vector.
     */
    addVectors(a: this, b: this): this;
    /**
     * Scales a vector by a scalar and adds the result to this vector.
     * @param {Vector2} v The vector.
     * @param {number} s The scalar to scale by.
     * @returns {Vector2} This vector.
     */
    addScaledVector(v: this, s: number): this;
    /**
     * Subtracts a vector from this vector.
     * @param {Vector2} v The vector to subtract.
     * @returns {Vector2} This vector.
     */
    sub(v: this): this;
    /**
     * Subtracts a scalar from each component of this vector.
     * @param {number} s The scalar to subtract.
     * @returns {Vector2} This vector.
     */
    subScalar(s: number): this;
    /**
     * Subtracts 2 vectors and assigns the value to this vector.
     * @param {Vector2} a The minuend.
     * @param {Vector2} b The subtrahend.
     * @returns {Vector2} This vector.
     */
    subVectors(a: this, b: this): this;
    /**
     * Multiplies element-wise a vector with this one.
     * @param {Vector2} v The vector.
     * @returns {Vector2} This vector.
     */
    multiply(v: this): this;
    /**
     * Multiplies this vector by a 2x2 matrix.
     * @param {Matrix2} a The matrix to scale by.
     * @returns {Vector2} This vector.
     */
    multiplyMatrix2(a: Matrix2): this;
    /**
     * Scales this vector as a projected vector (x, y, 1) by a 3x3 matrix
     * @param {Matrix3} a The matrix to scale by.
     * @returns {Vector2} This vector.
     */
    multiplyMatrix3(a: Matrix3): this;
    /**
     * Scales this vector by a number.
     * @param {number} scalar The number to scale by.
     * @returns {Vector2} This vector.
     */
    multiplyScalar(scalar: number): this;
    /**
     * Multiplies the vector components element-wise.
     * @param {Vector2} a The first vector.
     * @param {Vector2} b The second vector.
     * @returns {Vector2} This vector.
     */
    multiplyVectors(a: this, b: this): this;
    /**
     * Divides element-wise this vector by a vector.
     * @param {Vector2} v The vector to divide by.
     * @returns {Vector2} This vector.
     */
    divide(v: this): this;
    /**
     * Scales this vector by the inverse of the given scalar.
     * Doesn't check for divide by zero.
     * @param {number} scalar The scalar to divide by.
     * @returns {Vector2} This vector.
     */
    divideScalar(scalar: number): this;
    /**
     * Takes the minimum of each component of this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @returns {Vector2} This vector.
     */
    min(v: this): this;
    /**
     * Takes the maximum of each component of this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @returns {Vector2} This vector.
     */
    max(v: this): this;
    /**
     * Clamps this vector between the values of the minimum and maximum vectors.
     * This function assumes min < max, if this assumption isn't true it will not operate correctly.
     * @param {Vector2} min The minimum value vector.
     * @param {Vector2} max The maximum value vector.
     * @returns {Vector2} This vector.
     */
    clamp(min: this, max: this): this;
    /**
     * Rounds each component of the vector to the lowest integer.
     * @returns {Vector2} This vector.
     */
    floor(): this;
    /**
     * Rounds each component of the vector to the highest integer.
     * @returns {Vector2} This vector.
     */
    ceil(): this;
    /**
     * Rounds each component of the vector via Math.round().
     * @returns {Vector2} This vector.
     */
    round(): this;
    /**
     * Rounds each component of the vector toward zero (down if positive, up if negative).
     * @returns {Vector2} This vector.
     */
    roundToZero(): this;
    /**
     * Negates each component of the vector.
     * @returns {Vector2} This vector.
     */
    negate(): this;
    /**
     * Computes the dot product between this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @returns {number} The dot product.
     */
    dot(v: this): number;
    /**
     * Computes the z-component of the cross product between this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @returns {number} The z-component of the cross product.
     */
    cross(v: this): number;
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
     * @returns {Vector2} This vector.
     */
    normalize(): this;
    /**
     * Computes the angle in radians with respect to the positive x-axis.
     * @returns {number} The angle between 0-2*PI.
     */
    angle(): number;
    /**
     * Computes the angle between this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @returns {number} The angle between the vectors.
     */
    angleTo(v: this): number;
    /**
     * Computes the distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {Vector2} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    distanceTo(v: this): number;
    /**
     * Computes the squared distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {Vector2} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    distanceToSquared(v: this): number;
    /**
     * Determines equality between this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @param {number} tol The numerical tolerance.
     * @returns {boolean} True if all the component value differences are below the numeric tolerance, false if not.
     */
    equals(v: this, tol?: number): boolean;
    /**
     * Sets the length of this vector/
     * @param {number} length The new length of the vector.
     * @returns {Vector2} This vector.
     */
    setLength(length: number): this;
    /**
     * Computes a linear interpolation between this vector and the given vector.
     * @param {Vector2} v The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector2} This vector.
     */
    lerp(v: this, alpha: number): this;
    /**
     * Linearly interpolates vectors.
     * @param {Vector2} v1 The vector at alpha = 0.
     * @param {Vector2} v2 The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector2} This vector.
     */
    lerpVectors(v1: this, v2: this, alpha: number): this;
    /**
     * Loads a vector from an array.
     * @param {number[]} array The array with values.
     * @param {number} offset The offset to start from in the array. Default is zero.
     * @returns {Vector2} This vector.
     */
    fromArray(array: number[], offset: number): this;
    /**
     * Loads an array from this vector.
     * @param {number[]} array The array to put the values in.
     * @param {number} offset The offset to start from in the array. Default is zero.
     * @returns {Vector2} This vector.
     */
    toArray(array?: number[], offset?: number): number[];
    /**
     * Rotates a vector by an angle.
     * @param {number} angle The angle to rotate the vector by.
     * @returns {Vector2} This vector.
     */
    rotate(angle: number): this;
    /**
     * Rotates a vector around a point by an angle.
     * @param {Vector2} center The center of rotation.
     * @param {number} angle The angle to rotate the vector by.
     * @returns {Vector2} This vector.
     */
    rotateAround(center: this, angle: number): this;
}
