"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("./core"));
function newtonsCubeIteration(A, xn, xn1) {
    xn1.copy(A)
        .divide(xn)
        .divide(xn)
        .add(xn)
        .add(xn)
        .scale(1 / 3);
}
function newtonsCube(A, x0) {
    const xn = x0.clone();
    const xn1 = x0.clone();
    let diff = 0;
    do {
        xn.copy(xn1);
        newtonsCubeIteration(A, xn, xn1);
        diff = core_1.default.hypot(xn1.real - xn.real, xn1.imag - xn.imag);
    } while (diff > 1e-15);
    return xn1;
}
/**
 * Class for complex arithmetic.
 */
class Complex {
    constructor(a = 0, b = 0) {
        this._real = a;
        this._imag = b;
    }
    get real() { return this._real; }
    get imag() { return this._imag; }
    /**
     * Clones a complex number.
     * @returns {Complex} The cloned complex number.
     */
    clone() {
        return new Complex(this._real, this._imag);
    }
    /**
     * Creates a Complex number from a given vector in the complex plane.
     * @param {Vector2} v The given vector.
     * @returns {Complex} This complex number.
     */
    fromVector2(v) {
        return new Complex(v.x, v.y);
    }
    /**
     * Copies a complex number.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    copy(C) {
        this._real = C._real;
        this._imag = C._imag;
        return this;
    }
    /**
     * Sets the coefficients of the complex number.
     * @param {number} real The real coefficient.
     * @param {number} imag The imaginary coefficient.
     * @returns {Complex} This complex number.
     */
    set(real, imag) {
        this._real = real;
        this._imag = imag;
        return this;
    }
    /**
     * Sets the real coefficient of the complex number.
     * @param {number} a The real coefficient.
     * @returns {Complex} This complex number.
     */
    setReal(a) {
        this._real = a;
        return this;
    }
    /**
     * Sets the imaginary coefficient of the complex number.
     * @param {number} b The imaginary coefficient.
     * @returns {Complex} This complex number.
     */
    setImag(b) {
        this._imag = b;
        return this;
    }
    /**
     * Adds the given complex number with this one.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    add(C) {
        this._real += C.real;
        this._imag += C.imag;
        return this;
    }
    /**
     * Subtracts the given complex number with this one.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    sub(C) {
        this._real -= C.real;
        this._imag -= C.imag;
        return this;
    }
    /**
     * Multiplies the given complex number with this one.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    multiply(C) {
        const a = this._real;
        const b = this._imag;
        const c = C.real;
        const d = C.imag;
        this._real = a * c - b * d;
        this._imag = b * c + a * d;
        return this;
    }
    /**
     * Divides this complex number with the given complex number.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    divide(C) {
        const a = this._real;
        const b = this._imag;
        const c = C.real;
        const d = C.imag;
        const den = c * c + d * d;
        this._real = (a * c + b * d) / den;
        this._imag = (b * c - a * d) / den;
        return this;
    }
    /**
     * Adds a real number to this complex number.
     * @param {number} a The real number to add.
     * @returns {Complex} This complex number.
     */
    addReal(a) {
        this._real += a;
        return this;
    }
    /**
     * Scales a Complex number.
     * @param {number} s The number to scale by.
     * @returns {Complex} This complex number.
     */
    scale(s) {
        this._real *= s;
        this._imag *= s;
        return this;
    }
    /**
     * Sets this Complex number to the complex conjugate.
     * @returns {Complex} This complex number.
     */
    conjugate() {
        this._imag = -this._imag;
        return this;
    }
    /**
     * Determines if this complex number is equal to the given complex number.
     * @param {Complex} C The given complex number.
     * @param {number} tol The numerical tolerance.
     * @returns {boolean} True if the magnitudes are within the numerical tolerance of each other, false if not.
     */
    equal(C, tol = 0) {
        const x = this._real - C.real;
        const y = this._imag - C.imag;
        return core_1.default.hypot(x, y) <= tol;
    }
    /**
     * Calculates the square root of the complex number.
     * @returns {Complex[]} The array of 2 square roots.
     */
    sqrt() {
        if (this._imag === 0 && this._real > 0) {
            return [new Complex(core_1.default.sqrt(this._real), 0)];
        }
        else {
            const a = this._real;
            const b = this._imag;
            const mod = core_1.default.hypot(a, b);
            const u = core_1.default.sqrt((a + mod) / 2);
            const v = (b < 0 ? -1 : 1) * core_1.default.sqrt((-a + mod) / 2);
            return [new Complex(u, v), new Complex(-u, -v)];
        }
    }
    /**
     * Calculates the cube root of the complex number.
     * @returns {Complex[]} An array of the 3 complex roots.
     */
    cbrt() {
        const a = this._real;
        const b = this._imag;
        const r = core_1.default.hypot(a, b);
        const cbrtR = core_1.default.pow(r, 1 / 3);
        const x = a / r;
        const y = b / r;
        const theta = core_1.default.atan2(y, x);
        const rawExps = [theta / 3, (theta + core_1.default.PI2) / 3, (theta - core_1.default.PI2) / 3];
        return rawExps.map(rawExp => {
            const expn = rawExp % core_1.default.PI2;
            const x = cbrtR * core_1.default.cos(expn);
            const y = cbrtR * core_1.default.sin(expn);
            return newtonsCube(this, new Complex(x, y));
        });
    }
}
exports.Complex = Complex;
Object.defineProperties(Complex.prototype, {
    /**
     * @property {Complex} I The imaginary number.
     * @memberof Complex
     */
    I: {
        value: Object.freeze(new Complex(0, 1)),
        writable: false
    }
});
//# sourceMappingURL=complex.js.map