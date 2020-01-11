"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(require("./core"));
function newtonsCubeIteration(A, xn, xn1) {
    xn1.copy(A)
        .divide(xn)
        .divide(xn)
        .add(xn)
        .add(xn)
        .scale(1 / 3);
}
function newtonsCube(A, x0) {
    var xn = x0.clone();
    var xn1 = x0.clone();
    var diff = 0;
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
var Complex = /** @class */ (function () {
    function Complex(a, b) {
        if (a === void 0) { a = 0; }
        if (b === void 0) { b = 0; }
        this._real = a;
        this._imag = b;
    }
    Object.defineProperty(Complex.prototype, "real", {
        get: function () { return this._real; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Complex.prototype, "imag", {
        get: function () { return this._imag; },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones a complex number.
     * @returns {Complex} The cloned complex number.
     */
    Complex.prototype.clone = function () {
        return new Complex(this._real, this._imag);
    };
    /**
     * Copies a Complex number from a given vector in the complex plane.
     * @param v The given vector.
     * @returns This complex number.
     */
    Complex.prototype.fromVector2 = function (v) {
        this._real = v.x;
        this._imag = v.y;
        return this;
    };
    /**
     * Copies a complex number.
     * @param C The given complex number.
     * @returns This complex number.
     */
    Complex.prototype.copy = function (C) {
        this._real = C._real;
        this._imag = C._imag;
        return this;
    };
    /**
     * Sets the coefficients of the complex number.
     * @param {number} real The real coefficient.
     * @param {number} imag The imaginary coefficient.
     * @returns {Complex} This complex number.
     */
    Complex.prototype.set = function (real, imag) {
        this._real = real;
        this._imag = imag;
        return this;
    };
    /**
     * Sets the real coefficient of the complex number.
     * @param {number} a The real coefficient.
     * @returns {Complex} This complex number.
     */
    Complex.prototype.setReal = function (a) {
        this._real = a;
        return this;
    };
    /**
     * Sets the imaginary coefficient of the complex number.
     * @param {number} b The imaginary coefficient.
     * @returns {Complex} This complex number.
     */
    Complex.prototype.setImag = function (b) {
        this._imag = b;
        return this;
    };
    /**
     * Adds the given complex number with this one.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    Complex.prototype.add = function (C) {
        this._real += C.real;
        this._imag += C.imag;
        return this;
    };
    /**
     * Subtracts the given complex number with this one.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    Complex.prototype.sub = function (C) {
        this._real -= C.real;
        this._imag -= C.imag;
        return this;
    };
    /**
     * Multiplies the given complex number with this one.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    Complex.prototype.multiply = function (C) {
        var a = this._real;
        var b = this._imag;
        var c = C.real;
        var d = C.imag;
        this._real = a * c - b * d;
        this._imag = b * c + a * d;
        return this;
    };
    /**
     * Divides this complex number with the given complex number.
     * @param {Complex} C The given complex number.
     * @returns {Complex} This complex number.
     */
    Complex.prototype.divide = function (C) {
        var a = this._real;
        var b = this._imag;
        var c = C.real;
        var d = C.imag;
        var den = c * c + d * d;
        this._real = (a * c + b * d) / den;
        this._imag = (b * c - a * d) / den;
        return this;
    };
    /**
     * Adds a real number to this complex number.
     * @param {number} a The real number to add.
     * @returns {Complex} This complex number.
     */
    Complex.prototype.addReal = function (a) {
        this._real += a;
        return this;
    };
    /**
     * Scales a Complex number.
     * @param {number} s The number to scale by.
     * @returns {Complex} This complex number.
     */
    Complex.prototype.scale = function (s) {
        this._real *= s;
        this._imag *= s;
        return this;
    };
    /**
     * Sets this Complex number to the complex conjugate.
     * @returns {Complex} This complex number.
     */
    Complex.prototype.conjugate = function () {
        this._imag = -this._imag;
        return this;
    };
    /**
     * Determines if this complex number is equal to the given complex number.
     * @param C The given complex number.
     * @param tol The numerical tolerance.
     * @returns True if the magnitudes are within the numerical tolerance of each other, false if not.
     */
    Complex.prototype.equal = function (C, tol) {
        if (tol === void 0) { tol = 0; }
        var x = this._real - C.real;
        var y = this._imag - C.imag;
        return core_1.default.hypot(x, y) <= tol;
    };
    /**
     * Calculates the square root of the complex number.
     * @returns {Complex[]} The array of 2 square roots.
     */
    Complex.prototype.sqrt = function () {
        if (this._imag === 0 && this._real > 0) {
            return [new Complex(core_1.default.sqrt(this._real), 0)];
        }
        else {
            var a = this._real;
            var b = this._imag;
            var mod = core_1.default.hypot(a, b);
            var u = core_1.default.sqrt((a + mod) / 2);
            var v = (b < 0 ? -1 : 1) * core_1.default.sqrt((-a + mod) / 2);
            return [new Complex(u, v), new Complex(-u, -v)];
        }
    };
    /**
     * Calculates the cube root of the complex number.
     * @returns {Complex[]} An array of the 3 complex roots.
     */
    Complex.prototype.cbrt = function () {
        var _this = this;
        var a = this._real;
        var b = this._imag;
        var r = core_1.default.hypot(a, b);
        var cbrtR = core_1.default.pow(r, 1 / 3);
        var x = a / r;
        var y = b / r;
        var theta = core_1.default.atan2(y, x);
        var rawExps = [theta / 3, (theta + core_1.default.PI2) / 3, (theta - core_1.default.PI2) / 3];
        return rawExps.map(function (rawExp) {
            var expn = rawExp % core_1.default.PI2;
            var x = cbrtR * core_1.default.cos(expn);
            var y = cbrtR * core_1.default.sin(expn);
            return newtonsCube(_this, new Complex(x, y));
        });
    };
    return Complex;
}());
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