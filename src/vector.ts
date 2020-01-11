import _Math from './core';
import { Matrix } from './matrix';

const isPositiveInteger = (x: number): boolean => x >= 0 && x === _Math.floor(x);

/**
 * A 2-dimensional vector.
 */
export class Vector {
  protected _components: number[];
  
  public readonly dimension: number;

  constructor (n: number) {
    const arr = [];
    for (let i = 0; i < n; ++i) { arr.push(0); }
    this._components = arr;
    this.dimension = n;
  }

  get (i: number): number {
    return this.getComponent(i);
  }

  set (i: number, value: number): this {
    return this.setComponent(i, value);
  }

  /**
   * Sets the components of the vector.
   * @param {number} x The x-component.
   * @param {number} y The y-component.
   * @param {number} z The z-component.
   * @returns {Vector} This vector.
   */
  setComponents (elements: number[]): this {
    const n = elements.length;
    const m = _Math.min(this.dimension, n);
    for (let i = 0; i < m; ++i) { this._components[i] = elements[i]; }
    return this;
  }

  /**
   * Sets the vector components to a scalar.
   * @param {number} scalar The scalar.
   * @returns {Vector} This vector.
   */
  setScalar (scalar: number): this {
    const n = this._components.length;
    for (let i = 0; i < n; ++i) { this._components[i] = scalar; }
    return this;
  }

  /**
   * Sets the vector component by index.
   * @param {number} idx The index of the component.
   * @param {number} val The value to set the component to.
   * @returns {Vector} This vector.
   */
  setComponent (index: number, value: number): this {
    const n = this._components.length;
    if (index < n && isPositiveInteger(index)) {
      this._components[index] = value;
    } else {
      throw new Error('index is out of range: ' + index);
    }
    return this;
  }

  /**
   * Gets the vector component by index.
   * @param {number} index The index of the component.
   * @returns {number} The component value.
   */
  getComponent (index: number): number {
    const n = this._components.length;
    if (index < n && isPositiveInteger(index)) {
      return this._components[index];
    } else {
      throw new Error('index is out of range: ' + index);
    }
  }

  /**
   * Clones the vector.
   * @returns {Vector} A new vector with the same components.
   */
  clone (): this {
    const n = this._components.length;
    return new Vector(n).copy(this) as this;
  }

  /**
   * Copies the component values of a vector to this vector.
   * @param {Vector} v The vector to copy.
   * @returns {Vector} This vector.
   */
  copy (v: this): this {
    if (v.dimension === this.dimension) {
      return this.setComponents(v._components);
    } else {
      throw new Error(`Vector.copy(): vector dimensions don't agree.`);
    }
  }

  /**
   * Adds a vector to this vector.
   * @param {Vector} v The vector to add.
   * @returns {Vector} This vector.
   */
  add (v: this): this {
    if (v.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) { 
        this._components[i] += v._components[i];
      }
      return this;
    } else {
      throw new Error(`Vector.add(): vector dimensions don't agree.`);
    }
  }

  /**
   * Adds a scalar to every component of this vector.
   * @param {number} s The scalar to add.
   * @returns {Vector} This vector.
   */
  addScalar (s: number): this {
    const n = this._components.length;
    for (let i = 0; i < n; ++i) { 
      this._components[i] += s;
    }
    return this;
  }

  /**
   * Adds 2 vectors and assigns the result to this vector.
   * @param {Vector} a The first addend.
   * @param {Vector} b The second addend.
   * @returns {Vector} This vector.
   */
  addVectors (a: this, b: this): this {
    if (a.dimension === this.dimension && b.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) { 
        this._components[i] = a._components[i] + b._components[i];
      }
      return this;
    } else {
      throw new Error(`Vector.addVectors(): vector dimensions don't agree.`);
    }
  }

  /**
   * Scales a vector by a scalar and adds the result to this vector.
   * @param {Vector} v The vector.
   * @param {number} s The scalar to scale by.
   * @returns {Vector} This vector.
   */
  addScaledVector (v: this, s: number): this {
    if (v.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) { 
        this._components[i] += v._components[i] * s;
      }
      return this;
    } else {
      throw new Error(`Vector.addScaledVector(): vector dimensions don't agree.`);
    }
  }

  /**
   * Subtracts a vector from this vector.
   * @param {Vector} v The vector to subtract.
   * @returns {Vector} This vector.
   */
  sub (v: this): this {
    if (v.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) { 
        this._components[i] -= v._components[i];
      }
      return this;
    } else {
      throw new Error(`Vector.sub(): vector dimensions don't agree.`);
    }
  }

  /**
   * Subtracts a scalar from each component of this vector.
   * @param {number} s The scalar to subtract.
   * @returns {Vector} This vector.
   */
  subScalar (s: number): this {
    const n = this._components.length;
    for (let i = 0; i < n; ++i) { 
      this._components[i] -= s;
    }
    return this;
  }

  /**
   * Subtracts 2 vectors and assigns the value to this vector.
   * @param {Vector} a The minuend.
   * @param {Vector} b The subtrahend.
   * @returns {Vector} This vector.
   */
  subVectors (a: this, b: this): this {
    if (a.dimension === this.dimension && b.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) { 
        this._components[i] = a._components[i] - b._components[i];
      }
      return this;
    } else {
      throw new Error(`Vector.subVectors(): vector dimensions don't agree.`);
    }
  }

  /**
   * Multiplies element-wise a vector with this one.
   * @param {Vector} v The vector.
   * @returns {Vector} This vector.
   */
  multiply (v: this): this {
    if (v.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) { 
        this._components[i] *= v._components[i];
      }
      return this;
    } else {
      throw new Error(`Vector.multiply(): vector dimensions don't agree.`);
    }
  }

  /**
   * Scales this vector by a number.
   * @param {number} scalar The number to scale by.
   * @returns {Vector} This vector.
   */
  multiplyScalar (scalar: number): this {
    const n = this._components.length;
    for (let i = 0; i < n; ++i) { 
      this._components[i] *= scalar;
    }
    return this;
  }

  /**
   * Multiplies the vector components element-wise.
   * @param {Vector} a The first vector.
   * @param {Vector} b The second vector.
   * @returns {Vector} This vector.
   */
  multiplyVectors (a: this, b: this): this {
    if (a.dimension === this.dimension && b.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) { 
        this._components[i] = a._components[i] * b._components[i];
      }
      return this;
    } else {
      throw new Error(`Vector.multiplyVectors(): vector dimensions don't agree.`);
    }
  }

  /**
   * Divides element-wise this vector by a vector.
   * @param {Vector} v The vector to divide by.
   * @returns {Vector} This vector.
   */
  divide (v: this): this {
    if (v.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) { 
        this._components[i] /= v._components[i];
      }
      return this;
    } else {
      throw new Error(`Vector.divide(): vector dimensions don't agree.`);
    }
  }

  /**
   * Scales this vector by the inverse of the given scalar.
   * Doesn't check for divide by zero.
   * @param {number} scalar The scalar to divide by.
   * @returns {Vector} This vector.
   */
  divideScalar (scalar: number): this {
    return this.multiplyScalar(1.0 / scalar);
  }

  /**
   * Calculates the dyadic product (v*v^T) of the matrix.
   * @param scalar A scalar to multiply the outer product by.
   */
  getDyadicProduct (scalar = 1): Matrix {
    const n = this.dimension;
    const te = this._components;
    const me = [];
    for (let i = 0; i < n; ++i) {
      const vi = te[i];
      for (let j = 0; j < n; ++j) {
        const vj = te[j];
        me[i + j * n] = vi * vj * scalar;
      }
    }
    return new Matrix(n, n).setElements(...me);
  }

  /**
   * Takes the minimum of each component of this vector and the given vector.
   * @param {Vector} v The given vector.
   * @returns {Vector} This vector.
   */
  min (v: this): this {
    if (v.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) {
        this._components[i] = _Math.min(this._components[i], v._components[i]);
      }
      return this;
    } else {
      throw new Error(`Vector.min(): vector dimensions don't agree.`);
    }
  }

  /**
   * Takes the maximum of each component of this vector and the given vector.
   * @param {Vector} v The given vector.
   * @returns {Vector} This vector.
   */
  max (v: this): this {
    if (v.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) {
        this._components[i] = _Math.max(this._components[i], v._components[i]);
      }
      return this;
    } else {
      throw new Error(`Vector.max(): vector dimensions don't agree.`);
    }
  }

  /**
   * Clamps this vector between the values of the minimum and maximum vectors.
   * This function assumes min < max, if this assumption isn't true it will not operate correctly.
   * @param {Vector} min The minimum value vector.
   * @param {Vector} max The maximum value vector.
   * @returns {Vector} This vector.
   */
  clamp (min: this, max: this): this {
    if (min.dimension === this.dimension &&
      max.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) {
        this._components[i] = _Math.max(min._components[i], _Math.min(max._components[i], this._components[i]));
      }
      return this;
    } else {
      throw new Error(`Vector.clamp(): vector dimensions don't agree.`);
    }
  }

  /**
   * Clamps this vector's length between the minimum and maximum values.
   * @param {number} min The minimum length.
   * @param {number} max The maximum length.
   * @returns {Vector} This vector.
   */
  clampLength (min: number, max: number): this {
    const length = this.length();
    return this.multiplyScalar(_Math.max(min, _Math.min(max, length)) / length);
  }

  /**
   * Rounds each component of the vector to the lowest integer.
   * @returns {Vector} This vector.
   */
  floor (): this {
    const n = this._components.length;
    for (let i = 0; i < n; ++i) {
      this._components[i] = _Math.floor(this._components[i]);
    }
    return this;
  }

  /**
   * Rounds each component of the vector to the highest integer.
   * @returns {Vector} This vector.
   */
  ceil (): this {
    const n = this._components.length;
    for (let i = 0; i < n; ++i) {
      this._components[i] = _Math.ceil(this._components[i]);
    }
    return this;
  }

  /**
   * Rounds each component of the vector via _Math.round().
   * @returns {Vector} This vector.
   */
  round (): this {
    const n = this._components.length;
    for (let i = 0; i < n; ++i) {
      this._components[i] = _Math.round(this._components[i]);
    }
    return this;
  }

  /**
   * Rounds each component of the vector toward zero (down if positive, up if negative).
   * @returns {Vector} This vector.
   */
  roundToZero (): this {
    const n = this._components.length;
    for (let i = 0; i < n; ++i) {
      const v = this._components[i];
      this._components[i] = (v < 0) ? _Math.ceil(v) : _Math.floor(v);
    }
    return this;
  }

  /**
   * Negates each component of the vector.
   * @returns {Vector} This vector.
   */
  negate (): this {const n = this._components.length;
    for (let i = 0; i < n; ++i) {
      this._components[i] = -this._components[i];
    }
    return this;
  }

  /**
   * Computes the dot product between this vector and the given vector.
   * @param {Vector} v The given vector.
   * @returns {number} The dot product.
   */
  dot (v: this): number {
    if (this.dimension === v.dimension) {
      // use basic Kahan summation
      let sum = 0;
      let comp = 0;
      const n = this._components.length;
      for (let i = 0; i < n; ++i) {
        const y = (this._components[i] * v._components[i]) - comp;
        const t = sum + y;
        comp = (t - sum) - y;
        sum = t;
      }
      return sum;
    } else {
      throw new Error(`Vector.dot(): vector dimensions don't agree.`);
    }
  }

  /**
   * Computes the square of the length of the vector,
   * i.e. the dot product of this vector with itself.
   * @returns {number} The squared length of the vector.
   */
  lengthSq (): number {
    // improved Kahan-Babushka algorithm
    let sum = 0;
    let comp = 0;
    const n = this._components.length;
    for (let i = 0; i < n; ++i) {
      const v = this._components[i];
      const xi = v * v;
      const t = sum + xi;
      if (sum >= xi) {  // changed; sum and xi will always be positive
        comp += ((sum - t) + xi);
      } else {
        comp += ((xi - t) + sum);
      }
      sum = t;
    }
    return sum + comp;
  }

  /**
   * Computes the length of the vector. Compensates for over/underflow.
   * @returns {number} The length of the vector.
   */
  length (): number {
    return _Math.sqrt(this.lengthSq());
  }

  /**
   * Normalizes the vector, i.e. makes it unit length.
   * @returns {Vector} This vector.
   */
  normalize (): this {
    return this.divideScalar(this.length());
  }

  /**
   * Sets the length of this vector/
   * @param {number} length The new length of the vector.
   * @returns {Vector} This vector.
   */
  setLength (length: number): this {
    return this.multiplyScalar(length / this.length());
  }

  /**
   * Computes a linear interpolation between this vector and the given vector.
   * @param {Vector} v The vector at alpha = 1.
   * @param {number} alpha The linear interpolation factor.
   * @returns {Vector} This vector.
   */
  lerp (v: this, alpha: number): this {
    if (v.dimension === this.dimension) {
      const n = this._components.length;
      for (let i = 0; i < n; ++i) {
        this._components[i] += (v._components[i] - this._components[i]) * alpha;
      }
      return this;
    } else {
      throw new Error(`Vector.lerp(): vector dimensions don't agree.`);
    }
  }

  /**
   * Computes the linear interpolation between two vectors.
   * @param {Vector} v1 The vector at alpha = 0.
   * @param {Vector} v2 The vector at alpha = 1.
   * @param {number} alpha The linear interpolation factor.
   * @returns {Vector} This vector.
   */
  lerpVectors (v1: this, v2: this, alpha: number): this {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1) as this;
  }

  /**
   * Calculates the projection of this vector onto the given vector.
   * @param {Vector} vector The given vector.
   * @returns {Vector} This vector.
   */
  projectOnVector (vector: this): this {
    const scalar = vector.dot(this) / vector.lengthSq();
    return this.copy(vector).multiplyScalar(scalar);
  }

  /**
   * Calculates the angle between this vector and the given vector.
   * @param {Vector} v The given vector.
   * @returns {number} The angle.
   */
  angleTo (v: this): number {
    const theta = this.dot(v) / (_Math.sqrt(this.lengthSq() * v.lengthSq()));
    // clamp, to handle numerical problems
    return _Math.acos(_Math.max(-1, _Math.min(theta, 1)));
  }

  /**
   * Computes the distance from a point measured from the origin to the point
   * this vector points to when the base translated to the origin.
   * @param {Vector} v The point as measured from the origin.
   * @returns {number} The distance from point to point.
   */
  distanceTo (v: this): number {
    return _Math.sqrt(this.distanceToSquared(v));
  }

  /**
   * Computes the squared distance from a point measured from the origin to the point
   * this vector points to when the base translated to the origin.
   * @param {number} v The point as measured from the origin.
   * @returns {number} The distance from point to point.
   */
  distanceToSquared (v: this): number {
    // improved Kahan-Babushka algorithm
    let sum = 0;
    let comp = 0;
    const n = this._components.length;
    for (let i = 0; i < n; ++i) {
      const vi = this._components[i] - v._components[i];
      const xi = vi * vi;
      const t = sum + xi;
      if (sum >= xi) {  // changed; sum and xi will always be positive
        comp += ((sum - t) + xi);
      } else {
        comp += ((xi - t) + sum);
      }
      sum = t;
    }
    return sum + comp;
  }

  /**
   * Loads a vector from an array.
   * @param {number} array The array with values.
   * @param {number} offset The offset to start from in the array. Default is zero.
   * @returns {Vector3} This vector.
   */
  fromArray (array: number[], offset = 0): this {
    const n = this.dimension;
    const m = offset + n;
    if (array.length >= m) {
      for (let i = 0; i < n; ++i) {
        this._components[i] = array[offset + i];
      }
      return this;
    } else {
      throw new Error(`Vector.fromArray(): array length, offset, and vector dimension do not match.`);
    }
  }

  /**
   * Loads an array from this vector.
   * @param {number[]} array The array to put the values in.
   * @param {number} offset The offset to start from in the array. Default is zero.
   * @returns {number[]} The array argument.
   */
  toArray (array?: number[], offset = 0): number[] {
    if (array === undefined) {
      return this._components.slice(offset);
    } else {
      const n = this.dimension;
      for (let i = 0; i < n; ++i) {
        array[offset + i] = this._components[i];
      }
      return array;
    }
  }
}