'use strict';

/*
 *   Base code from THREE.js authors below.
 *   Additions by Tim Bright
 */

const _Math = require('./stdMath.js');

/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

function Vector2 (x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Object.assign(Vector2.prototype, {
  isVector2: true,

  dimension: 2,

  set: function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  },

  setScalar: function (scalar) {
    this.x = scalar;
    this.y = scalar;
    return this;
  },

  setX: function (x) {
    this.x = x;
    return this;
  },

  setY: function (y) {
    this.y = y;
    return this;
  },

  clone: function () {
    return new this.constructor(this.x, this.y);
  },

  copy: function (v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  },

  add: function (v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  },

  addScalar: function (s) {
    this.x += s;
    this.y += s;
    return this;
  },

  addVectors: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  },

  addScaledVector: function (v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    return this;
  },

  sub: function (v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  },

  subScalar: function (s) {
    this.x -= s;
    this.y -= s;
    return this;
  },

  subVectors: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  },

  multiply: function (v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  },

  multiplyMatrix2: function (a) {
    const ae = a.elements;
    const a11 = ae[ 0 ];
    const a12 = ae[ 2 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 3 ];
    const x = this.x;
    const y = this.y;
    this.x = a11 * x + a12 * y;
    this.y = a21 * x + a22 * y;
    return this;
  },

  multiplyMatrix3: function (a) {
    const ae = a.elements;
    const a11 = ae[ 0 ];
    const a12 = ae[ 3 ];
    const a13 = ae[ 6 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 4 ];
    const a23 = ae[ 7 ];
    // const a31 = ae[ 2 ];
    // const a32 = ae[ 5 ];
    // const a33 = ae[ 8 ];
    const x = this.x;
    const y = this.y;
    this.x = a11 * x + a12 * y + a13;
    this.y = a21 * x + a22 * y + a23;
    return this;
  },

  multiplyScalar: function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  },

  divide: function (v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  },

  divideScalar: function (scalar) {
    return this.multiplyScalar(1.0 / scalar);
  },

  min: function (v) {
    this.x = _Math.min(this.x, v.x);
    this.y = _Math.min(this.y, v.y);
    return this;
  },

  max: function (v) {
    this.x = _Math.max(this.x, v.x);
    this.y = _Math.max(this.y, v.y);
    return this;
  },

  clamp: function (min, max) {
    // This function assumes min < max, if this assumption isn't true it will not operate correctly
    this.x = _Math.max(min.x, _Math.min(max.x, this.x));
    this.y = _Math.max(min.y, _Math.min(max.y, this.y));
    return this;
  },

  floor: function () {
    this.x = _Math.floor(this.x);
    this.y = _Math.floor(this.y);
    return this;
  },

  ceil: function () {
    this.x = _Math.ceil(this.x);
    this.y = _Math.ceil(this.y);
    return this;
  },

  round: function () {
    this.x = _Math.round(this.x);
    this.y = _Math.round(this.y);
    return this;
  },

  roundToZero: function () {
    this.x = (this.x < 0) ? _Math.ceil(this.x) : _Math.floor(this.x);
    this.y = (this.y < 0) ? _Math.ceil(this.y) : _Math.floor(this.y);
    return this;
  },

  negate: function () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  },

  dot: function (v) {
    return this.x * v.x + this.y * v.y;
  },

  cross: function (v) {
    return this.x * v.y - this.y * v.x;
  },

  lengthSq: function () {
    // rewritten to deal with overflow/underflow
    const a = this.x;
    const b = this.y;
    if (a === 0 && b === 0) {
      return 0;
    }
    const x = _Math.abs(a);
    const y = _Math.abs(b);
    const u = _Math.max(x, y);
    const t = _Math.min(x, y) / u;
    return u * u * (1 + t * t);
  },

  length: function () {
    // rewritten to deal with overflow/underflow
    const a = this.x;
    const b = this.y;
    if (a === 0 && b === 0) {
      return 0;
    }
    const x = _Math.abs(a);
    const y = _Math.abs(b);
    const u = _Math.max(x, y);
    const t = _Math.min(x, y) / u;
    return u * _Math.sqrt(1 + t * t);
  },

  normalize: function () {
    return this.divideScalar(this.length());
  },

  angle: function () {
    // computes the angle in radians with respect to the positive x-axis
    let angle = _Math.atan2(this.y, this.x);
    if (angle < 0) {
      angle += 2 * _Math.PI;
    }
    return angle;
  },

  distanceTo: function (v) {
    return _Math.sqrt(this.distanceToSquared(v));
  },

  distanceToSquared: function (v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  },

  setLength: function (length) {
    return this.multiplyScalar(length / this.length());
  },

  lerp: function (v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    return this;
  },

  lerpVectors: function (v1, v2, alpha) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  },

  fromArray: function (array, offset) {
    if (offset === undefined) {
      offset = 0;
    }
    this.x = array[offset];
    this.y = array[offset + 1];
    return this;
  },

  toArray: function (array, offset) {
    if (array === undefined) {
      array = [];
    }
    if (offset === undefined) {
      offset = 0;
    }
    array[offset] = this.x;
    array[offset + 1] = this.y;
    return array;
  },

  rotate: function (angle) {
    const c = _Math.cos(angle);
    const s = _Math.sin(angle);
    const x = this.x;
    const y = this.y;
    this.x = x * c - y * s;
    this.y = x * s + y * c;
    return this;
  },

  rotateAround: function (center, angle) {
    const c = _Math.cos(angle);
    const s = _Math.sin(angle);
    const x = this.x - center.x;
    const y = this.y - center.y;
    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;
    return this;
  }
});

module.exports = Vector2;
