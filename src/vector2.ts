/*
 * Base code from THREE.js authors below.
 * Additions by Tim Bright
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */
import _Math from './core';
import { Vector } from './interfaces';
import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';

/**
 * A 2-dimensional vector.
 */
export class Vector2 implements Vector {
  private _x: number;
  private _y: number;

  public get x (): number { return this._x; }
  public get y (): number { return this._y; }

  public readonly dimension: number = 2;

  /**
   * @constructor
   * @param {number} x The x-component value.
   * @param {number} y The y-component value.
   */
  constructor (x: number, y: number) {
    this._x = x || 0;
    this._y = y || 0;
  }

  /**
   * Sets the components of the vector.
   * @param {number} x The x-component.
   * @param {number} y The y-component.
   * @returns {Vector2} This vector.
   */
  set (x: number, y: number): this {
    this._x = x;
    this._y = y;
    return this;
  }

  /**
   * Sets the vector components to a scalar.
   * @param {number} scalar The scalar.
   * @returns {Vector2} This vector.
   */
  setScalar (scalar: number): this {
    this._x = scalar;
    this._y = scalar;
    return this;
  }

  /**
   * Sets the X component of the vector.
   * @param {number} X The x-component.
   * @returns {Vector2} This vector.
   */
  setX (x: number): this {
    this._x = x;
    return this;
  }

  /**
   * Sets the Y component of the vector.
   * @param {number} Y The y-component.
   * @returns {Vector2} This vector.
   */
  setY (y: number): this {
    this._y = y;
    return this;
  }

  /**
   * Sets the vector component by index: [X, Y, Z]
   * @param {number} idx The index of the component (0-1).
   * @param {number} val The value to set the component to.
   * @returns {Vector2} This vector.
   */
  setComponent (idx: number, val: number): this {
    switch (idx) {
      case 0: this._x = val; break;
      case 1: this._y = val; break;
      default: throw new Error('index is out of range: ' + idx);
    }
    return this;
  }

  /**
   * Gets the vector component by index: [X, Y, Z]
   * @param {number} index The index of the component (0-1).
   * @returns {number} The component value.
   */
  getComponent (index: number): number {
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
  clone (): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * Copies the component values of a vector to this vector.
   * @param {Vector2} v The vector to copy.
   * @returns {Vector2} This vector.
   */
  copy (v: this): this {
    this._x = v.x;
    this._y = v.y;
    return this;
  }

  /**
   * Adds a vector to this vector.
   * @param {Vector2} v The vector to add.
   * @returns {Vector2} This vector.
   */
  add (v: this): this {
    this._x += v.x;
    this._y += v.y;
    return this;
  }

  /**
   * Adds a scalar to every component of this vector.
   * @param {number} s The scalar to add.
   * @returns {Vector2} This vector.
   */
  addScalar (s: number): this {
    this._x += s;
    this._y += s;
    return this;
  }

  /**
   * Adds 2 vectors and assigns the result to this vector.
   * @param {Vector2} a The first addend.
   * @param {Vector2} b The second addend.
   * @returns {Vector2} This vector.
   */
  addVectors (a: this, b: this): this {
    this._x = a.x + b.x;
    this._y = a.y + b.y;
    return this;
  }

  /**
   * Scales a vector by a scalar and adds the result to this vector.
   * @param {Vector2} v The vector.
   * @param {number} s The scalar to scale by.
   * @returns {Vector2} This vector.
   */
  addScaledVector (v: this, s: number): this {
    this._x += v.x * s;
    this._y += v.y * s;
    return this;
  }

  /**
   * Subtracts a vector from this vector.
   * @param {Vector2} v The vector to subtract.
   * @returns {Vector2} This vector.
   */
  sub (v: this): this {
    this._x -= v.x;
    this._y -= v.y;
    return this;
  }

  /**
   * Subtracts a scalar from each component of this vector.
   * @param {number} s The scalar to subtract.
   * @returns {Vector2} This vector.
   */
  subScalar (s: number): this {
    this._x -= s;
    this._y -= s;
    return this;
  }

  /**
   * Subtracts 2 vectors and assigns the value to this vector.
   * @param {Vector2} a The minuend.
   * @param {Vector2} b The subtrahend.
   * @returns {Vector2} This vector.
   */
  subVectors (a: this, b: this): this {
    this._x = a.x - b.x;
    this._y = a.y - b.y;
    return this;
  }

  /**
   * Multiplies element-wise a vector with this one.
   * @param {Vector2} v The vector.
   * @returns {Vector2} This vector.
   */
  multiply (v: this): this {
    this._x *= v.x;
    this._y *= v.y;
    return this;
  }

  /**
   * Scales this vector by a number.
   * @param {number} scalar The number to scale by.
   * @returns {Vector2} This vector.
   */
  multiplyScalar (scalar: number): this {
    this._x *= scalar;
    this._y *= scalar;
    return this;
  }

  /**
   * Multiplies the vector components element-wise.
   * @param {Vector2} a The first vector.
   * @param {Vector2} b The second vector.
   * @returns {Vector2} This vector.
   */
  multiplyVectors (a: this, b: this): this {
    this._x = a.x * b.x;
    this._y = a.y * b.y;
    return this;
  }

  /**
   * Multiplies the vector by a 2x2 matrix.
   * @param {Vector2} m The matrix to scale by.
   * @returns {Vector2} This vector.
   */
  multiplyMatrix2 (m: Matrix2): this {
    return m.transformVector2(this) as this;
  }

  /**
   * Scales this vector as a projected vector (x, y, 1) by a 3x3 matrix.
   * @param m The 3x3 matrix.
   */
  multiplyMatrix3 (m: Matrix3): this {
    return m.transformVector2(this) as this;
  }

  /**
   * Divides element-wise this vector by a vector.
   * @param {Vector2} v The vector to divide by.
   * @returns {Vector2} This vector.
   */
  divide (v: this): this {
    this._x /= v.x;
    this._y /= v.y;
    return this;
  }

  /**
   * Scales this vector by the inverse of the given scalar.
   * Doesn't check for divide by zero.
   * @param {number} scalar The scalar to divide by.
   * @returns {Vector2} This vector.
   */
  divideScalar (scalar: number): this {
    return this.multiplyScalar(1.0 / scalar);
  }

  /**
   * Takes the minimum of each component of this vector and the given vector.
   * @param {Vector2} v The given vector.
   * @returns {Vector2} This vector.
   */
  min (v: this): this {
    this._x = _Math.min(this.x, v.x);
    this._y = _Math.min(this.y, v.y);
    return this;
  }

  /**
   * Takes the maximum of each component of this vector and the given vector.
   * @param {Vector2} v The given vector.
   * @returns {Vector2} This vector.
   */
  max (v: this): this {
    this._x = _Math.max(this.x, v.x);
    this._y = _Math.max(this.y, v.y);
    return this;
  }

  /**
   * Clamps this vector between the values of the minimum and maximum vectors.
   * This function assumes min < max, if this assumption isn't true it will not operate correctly.
   * @param {Vector2} min The minimum value vector.
   * @param {Vector2} max The maximum value vector.
   * @returns {Vector2} This vector.
   */
  clamp (min: this, max: this): this {
    this._x = _Math.max(min.x, _Math.min(max.x, this.x));
    this._y = _Math.max(min.y, _Math.min(max.y, this.y));
    return this;
  }

  /**
   * Rounds each component of the vector to the lowest integer.
   * @returns {Vector2} This vector.
   */
  floor (): this {
    this._x = _Math.floor(this.x);
    this._y = _Math.floor(this.y);
    return this;
  }

  /**
   * Rounds each component of the vector to the highest integer.
   * @returns {Vector2} This vector.
   */
  ceil (): this {
    this._x = _Math.ceil(this.x);
    this._y = _Math.ceil(this.y);
    return this;
  }

  /**
   * Rounds each component of the vector via _Math.round().
   * @returns {Vector2} This vector.
   */
  round (): this {
    this._x = _Math.round(this.x);
    this._y = _Math.round(this.y);
    return this;
  }

  /**
   * Rounds each component of the vector toward zero (down if positive, up if negative).
   * @returns {Vector2} This vector.
   */
  roundToZero (): this {
    this._x = (this.x < 0) ? _Math.ceil(this.x) : _Math.floor(this.x);
    this._y = (this.y < 0) ? _Math.ceil(this.y) : _Math.floor(this.y);
    return this;
  }

  /**
   * Negates each component of the vector.
   * @returns {Vector2} This vector.
   */
  negate (): this {
    this._x = -this.x;
    this._y = -this.y;
    return this;
  }

  /**
   * Computes the dot product between this vector and the given vector.
   * @param {Vector2} v The given vector.
   * @returns {number} The dot product.
   */
  dot (v: this): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Computes the z-component of the cross product between this vector and the given vector.
   * @param {Vector2} v The given vector.
   * @returns {number} The z-component of the cross product.
   */
  cross (v: this): number {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * Computes the square of the length of the vector,
   * i.e. the dot product of this vector with itself.
   * @returns {number} The squared length of the vector.
   */
  lengthSq (): number {
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
  length (): number {
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
  normalize (): this {
    return this.divideScalar(this.length());
  }

  /**
   * Computes the angle in radians with respect to the positive x-axis.
   * @returns {number} The angle between 0-2*PI.
   */
  angle (): number {
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
  angleTo (v: this): number {
    const theta = this.dot(v) / (_Math.sqrt(this.lengthSq() * v.lengthSq()));
    // clamp, to handle numerical problems
    return _Math.acos(_Math.max(-1, _Math.min(theta, 1)));
  }

  /**
   * Computes the distance from a point measured from the origin to the point
   * this vector points to when the base translated to the origin.
   * @param {Vector2} v The point as measured from the origin.
   * @returns {number} The distance from point to point.
   */
  distanceTo (v: this): number {
    return _Math.sqrt(this.distanceToSquared(v));
  }

  /**
   * Computes the squared distance from a point measured from the origin to the point
   * this vector points to when the base translated to the origin.
   * @param {Vector2} v The point as measured from the origin.
   * @returns {number} The distance from point to point.
   */
  distanceToSquared (v: this): number {
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
  equals (v: this, tol = 0): boolean {
    return (_Math.abs(v.x - this.x) < tol &&
            _Math.abs(v.y - this.y) < tol);
  }

  /**
   * Sets the length of this vector/
   * @param {number} length The new length of the vector.
   * @returns {Vector2} This vector.
   */
  setLength (length: number): this {
    return this.multiplyScalar(length / this.length());
  }

  /**
   * Computes a linear interpolation between this vector and the given vector.
   * @param {Vector2} v The vector at alpha = 1.
   * @param {number} alpha The linear interpolation factor.
   * @returns {Vector2} This vector.
   */
  lerp (v: this, alpha: number): this {
    this._x += (v.x - this.x) * alpha;
    this._y += (v.y - this.y) * alpha;
    return this;
  }

  /**
   * Linearly interpolates vectors.
   * @param {Vector2} v1 The vector at alpha = 0.
   * @param {Vector2} v2 The vector at alpha = 1.
   * @param {number} alpha The linear interpolation factor.
   * @returns {Vector2} This vector.
   */
  lerpVectors (v1: this, v2: this, alpha: number): this {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  }

  /**
   * Loads a vector from an array.
   * @param {number[]} array The array with values.
   * @param {number} offset The offset to start from in the array. Default is zero.
   * @returns {Vector2} This vector.
   */
  fromArray (array: number[], offset: number): this {
    if (offset === undefined) {
      offset = 0;
    }
    this._x = array[offset];
    this._y = array[offset + 1];
    return this;
  }

  /**
   * Loads an array from this vector.
   * @param {number[]} array The array to put the values in.
   * @param {number} offset The offset to start from in the array. Default is zero.
   * @returns {Vector2} This vector.
   */
  toArray (array: number[] = [], offset: number = 0): number[] {
    array[offset] = this.x;
    array[offset + 1] = this.y;
    return array;
  }

  /**
   * Rotates a vector by an angle.
   * @param {number} angle The angle to rotate the vector by.
   * @returns {Vector2} This vector.
   */
  rotate (angle: number): this {
    const c = _Math.cos(angle);
    const s = _Math.sin(angle);
    const x = this.x;
    const y = this.y;
    this._x = x * c - y * s;
    this._y = x * s + y * c;
    return this;
  }

  /**
   * Rotates a vector around a point by an angle.
   * @param {Vector2} center The center of rotation.
   * @param {number} angle The angle to rotate the vector by.
   * @returns {Vector2} This vector.
   */
  rotateAround (center: this, angle: number): this {
    const c = _Math.cos(angle);
    const s = _Math.sin(angle);
    const x = this.x - center.x;
    const y = this.y - center.y;
    this._x = x * c - y * s + center.x;
    this._y = x * s + y * c + center.y;
    return this;
  }
}