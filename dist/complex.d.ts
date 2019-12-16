import { Vector2 } from './vector2';
/**
 * Class for complex arithmetic.
 */
export declare class Complex {
    private _real;
    private _imag;
    get real(): number;
    get imag(): number;
    constructor(a?: number, b?: number);
    /**
     * Clones a complex number.
     * @returns {Complex} The cloned complex number.
     */
    clone(): this;
    /**
     * Creates a Complex number from a given vector in the complex plane.
     * @param v The given vector.
     * @returns This complex number.
     */
    fromVector2(v: Vector2): this;
    /**
     * Copies a complex number.
     * @param C The given complex number.
     * @returns This complex number.
     */
    copy(C: this): this;
    /**
     * Sets the coefficients of the complex number.
     * @param {number} real The real coefficient.
     * @param {number} imag The imaginary coefficient.
     * @returns {Complex} This complex number.
     */
    set(real: number, imag: number): this;
    /**
     * Sets the real coefficient of the complex number.
     * @param {number} a The real coefficient.
     * @returns {Complex} This complex number.
     */
    setReal(a: number): this;
    /**
     * Sets the imaginary coefficient of the complex number.
     * @param {number} b The imaginary coefficient.
     * @returns {Complex} This complex number.
     */
    setImag(b: number): this;
    /**
     * Adds the given complex number with this one.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    add(C: this): this;
    /**
     * Subtracts the given complex number with this one.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    sub(C: this): this;
    /**
     * Multiplies the given complex number with this one.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    multiply(C: this): this;
    /**
     * Divides this complex number with the given complex number.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    divide(C: this): this;
    /**
     * Adds a real number to this complex number.
     * @param {number} a The real number to add.
     * @returns {Complex} This complex number.
     */
    addReal(a: number): this;
    /**
     * Scales a Complex number.
     * @param {number} s The number to scale by.
     * @returns {Complex} This complex number.
     */
    scale(s: number): this;
    /**
     * Sets this Complex number to the complex conjugate.
     * @returns {Complex} This complex number.
     */
    conjugate(): this;
    /**
     * Determines if this complex number is equal to the given complex number.
     * @param {Complex} C The given complex number.
     * @param {number} tol The numerical tolerance.
     * @returns {boolean} True if the magnitudes are within the numerical tolerance of each other, false if not.
     */
    equal(C: this, tol?: number): boolean;
    /**
     * Calculates the square root of the complex number.
     * @returns {Complex[]} The array of 2 square roots.
     */
    sqrt(): this[];
    /**
     * Calculates the cube root of the complex number.
     * @returns {Complex[]} An array of the 3 complex roots.
     */
    cbrt(): this[];
}
