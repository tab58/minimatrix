import { Vector2 } from './vector2';
import { Vector3 } from './vector3';
export declare const DEFAULT_TOLERANCE = 1e-14;
interface VectorLength {
    length(): number;
}
/**
 * Test if a number is close to zero.
 * @function isZero
 * @memberof Compare
 * @param {number} x The number to test.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number absolute value is below numerical tolerance, false if not.
 */
export declare function isZero(x: number, eps: number): boolean;
/**
 * Test if a number is greater than zero.
 * @function isGTZero
 * @memberof Compare
 * @param {number} x The number to test.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number value is greater than the numerical tolerance, false if not.
 */
export declare function isGTZero(x: number, eps: number): boolean;
/**
 * Test if a number is less than zero.
 * @function isLTZero
 * @memberof Compare
 * @param {number} x The number to test.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number is less than the negative of the numerical tolerance, false if not.
 */
export declare function isLTZero(x: number, eps: number): boolean;
/**
 * Test if a number is equal to another number within a tolerance.
 * @function isEqual
 * @memberof Compare
 * @param {number} x The first number.
 * @param {number} y The second number.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number difference is within the numerical tolerance, false if not.
 */
export declare function isEqual(x: number, y: number, eps: number): boolean;
/**
 * Test if a vector length is equal to another vector length within a tolerance.
 * @function vectorLengthsAreEqual
 * @memberof Compare
 * @param {Vector2|Vector3|Vector4} x The first vector.
 * @param {Vector2|Vector3|Vector4} y The second vector.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if vector length difference is within the numerical tolerance, false if not.
 */
export declare function areVectorLengthsEqual(x: VectorLength, y: VectorLength, eps: number): boolean;
/**
 * Test if a vector length is equal to another vector length within a tolerance.
 * @function vector2AreEqual
 * @memberof Compare
 * @param {Vector2} x The first vector.
 * @param {Vector2} y The second vector.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if vector component differences are within the numerical tolerance, false if not.
 */
export declare function areVector2Equal(x: Vector2, y: Vector2, eps: number): boolean;
/**
 * Test if a vector length is equal to another vector length within a tolerance.
 * @function vector3AreEqual
 * @memberof Compare
 * @param {Vector3} x The first vector.
 * @param {Vector3} y The second vector.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if vector component differences are within the numerical tolerance, false if not.
 */
export declare function areVector3Equal(x: Vector3, y: Vector3, eps: number): boolean;
export {};
