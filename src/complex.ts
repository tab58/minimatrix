import _Math from './core';
import { Vector2 } from './vector2';

function newtonsCubeIteration (A: Complex, xn: Complex, xn1: Complex): void {
  xn1.copy(A)
    .divide(xn)
    .divide(xn)
    .add(xn)
    .add(xn)
    .scale(1 / 3);
}

function newtonsCube (A: Complex, x0: Complex): Complex {
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
export class Complex {
  private _real: number;
  private _imag: number;

  public get real (): number { return this._real; }
  public get imag (): number { return this._imag; }

  constructor (a = 0, b = 0) {
    this._real = a;
    this._imag = b;
  }

  /**
   * Clones a complex number.
   * @returns {Complex} The cloned complex number.
   */
  clone (): this {
    return new Complex(this._real, this._imag) as this;
  }

  /**
   * Copies a Complex number from a given vector in the complex plane.
   * @param v The given vector.
   * @returns This complex number.
   */
  fromVector2 (v: Vector2): this {
    this._real = v.x;
    this._imag = v.y;
    return this;
  }

  /**
   * Copies a complex number.
   * @param C The given complex number.
   * @returns This complex number.
   */
  copy (C: this): this {
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
  set (real: number, imag: number): this {
    this._real = real;
    this._imag = imag;
    return this;
  }

  /**
   * Sets the real coefficient of the complex number.
   * @param {number} a The real coefficient.
   * @returns {Complex} This complex number.
   */
  setReal (a: number): this {
    this._real = a;
    return this;
  }

  /**
   * Sets the imaginary coefficient of the complex number.
   * @param {number} b The imaginary coefficient.
   * @returns {Complex} This complex number.
   */
  setImag (b: number): this {
    this._imag = b;
    return this;
  }

  /**
   * Adds the given complex number with this one.
   * @param {Complex} C The given complex number.
   * @returns {Complex} This complex number.
   */
  add (C: this): this {
    this._real += C.real;
    this._imag += C.imag;
    return this;
  }

  /**
   * Subtracts the given complex number with this one.
   * @param {Complex} C The given complex number.
   * @returns {Complex} This complex number.
   */
  sub (C: this): this {
    this._real -= C.real;
    this._imag -= C.imag;
    return this;
  }

  /**
   * Multiplies the given complex number with this one.
   * @param {Complex} C The given complex number.
   * @returns {Complex} This complex number.
   */
  multiply (C: this): this {
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
  divide (C: this): this {
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
  addReal (a: number): this {
    this._real += a;
    return this;
  }

  /**
   * Scales a Complex number.
   * @param {number} s The number to scale by.
   * @returns {Complex} This complex number.
   */
  scale (s: number): this {
    this._real *= s;
    this._imag *= s;
    return this;
  }

  /**
   * Sets this Complex number to the complex conjugate.
   * @returns {Complex} This complex number.
   */
  conjugate (): this {
    this._imag = -this._imag;
    return this;
  }

  /**
   * Determines if this complex number is equal to the given complex number.
   * @param C The given complex number.
   * @param tol The numerical tolerance.
   * @returns True if the magnitudes are within the numerical tolerance of each other, false if not.
   */
  equal (C: this, tol = 0): boolean {
    const x = this._real - C.real;
    const y = this._imag - C.imag;
    return _Math.hypot(x, y) <= tol;
  }

  /**
   * Calculates the square root of the complex number.
   * @returns {Complex[]} The array of 2 square roots.
   */
  sqrt (): this[] {
    if (this._imag === 0 && this._real > 0) {
      return [new Complex(_Math.sqrt(this._real), 0) as this];
    } else {
      const a = this._real;
      const b = this._imag;
      const mod = _Math.hypot(a, b);
      const u = _Math.sqrt((a + mod) / 2);
      const v = (b < 0 ? -1 : 1) * _Math.sqrt((-a + mod) / 2);
      return [new Complex(u, v) as this, new Complex(-u, -v) as this];
    }
  }

  /**
   * Calculates the cube root of the complex number.
   * @returns {Complex[]} An array of the 3 complex roots.
   */
  cbrt (): this[] {
    const a = this._real;
    const b = this._imag;
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
      return newtonsCube(this, new Complex(x, y) as this);
    }) as this[];
  }
}

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