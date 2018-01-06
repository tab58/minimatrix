'use strict';

/*
 * Base code from THREE.js authors below.
 * Additions by Tim Bright
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

const _Math = require('./stdMath.js');
const MathHelpers = require('./math-helpers.js');

/**
 * A 2-dimensional vector.
 */
class Vector3 {
  /**
   * @constructor
   * @param {number} x The x-component value.
   * @param {number} y The y-component value.
   * @param {number} z The z-component value.
   */
  constructor (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  /**
   * Sets the components of the vector.
   * @param {number} x The x-component.
   * @param {number} y The y-component.
   * @param {number} z The z-component.
   * @returns {Vector3} This vector.
   */
  set (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Sets the vector components to a scalar.
   * @param {number} scalar The scalar.
   * @returns {Vector3} This vector.
   */
  setScalar (scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    return this;
  }

  /**
   * Sets the X component of the vector.
   * @param {number} x The x-component.
   * @returns {Vector3} This vector.
   */
  setX (x) {
    this.x = x;
    return this;
  }

  /**
   * Sets the Y component of the vector.
   * @param {number} y The y-component.
   * @returns {Vector3} This vector.
   */
  setY (y) {
    this.y = y;
    return this;
  }

  /**
   * Sets the Z component of the vector.
   * @param {number} z The z-component.
   * @returns {Vector3} This vector.
   */
  setZ (z) {
    this.z = z;
    return this;
  }

  /**
   * Sets the vector component by index: [X, Y, Z]
   * @param {number} idx The index of the component (0-1).
   * @param {number} val The value to set the component to.
   * @returns {Vector3} This vector.
   */
  setComponent (index, value) {
    switch (index) {
      case 0: this.x = value; break;
      case 1: this.y = value; break;
      case 2: this.z = value; break;
      default: throw new Error('index is out of range: ' + index);
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
      case 2: return this.z;
      default: throw new Error('index is out of range: ' + index);
    }
  }

  /**
   * Clones the vector.
   * @returns {Vector3} A new vector with the same components.
   */
  clone () {
    return new this.constructor(this.x, this.y, this.z);
  }

  /**
   * Copies the component values of a vector to this vector.
   * @param {Vector3} v The vector to copy.
   * @returns {Vector3} This vector.
   */
  copy (v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  /**
   * Adds a vector to this vector.
   * @param {Vector3} v The vector to add.
   * @returns {Vector3} This vector.
   */
  add (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
      return this.addVectors(v, w);
    }
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  /**
   * Adds a scalar to every component of this vector.
   * @param {number} s The scalar to add.
   * @returns {Vector3} This vector.
   */
  addScalar (s) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  }

  /**
   * Adds 2 vectors and assigns the result to this vector.
   * @param {Vector3} a The first addend.
   * @param {Vector3} b The second addend.
   * @returns {Vector3} This vector.
   */
  addVectors (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
  }

  /**
   * Scales a vector by a scalar and adds the result to this vector.
   * @param {Vector3} v The vector.
   * @param {number} s The scalar to scale by.
   * @returns {Vector3} This vector.
   */
  addScaledVector (v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    return this;
  }

  /**
   * Subtracts a vector from this vector.
   * @param {Vector3} v The vector to subtract.
   * @returns {Vector3} This vector.
   */
  sub (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
      return this.subVectors(v, w);
    }
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  /**
   * Subtracts a scalar from each component of this vector.
   * @param {number} s The scalar to subtract.
   * @returns {Vector3} This vector.
   */
  subScalar (s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
  }

  /**
   * Subtracts 2 vectors and assigns the value to this vector.
   * @param {Vector3} a The minuend.
   * @param {Vector3} b The subtrahend.
   * @returns {Vector3} This vector.
   */
  subVectors (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  }

  /**
   * Multiplies element-wise a vector with this one.
   * @param {Vector3} v The vector.
   * @returns {Vector3} This vector.
   */
  multiply (v, w) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  }

  /**
   * Multiplies this vector by a Matrix3.
   * @param {Matrix3} m The matrix to scale this vector by.
   * @return {Vector3} This vector.
   */
  multiplyMatrix (m) {
    return this.multiplyMatrix3(m);
  }

  /**
   * Multiplies this vector by a 3x3 matrix.
   * @param {Matrix3} a The matrix to scale by.
   * @returns {Vector3} This vector.
   */
  multiplyMatrix3 (a) {
    if (!a || !a.isMatrix3) {
      console.warn('Vector3: Matrix is not a Matrix3 in .multiplyMatrix3().');
    }
    const ae = a.elements;
    const x = this.x;
    const y = this.y;
    const z = this.z;

    let a1 = ae[ 0 ];
    let a2 = ae[ 3 ];
    let a3 = ae[ 6 ];
    this.x = a1 * x + a2 * y + a3 * z;

    a1 = ae[ 1 ];
    a2 = ae[ 4 ];
    a3 = ae[ 7 ];
    this.y = a1 * x + a2 * y + a3 * z;

    a1 = ae[ 2 ];
    a2 = ae[ 5 ];
    a3 = ae[ 8 ];
    this.z = a1 * x + a2 * y + a3 * z;
    return this;
  }

  /**
   * Scales this vector by a number.
   * @param {number} scalar The number to scale by.
   * @returns {Vector3} This vector.
   */
  multiplyScalar (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  /**
   * Multiplies the vector components element-wise.
   * @param {Vector3} a The first vector.
   * @param {Vector3} b The second vector.
   * @returns {Vector3} This vector.
   */
  multiplyVectors (a, b) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this;
  }

  /**
   * Divides element-wise this vector by a vector.
   * @param {Vector3} v The vector to divide by.
   * @returns {Vector3} This vector.
   */
  divide (v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  }

  /**
   * Scales this vector by the inverse of the given scalar.
   * Doesn't check for divide by zero.
   * @param {number} scalar The scalar to divide by.
   * @returns {Vector3} This vector.
   */
  divideScalar (scalar) {
    return this.multiplyScalar(1.0 / scalar);
  }

  /**
   * Takes the minimum of each component of this vector and the given vector.
   * @param {Vector3} v The given vector.
   * @returns {Vector3} This vector.
   */
  min (v) {
    this.x = _Math.min(this.x, v.x);
    this.y = _Math.min(this.y, v.y);
    this.z = _Math.min(this.z, v.z);
    return this;
  }

  /**
   * Takes the maximum of each component of this vector and the given vector.
   * @param {Vector3} v The given vector.
   * @returns {Vector3} This vector.
   */
  max (v) {
    this.x = _Math.max(this.x, v.x);
    this.y = _Math.max(this.y, v.y);
    this.z = _Math.max(this.z, v.z);
    return this;
  }

  /**
   * Clamps this vector between the values of the minimum and maximum vectors.
   * This function assumes min < max, if this assumption isn't true it will not operate correctly.
   * @param {Vector3} min The minimum value vector.
   * @param {Vector3} max The maximum value vector.
   * @returns {Vector3} This vector.
   */
  clamp (min, max) {
    this.x = _Math.max(min.x, _Math.min(max.x, this.x));
    this.y = _Math.max(min.y, _Math.min(max.y, this.y));
    this.z = _Math.max(min.z, _Math.min(max.z, this.z));
    return this;
  }

  /**
   * Clamps this vector's length between the minimum and maximum values.
   * @param {number} min The minimum length.
   * @param {number} max The maximum length.
   * @returns {Vector3} This vector.
   */
  clampLength (min, max) {
    const length = this.length();
    return this.multiplyScalar(_Math.max(min, _Math.min(max, length)) / length);
  }

  /**
   * Rounds each component of the vector to the lowest integer.
   * @returns {Vector3} This vector.
   */
  floor () {
    this.x = _Math.floor(this.x);
    this.y = _Math.floor(this.y);
    this.z = _Math.floor(this.z);
    return this;
  }

  /**
   * Rounds each component of the vector to the highest integer.
   * @returns {Vector3} This vector.
   */
  ceil () {
    this.x = _Math.ceil(this.x);
    this.y = _Math.ceil(this.y);
    this.z = _Math.ceil(this.z);
    return this;
  }

  /**
   * Rounds each component of the vector via Math.round().
   * @returns {Vector3} This vector.
   */
  round () {
    this.x = _Math.round(this.x);
    this.y = _Math.round(this.y);
    this.z = _Math.round(this.z);
    return this;
  }

  /**
   * Rounds each component of the vector toward zero (down if positive, up if negative).
   * @returns {Vector3} This vector.
   */
  roundToZero () {
    this.x = (this.x < 0) ? _Math.ceil(this.x) : _Math.floor(this.x);
    this.y = (this.y < 0) ? _Math.ceil(this.y) : _Math.floor(this.y);
    this.z = (this.z < 0) ? _Math.ceil(this.z) : _Math.floor(this.z);
    return this;
  }

  /**
   * Negates each component of the vector.
   * @returns {Vector3} This vector.
   */
  negate () {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  /**
   * Computes the dot product between this vector and the given vector.
   * @param {Vector3} v The given vector.
   * @returns {number} The dot product.
   */
  dot (v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /**
   * Computes the square of the length of the vector,
   * i.e. the dot product of this vector with itself.
   * @returns {number} The squared length of the vector.
   */
  lengthSq () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  /**
   * Computes the length of the vector. Compensates for over/underflow.
   * @returns {number} The length of the vector.
   */
  length () {
    return _Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * Normalizes the vector, i.e. makes it unit length.
   * @returns {Vector3} This vector.
   */
  normalize () {
    return this.divideScalar(this.length());
  }

  /**
   * Sets the length of this vector/
   * @param {number} length The new length of the vector.
   * @returns {Vector3} This vector.
   */
  setLength (length) {
    return this.multiplyScalar(length / this.length());
  }

  /**
   * Computes a linear interpolation between this vector and the given vector.
   * @param {Vector3} v The vector at alpha = 1.
   * @param {number} alpha The linear interpolation factor.
   * @returns {Vector3} This vector.
   */
  lerp (v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    return this;
  }

  /**
   * Computes the linear interpolation between two vectors.
   * @param {Vector3} v1 The vector at alpha = 0.
   * @param {Vector3} v2 The vector at alpha = 1.
   * @param {number} alpha The linear interpolation factor.
   * @returns {Vector3} This vector.
   */
  lerpVectors (v1, v2, alpha) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  }

  /**
   * Computes the cross product between this vector and the given vector.
   * @param {Vector3} v The given vector.
   * @returns {Vector3} This vector.
   */
  cross (v) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    this.x = y * v.z - z * v.y;
    this.y = z * v.x - x * v.z;
    this.z = x * v.y - y * v.x;
    return this;
  }

  /**
   * Computes the cross product (a x b).
   * @param {Vector3} a The first vector.
   * @param {Vector3} b The second vector.
   * @returns {Vector3} This vector.
   */
  crossVectors (a, b) {
    const ax = a.x;
    const ay = a.y;
    const az = a.z;
    const bx = b.x;
    const by = b.y;
    const bz = b.z;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  }

  /**
   * Calculates the projection of this vector onto the given vector.
   * @param {Vector3} vector The given vector.
   * @returns {Vector3} This vector.
   */
  projectOnVector (vector) {
    const scalar = vector.dot(this) / vector.lengthSq();
    return this.copy(vector).multiplyScalar(scalar);
  }

  /**
   * Assigns zero to component values below the numerical tolerance.
   * @param {number} tol The numerical tolerance.
   * @returns {Vector3} This vector.
   */
  thresholdValuesToZero (tol) {
    this.x = (_Math.abs(this.x) < tol ? 0 : this.x);
    this.y = (_Math.abs(this.y) < tol ? 0 : this.y);
    this.z = (_Math.abs(this.z) < tol ? 0 : this.z);
    return this;
  }

  /**
   * Calculates the angle between this vector and the given vector.
   * @param {Vector3} v The given vector.
   * @returns {number} The angle.
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
    const dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }

  /**
   * Determines equality between this vector and the given vector.
   * @param {Vector3} v The given vector.
   * @param {number} tol The numerical tolerance.
   * @returns {boolean} True if all the component value differences are below the numeric tolerance, false if not.
   */
  equals (v, tol = 0) {
    return (_Math.abs(v.x - this.x) < tol &&
            _Math.abs(v.y - this.y) < tol &&
            _Math.abs(v.z - this.z) < tol);
  }

  /**
   * Loads a vector from an array.
   * @param {number} array The array with values.
   * @param {number} offset The offset to start from in the array. Default is zero.
   * @returns {Vector3} This vector.
   */
  fromArray (array, offset) {
    if (offset === undefined) {
      offset = 0;
    }
    this.x = array[ offset ];
    this.y = array[ offset + 1 ];
    this.z = array[ offset + 2 ];
    return this;
  }

  /**
   * Loads an array from this vector.
   * @param {number[]} array The array to put the values in.
   * @param {number} offset The offset to start from in the array. Default is zero.
   * @returns {number[]} The array argument.
   */
  toArray (array, offset) {
    if (array === undefined) {
      array = [];
    }
    if (offset === undefined) {
      offset = 0;
    }
    array[ offset ] = this.x;
    array[ offset + 1 ] = this.y;
    array[ offset + 2 ] = this.z;
    return array;
  }

  /**
   * Computes the Householder transform on this vector.
   * @returns {Object} The Householder vector and vector scale.
   */
  getHouseholderVector () {
    return MathHelpers.householderTransform(this);
  }
}

Object.defineProperties(Vector3.prototype, {
  /**
   * Clamps the components of this vector between the minimum and maximum values.
   * @function clampScalar
   * @memberof Vector3
   * @param {number} minVal The minimum value.
   * @param {number} maxVal The maximum value.
   * @returns {Vector3} This vector.
   */
  clampScalar: {
    value: (function () {
      const min = new Vector3();
      const max = new Vector3();
      return function clampScalar (minVal, maxVal) {
        min.set(minVal, minVal, minVal);
        max.set(maxVal, maxVal, maxVal);
        return this.clamp(min, max);
      };
    }()),
    writable: false
  },
  /**
   * Projects this vector onto a plane defined by the normal to the plane.
   * @function projectOnPlane
   * @memberof Vector3
   * @param {Vector3} planeNormal The plane normal.
   * @returns {Vector3} This vector.
   */
  projectOnPlane: {
    value: (function () {
      const v1 = new Vector3();
      return function projectOnPlane (planeNormal) {
        v1.copy(this).projectOnVector(planeNormal);
        return this.sub(v1);
      };
    }()),
    writable: false
  },
  /**
   * Reflects this vector through a plane defined by its normal.
   * @function reflect
   * @memberof Vector3
   * @param {Vector3} The plane normal.
   * @returns {Vector3} This vector.
   */
  reflect: {
    value: (function () {
      // reflect incident vector off plane orthogonal to normal
      // normal is assumed to have unit length
      const v1 = new Vector3();
      return function reflect (normal) {
        return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
      };
    }()),
    writable: false
  },
  /**
   * @property {boolean} isVector3 Boolean to determine if vector is a Vector2.
   * @memberof Vector3
   */
  isVector3: {
    value: true,
    writable: false
  },
  /**
   * @property {number} dimension The dimension of the vector.
   * @memberof Vector3
   */
  dimension: {
    value: 3,
    writable: false
  }
});

module.exports = Vector3;
