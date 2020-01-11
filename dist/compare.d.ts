export declare const DEFAULT_TOLERANCE = 1e-14;
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
