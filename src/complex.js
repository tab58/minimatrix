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

function Complex (a = 0, b = 0) {
  this.real = a;
  this.imag = b;
}

Object.assign(Complex.prototype, {
  I: new Complex(0, 1),
  clone: function () {
    return new Complex(this.real, this.imag);
  },
  fromVector2: function (v) {
    return new Complex(v.x, v.y);
  },
  copy: function (C) {
    this.real = C.real;
    this.imag = C.imag;
    return this;
  },
  set: function (real, imag) {
    this.real = real;
    this.imag = imag;
    return this;
  },
  setReal: function (a) {
    this.real = a;
    return this;
  },
  setImag: function (b) {
    this.imag = b;
    return this;
  },
  add: function (C) {
    this.real += C.real;
    this.imag += C.imag;
    return this;
  },
  sub: function (C) {
    this.real -= C.real;
    this.imag -= C.imag;
    return this;
  },
  multiply: function (C) {
    const a = this.real;
    const b = this.imag;
    const c = C.real;
    const d = C.imag;
    this.real = a * c - b * d;
    this.imag = b * c + a * d;
    return this;
  },
  divide: function (C) {
    const a = this.real;
    const b = this.imag;
    const c = C.real;
    const d = C.imag;
    const den = c * c + d * d;
    this.real = (a * c + b * d) / den;
    this.imag = (b * c - a * d) / den;
    return this;
  },
  addReal: function (a) {
    this.real += a;
    return this;
  },
  scale: function (s) {
    this.real *= s;
    this.imag *= s;
    return this;
  },
  conjugate: function () {
    this.imag = -this.imag;
    return this;
  },
  equal: function (C, tol = 0) {
    const x = this.real - C.real;
    const y = this.imag - C.imag;
    return _Math.hypot(x, y) <= tol;
  },
  sqrt: function () {
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
  },
  cbrt: function () {
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
});

module.exports = Complex;
