'use strict';

/*
 * Base code from THREE.js authors below.
 * Additions by Tim Bright
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

const _Math = require('./stdMath.js');
const MathHelpers = require('./math-helpers.js');

/**
 * A 2-dimensional vector.
 */
class Vector2 {
  /**
   * @constructor
   * @param {number} x The x-component value.
   * @param {number} y The y-component value.
   */
  constructor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  /**
   * Sets the components of the vector.
   * @param {number} x The x-component.
   * @param {number} y The y-component.
   * @returns {Vector2} This vector.
   */
  set (x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Sets the vector components to a scalar.
   * @param {number} scalar The scalar.
   * @returns {Vector2} This vector.
   */
  setScalar (scalar) {
    this.x = scalar;
    this.y = scalar;
    return this;
  }

  /**
   * Sets the X component of the vector.
   * @param {number} X The x-component.
   * @returns {Vector2} This vector.
   */
  setX (X) {
    this.x = X;
    return this;
  }

  /**
   * Sets the Y component of the vector.
   * @param {number} Y The y-component.
   * @returns {Vector2} This vector.
   */
  setY (Y) {
    this.y = Y;
    return this;
  }

  /**
   * Sets the vector component by index: [X, Y, Z]
   * @param {number} idx The index of the component (0-1).
   * @param {number} val The value to set the component to.
   * @returns {Vector2} This vector.
   */
  setComponent (idx, val) {
    switch (idx) {
      case 0: this.x = val; break;
      case 1: this.y = val; break;
      default: throw new Error('index is out of range: ' + idx);
    }
    return this;
  }

  /**
   * Gets the vector component by index: [X, Y, Z]
   * @param {number} index The index of the component (0-1).
   * @returns {number} The component value.
   */
  getComponent (index) {
    switch (index) {
      case 0: return this.x;
      case 1: return this.y;
      default: throw new Error('index is out of range: ' + index);
    }
  }

  /**
   * Clones the vector.
   * @returns {Vector2} A new vector with the same components.
   */
  clone () {
    return new this.constructor(this.x, this.y);
  }

  /**
   * Copies the component values of a vector to this vector.
   * @param {Vector2} v The vector to copy.
   * @returns {Vector2} This vector.
   */
  copy (v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /**
   * Adds a vector to this vector.
   * @param {Vector2} v The vector to add.
   * @returns {Vector2} This vector.
   */
  add (v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /**
   * Adds a scalar to every component of this vector.
   * @param {number} s The scalar to add.
   * @returns {Vector2} This vector.
   */
  addScalar (s) {
    this.x += s;
    this.y += s;
    return this;
  }

  /**
   * Adds 2 vectors and assigns the result to this vector.
   * @param {Vector2} a The first addend.
   * @param {Vector2} b The second addend.
   * @returns {Vector2} This vector.
   */
  addVectors (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  }

  /**
   * Scales a vector by a scalar and adds the result to this vector.
   * @param {Vector2} v The vector.
   * @param {number} s The scalar to scale by.
   * @returns {Vector2} This vector.
   */
  addScaledVector (v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    return this;
  }

  /**
   * Subtracts a vector from this vector.
   * @param {Vector2} v The vector to subtract.
   * @returns {Vector2} This vector.
   */
  sub (v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /**
   * Subtracts a scalar from each component of this vector.
   * @param {number} s The scalar to subtract.
   * @returns {Vector2} This vector.
   */
  subScalar (s) {
    this.x -= s;
    this.y -= s;
    return this;
  }

  /**
   * Subtracts 2 vectors and assigns the value to this vector.
   * @param {Vector2} a The minuend.
   * @param {Vector2} b The subtrahend.
   * @returns {Vector2} This vector.
   */
  subVectors (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  }

  /**
   * Multiplies element-wise a vector with this one.
   * @param {Vector2} v The vector.
   * @returns {Vector2} This vector.
   */
  multiply (v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  /**
   * Multiplies this vector by a 2x2 matrix.
   * @param {Matrix2} a The matrix to scale by.
   * @returns {Vector2} This vector.
   */
  multiplyMatrix2 (a) {
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
  }

  /**
   * Scales this vector as a projected vector (x, y, 1) by a 3x3 matrix
   * @param {Matrix3} a The matrix to scale by.
   * @returns {Vector2} This vector.
   */
  multiplyMatrix3 (a) {
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
  }

  /**
   * Scales this vector by a number.
   * @param {number} scalar The number to scale by.
   * @returns {Vector2} This vector.
   */
  multiplyScalar (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   * Multiplies the vector components element-wise.
   * @param {Vector2} a The first vector.
   * @param {Vector2} b The second vector.
   * @returns {Vector2} This vector.
   */
  multiplyVectors (a, b) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    return this;
  }

  /**
   * Divides element-wise this vector by a vector.
   * @param {Vector2} v The vector to divide by.
   * @returns {Vector2} This vector.
   */
  divide (v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }

  /**
   * Scales this vector by the inverse of the given scalar.
   * Doesn't check for divide by zero.
   * @param {number} scalar The scalar to divide by.
   * @returns {Vector2} This vector.
   */
  divideScalar (scalar) {
    return this.multiplyScalar(1.0 / scalar);
  }

  /**
   * Takes the minimum of each component of this vector and the given vector.
   * @param {Vector2} v The given vector.
   * @returns {Vector2} This vector.
   */
  min (v) {
    this.x = _Math.min(this.x, v.x);
    this.y = _Math.min(this.y, v.y);
    return this;
  }

  /**
   * Takes the maximum of each component of this vector and the given vector.
   * @param {Vector2} v The given vector.
   * @returns {Vector2} This vector.
   */
  max (v) {
    this.x = _Math.max(this.x, v.x);
    this.y = _Math.max(this.y, v.y);
    return this;
  }

  /**
   * Clamps this vector between the values of the minimum and maximum vectors.
   * This function assumes min < max, if this assumption isn't true it will not operate correctly.
   * @param {Vector2} min The minimum value vector.
   * @param {Vector2} max The maximum value vector.
   * @returns {Vector2} This vector.
   */
  clamp (min, max) {
    this.x = _Math.max(min.x, _Math.min(max.x, this.x));
    this.y = _Math.max(min.y, _Math.min(max.y, this.y));
    return this;
  }

  /**
   * Rounds each component of the vector to the lowest integer.
   * @returns {Vector2} This vector.
   */
  floor () {
    this.x = _Math.floor(this.x);
    this.y = _Math.floor(this.y);
    return this;
  }

  /**
   * Rounds each component of the vector to the highest integer.
   * @returns {Vector2} This vector.
   */
  ceil () {
    this.x = _Math.ceil(this.x);
    this.y = _Math.ceil(this.y);
    return this;
  }

  /**
   * Rounds each component of the vector via Math.round().
   * @returns {Vector2} This vector.
   */
  round () {
    this.x = _Math.round(this.x);
    this.y = _Math.round(this.y);
    return this;
  }

  /**
   * Rounds each component of the vector toward zero (down if positive, up if negative).
   * @returns {Vector2} This vector.
   */
  roundToZero () {
    this.x = (this.x < 0) ? _Math.ceil(this.x) : _Math.floor(this.x);
    this.y = (this.y < 0) ? _Math.ceil(this.y) : _Math.floor(this.y);
    return this;
  }

  /**
   * Negates each component of the vector.
   * @returns {Vector2} This vector.
   */
  negate () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  /**
   * Computes the dot product between this vector and the given vector.
   * @param {Vector2} v The given vector.
   * @returns {number} The dot product.
   */
  dot (v) {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Computes the z-component of the cross product between this vector and the given vector.
   * @param {Vector2} v The given vector.
   * @returns {number} The z-component of the cross product.
   */
  cross (v) {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * Computes the square of the length of the vector,
   * i.e. the dot product of this vector with itself.
   * @returns {number} The squared length of the vector.
   */
  lengthSq () {
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
  }

  /**
   * Computes the length of the vector. Compensates for over/underflow.
   * @returns {number} The length of the vector.
   */
  length () {
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
  }

  /**
   * Normalizes the vector, i.e. makes it unit length.
   * @returns {Vector2} This vector.
   */
  normalize () {
    return this.divideScalar(this.length());
  }

  /**
   * Computes the angle in radians with respect to the positive x-axis.
   * @returns {number} The angle between 0-2*PI.
   */
  angle () {
    let angle = _Math.atan2(this.y, this.x);
    if (angle < 0) {
      angle += 2 * _Math.PI;
    }
    return angle;
  }

  /**
   * Computes the angle between this vector and the given vector.
   * @param {Vector2} v The given vector.
   * @returns {number} The angle between the vectors.
   */
  angleTo (v) {
    const theta = this.dot(v) / (_Math.sqrt(this.lengthSq() * v.lengthSq()));
    // clamp, to handle numerical problems
    return _Math.acos(Math.max(-1, Math.min(theta, 1)));
  }

  /**
   * Computes the distance from a point measured from the origin to the point
   * this vector points to when the base translated to the origin.
   * @param {number} v The point as measured from the origin.
   * @returns {number} The distance from point to point.
   */
  distanceTo (v) {
    return _Math.sqrt(this.distanceToSquared(v));
  }

  /**
   * Computes the squared distance from a point measured from the origin to the point
   * this vector points to when the base translated to the origin.
   * @param {number} v The point as measured from the origin.
   * @returns {number} The distance from point to point.
   */
  distanceToSquared (v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  /**
   * Determines equality between this vector and the given vector.
   * @param {Vector2} v The given vector.
   * @param {number} tol The numerical tolerance.
   * @returns {boolean} True if all the component value differences are below the numeric tolerance, false if not.
   */
  equals (v, tol = 0) {
    return (_Math.abs(v.x - this.x) < tol &&
            _Math.abs(v.y - this.y) < tol);
  }

  /**
   * Sets the length of this vector/
   * @param {number} length The new length of the vector.
   * @returns {Vector2} This vector.
   */
  setLength (length) {
    return this.multiplyScalar(length / this.length());
  }

  /**
   * Computes a linear interpolation between this vector and the given vector.
   * @param {Vector2} v The vector at alpha = 1.
   * @param {number} alpha The linear interpolation factor.
   * @returns {Vector2} This vector.
   */
  lerp (v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    return this;
  }

  /**
   * Linearly interpolates vectors.
   * @param {Vector2} v1 The vector at alpha = 0.
   * @param {Vector2} v2 The vector at alpha = 1.
   * @param {number} alpha The linear interpolation factor.
   * @returns {Vector2} This vector.
   */
  lerpVectors (v1, v2, alpha) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  }

  /**
   * Loads a vector from an array.
   * @param {number} array The array with values.
   * @param {number} offset The offset to start from in the array. Default is zero.
   * @returns {Vector2} This vector.
   */
  fromArray (array, offset) {
    if (offset === undefined) {
      offset = 0;
    }
    this.x = array[offset];
    this.y = array[offset + 1];
    return this;
  }

  /**
   * Loads an array from this vector.
   * @param {number} array The array to put the values in.
   * @param {number} offset The offset to start from in the array. Default is zero.
   * @returns {Vector2} This vector.
   */
  toArray (array, offset) {
    if (array === undefined) {
      array = [];
    }
    if (offset === undefined) {
      offset = 0;
    }
    array[offset] = this.x;
    array[offset + 1] = this.y;
    return array;
  }

  /**
   * Rotates a vector by an angle.
   * @param {number} angle The angle to rotate the vector by.
   * @returns {Vector2} This vector.
   */
  rotate (angle) {
    const c = _Math.cos(angle);
    const s = _Math.sin(angle);
    const x = this.x;
    const y = this.y;
    this.x = x * c - y * s;
    this.y = x * s + y * c;
    return this;
  }

  /**
   * Rotates a vector around a point by an angle.
   * @param {Vector2} center The center of rotation.
   * @param {number} angle The angle to rotate the vector by.
   * @returns {Vector2} This vector.
   */
  rotateAround (center, angle) {
    const c = _Math.cos(angle);
    const s = _Math.sin(angle);
    const x = this.x - center.x;
    const y = this.y - center.y;
    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;
    return this;
  }

  /**
   * Computes the Householder transform on this vector.
   * @returns {Object} The Householder vector and vector scale.
   */
  getHouseholderVector () {
    return MathHelpers.householderTransform(this);
  }
}

Object.defineProperties(Vector2.prototype, {
  /**
   * @property {boolean} isVector2 Boolean to determine if vector is a Vector2.
   * @memberof Vector2
   */
  isVector2: {
    value: true,
    writable: false
  },
  /**
   * @property {number} dimension The dimension of the vector.
   * @memberof Vector2
   */
  dimension: {
    value: 2,
    writable: false
  }
});

module.exports = Vector2;
