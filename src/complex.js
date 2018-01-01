'use strict';

const _Math = require('./stdMath.js');

function newtonsCubeIteration (A, xn, xn1) {
  xn1.copy(A)
    .divide(xn)
    .divide(xn)
    .add(xn)
    .add(xn)
    .scale(1 / 3);
}

function newtonsCube (A, x0) {
  const xn = x0.clone();
  const xn1 = x0.clone();
  let diff = 0;
  do {
    xn.copy(xn1);
    newtonsCubeIteration(A, xn, xn1);
    diff = _Math.hypot(xn1.real - xn.real, xn1.imag - xn.imag);
  } while (diff > 1e-15);
  return xn1;
}

/**
 * Class for complex arithmetic.
 */
class Complex {
  constructor (a = 0, b = 0) {
    this.real = a;
    this.imag = b;
  }

  /**
   * Clones a complex number.
   * @returns {Complex} The cloned complex number.
   */
  clone () {
    return new Complex(this.real, this.imag);
  }

  /**
   * Creates a Complex number from a given vector in the complex plane.
   * @param {Vector2} v The given vector.
   */
  fromVector2 (v) {
    return new Complex(v.x, v.y);
  }

  /**
   * Copies a complex number.
   * @param {Complex} C The given complex number.
   */
  copy (C) {
    this.real = C.real;
    this.imag = C.imag;
    return this;
  }

  /**
   * Sets the coefficients of the complex number.
   * @param {number} real The real coefficient.
   * @param {number} imag The imaginary coefficient.
   */
  set (real, imag) {
    this.real = real;
    this.imag = imag;
    return this;
  }

  /**
   * Sets the real coefficient of the complex number.
   * @param {number} a The real coefficient.
   */
  setReal (a) {
    this.real = a;
    return this;
  }

  /**
   * Sets the imaginary coefficient of the complex number.
   * @param {number} b The imaginary coefficient.
   */
  setImag (b) {
    this.imag = b;
    return this;
  }

  /**
   * Adds the given complex number with this one.
   * @param {Complex} C The given complex number.
   */
  add (C) {
    this.real += C.real;
    this.imag += C.imag;
    return this;
  }

  /**
   * Subtracts the given complex number with this one.
   * @param {Complex} C The given complex number.
   */
  sub (C) {
    this.real -= C.real;
    this.imag -= C.imag;
    return this;
  }

  /**
   * Multiplies the given complex number with this one.
   * @param {Complex} C The given complex number.
   */
  multiply (C) {
    const a = this.real;
    const b = this.imag;
    const c = C.real;
    const d = C.imag;
    this.real = a * c - b * d;
    this.imag = b * c + a * d;
    return this;
  }

  /**
   * Divides this complex number with the given complex number.
   * @param {Complex} C The given complex number.
   */
  divide (C) {
    const a = this.real;
    const b = this.imag;
    const c = C.real;
    const d = C.imag;
    const den = c * c + d * d;
    this.real = (a * c + b * d) / den;
    this.imag = (b * c - a * d) / den;
    return this;
  }

  /**
   * Adds a real number to this complex number.
   * @param {number} a The real number to add.
   */
  addReal (a) {
    this.real += a;
    return this;
  }

  /**
   * Scales a Complex number.
   * @param {number} s The number to scale by.
   */
  scale (s) {
    this.real *= s;
    this.imag *= s;
    return this;
  }

  /**
   * Sets this Complex number to the complex conjugate.
   */
  conjugate () {
    this.imag = -this.imag;
    return this;
  }

  /**
   * Determines if this complex number is equal to the given complex number.
   * @param {Complex} C The given complex number.
   * @param {number} tol The numerical tolerance.
   * @returns {boolean} True if the magnitudes are within the numerical tolerance of each other, false if not.
   */
  equal (C, tol = 0) {
    const x = this.real - C.real;
    const y = this.imag - C.imag;
    return _Math.hypot(x, y) <= tol;
  }

  /**
   * Calculates the square root of the complex number.
   */
  sqrt () {
    if (this.imag === 0 && this.real > 0) {
      return new Complex(_Math.sqrt(this.real), 0);
    } else {
      const a = this.real;
      const b = this.imag;
      const mod = _Math.hypot(a, b);
      const u = _Math.sqrt((a + mod) / 2);
      const v = (b < 0 ? -1 : 1) * _Math.sqrt((-a + mod) / 2);
      return [new Complex(u, v), new Complex(-u, -v)];
    }
  }

  /**
   * Calculates the cube root of the complex number.
   */
  cbrt () {
    const a = this.real;
    const b = this.imag;
    const r = _Math.hypot(a, b);
    const cbrtR = _Math.pow(r, 1 / 3);
    const x = a / r;
    const y = b / r;
    const theta = _Math.atan2(y, x);
    const rawExps = [theta / 3, (theta + _Math.PI2) / 3, (theta - _Math.PI2) / 3];
    return rawExps.map(rawExp => {
      const expn = rawExp % _Math.PI2;
      const x = cbrtR * _Math.cos(expn);
      const y = cbrtR * _Math.sin(expn);
      return newtonsCube(this, new Complex(x, y));
    });
  }
}

Object.defineProperties(Complex.prototype, {
  /**
   * @memberOf Complex#I
   */
  I: {
    value: Object.freeze(new Complex(0, 1)),
    writable: false
  }
});

module.exports = Complex;
