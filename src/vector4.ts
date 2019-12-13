/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */
import _Math from './core';
import { Matrix4 } from './matrix4';
import { Vector } from './interfaces';

export class Vector4 implements Vector {
  private _x: number;
  private _y: number;
  private _z: number;
  private _w: number;

  public get x (): number { return this._x; }
  public get y (): number { return this._y; }
  public get z (): number { return this._z; }
  public get w (): number { return this._w; }

  public readonly dimension: number = 4;
  
  constructor (x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }

  set (x: number, y: number, z: number, w: number): this {
		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;
		return this;
	}

	setScalar (scalar: number): this {
		this._x = scalar;
		this._y = scalar;
		this._z = scalar;
		this._w = scalar;
		return this;
	}

	setX (x: number): this {
		this._x = x;
		return this;
	}

	setY (y: number): this {
		this._y = y;
		return this;
	}

	setZ (z: number): this {
		this._z = z;
		return this;
	}

	setW (w: number): this {
		this._w = w;
		return this;
	}

	setComponent (index: number, value: number): this {
		switch (index) {
			case 0: this._x = value; break;
			case 1: this._y = value; break;
			case 2: this._z = value; break;
			case 3: this._w = value; break;
			default: throw new Error(`index is out of range: ${index}`);
		}
		return this;
	}

	getComponent (index: number): number {
		switch (index) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw new Error(`index is out of range: ${index}`);
		}
	}

	clone (): this {
		return new Vector4(this._x, this._y, this._z, this._w) as this;
	}

	copy (v: this): this {
		this._x = v.x;
		this._y = v.y;
		this._z = v.z;
		this._w = v.w;
		return this;
	}

	add (v: this): this {
		this._x += v.x;
		this._y += v.y;
		this._z += v.z;
		this._w += v.w;
		return this;
	}

	addScalar (s: number): this {
		this._x += s;
		this._y += s;
		this._z += s;
		this._w += s;
		return this;
	}

	addVectors (a: this, b: this): this {
		this._x = a.x + b.x;
    this._y = a.y + b.y;
		this._z = a.z + b.z;
		this._w = a.w + b.w;
		return this;
	}

	addScaledVector (v: this, s: number): this {
		this._x += v.x * s;
		this._y += v.y * s;
		this._z += v.z * s;
		this._w += v.w * s;
		return this;
	}

	sub (v: this): this {
		this._x -= v.x;
		this._y -= v.y;
		this._z -= v.z;
		this._w -= v.w;
		return this;
	}

	subScalar (s: number) {
		this._x -= s;
		this._y -= s;
		this._z -= s;
		this._w -= s;
		return this;
	}

	subVectors (a: this, b: this): this {
		this._x = a.x - b.x;
		this._y = a.y - b.y;
		this._z = a.z - b.z;
		this._w = a.w - b.w;
		return this;
	}

  /**
   * Multiplies element-wise a vector with this one.
   * @param {Vector3} v The vector.
   * @returns {Vector3} This vector.
   */
  multiply (v: this): this {
    this._x *= v.x;
    this._y *= v.y;
    this._z *= v.z;
    this._w *= v.w;
    return this;
  }

	multiplyScalar (scalar: number): this {
		this._x *= scalar;
		this._y *= scalar;
		this._z *= scalar;
		this._w *= scalar;
		return this;
  }
  
  /**
   * Multiplies the vector components element-wise.
   * @param {Vector3} a The first vector.
   * @param {Vector3} b The second vector.
   * @returns {Vector3} This vector.
   */
  multiplyVectors (a: this, b: this): this {
    this._x = a.x * b.x;
    this._y = a.y * b.y;
    this._z = a.z * b.z;
    this._w = a.w * b.w;
    return this;
  }

  /**
   * Divides element-wise this vector by a vector.
   * @param {Vector4} v The vector to divide by.
   * @returns {Vector4} This vector.
   */
  divide (v: this): this {
    this._x /= v.x;
    this._y /= v.y;
    this._z /= v.z;
    this._w /= v.w;
    return this;
  }

  divideScalar (scalar: number): this {
		return this.multiplyScalar(1.0 / scalar);
  }
  
  /**
   * Calculates the angle between this vector and the given vector.
   * @param {Vector4} v The given vector.
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
   * @param {number} v The point as measured from the origin.
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
    const dx = this._x - v.x;
    const dy = this._y - v.y;
    const dz = this._z - v.z;
    const dw = this._w - v.w;
    return dx * dx + dy * dy + dz * dz + dw * dw;
  }

	setAxisAngleFromRotationMatrix (m: Matrix4) {
		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var angle, x, y, z;		// variables for result
		const epsilon = 0.01;		// margin to allow for rounding errors
		const epsilon2 = 0.1;		// margin to distinguish between 0 and 180 degrees

		const	te = m.toArray();
		const	m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		if ( ( _Math.abs( m12 - m21 ) < epsilon ) &&
		     ( _Math.abs( m13 - m31 ) < epsilon ) &&
		     ( _Math.abs( m23 - m32 ) < epsilon ) ) {

			// singularity found
			// first check for identity matrix which must have +1 for all terms
			// in leading diagonal and zero in other terms

			if ( ( _Math.abs( m12 + m21 ) < epsilon2 ) &&
			     ( _Math.abs( m13 + m31 ) < epsilon2 ) &&
			     ( _Math.abs( m23 + m32 ) < epsilon2 ) &&
			     ( _Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

				// this singularity is identity matrix so angle = 0
				this.set( 1, 0, 0, 0 );
				return this; // zero angle, arbitrary axis
			}
			// otherwise this singularity is angle = 180
			angle = _Math.PI;
			var xx = ( m11 + 1 ) / 2;
			var yy = ( m22 + 1 ) / 2;
			var zz = ( m33 + 1 ) / 2;
			var xy = ( m12 + m21 ) / 4;
			var xz = ( m13 + m31 ) / 4;
			var yz = ( m23 + m32 ) / 4;
			if ( ( xx > yy ) && ( xx > zz ) ) {
				// m11 is the largest diagonal term
				if ( xx < epsilon ) {
					x = 0;
					y = 0.707106781;
					z = 0.707106781;
				} else {
					x = _Math.sqrt( xx );
					y = xy / x;
					z = xz / x;
				}
			} else if ( yy > zz ) {
				// m22 is the largest diagonal term
				if ( yy < epsilon ) {
					x = 0.707106781;
					y = 0;
					z = 0.707106781;
				} else {
					y = _Math.sqrt( yy );
					x = xy / y;
					z = yz / y;
				}
			} else {
				// m33 is the largest diagonal term so base result on this
				if ( zz < epsilon ) {
					x = 0.707106781;
					y = 0.707106781;
					z = 0;
				} else {
					z = _Math.sqrt( zz );
					x = xz / z;
					y = yz / z;
				}
			}
			this.set( x, y, z, angle );
			return this; // return 180 deg rotation
		}

		// as we have reached here there are no singularities so we can handle normally
		let s = _Math.sqrt( ( m32 - m23 ) * ( m32 - m23 ) +
		                   ( m13 - m31 ) * ( m13 - m31 ) +
		                   ( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

		if ( _Math.abs( s ) < 0.001 ) {
      s = 1;
    } 

		// prevent divide by zero, should not happen if matrix is orthogonal and should be
		// caught by singularity test above, but I've left it in just in case
		this._x = ( m32 - m23 ) / s;
		this._y = ( m13 - m31 ) / s;
		this._z = ( m21 - m12 ) / s;
		this._w = _Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );
		return this;
	}

	min (v: this): this {
		this._x = _Math.min( this.x, v.x );
		this._y = _Math.min( this.y, v.y );
		this._z = _Math.min( this.z, v.z );
		this._w = _Math.min( this.w, v.w );
		return this;
	}

	max (v: this): this {
		this._x = _Math.max( this.x, v.x );
		this._y = _Math.max( this.y, v.y );
		this._z = _Math.max( this.z, v.z );
		this._w = _Math.max( this.w, v.w );
		return this;
	}

	clamp (min: this, max: this): this {
		// assumes min < max, componentwise
		this._x = _Math.max( min.x, _Math.min( max.x, this.x ) );
		this._y = _Math.max( min.y, _Math.min( max.y, this.y ) );
		this._z = _Math.max( min.z, _Math.min( max.z, this.z ) );
		this._w = _Math.max( min.w, _Math.min( max.w, this.w ) );
		return this;
	}

	clampScalar (minVal: number, maxVal: number): this {
		this._x = _Math.max( minVal, _Math.min( maxVal, this.x ) );
		this._y = _Math.max( minVal, _Math.min( maxVal, this.y ) );
		this._z = _Math.max( minVal, _Math.min( maxVal, this.z ) );
		this._w = _Math.max( minVal, _Math.min( maxVal, this.w ) );
		return this;
	}

	clampLength (min: number, max: number): this {
		var length = this.length();
		return this.divideScalar(length).multiplyScalar(_Math.max(min, _Math.min(max, length)));
	}

	floor (): this {
		this._x = _Math.floor( this._x );
		this._y = _Math.floor( this._y );
		this._z = _Math.floor( this._z );
		this._w = _Math.floor( this._w );
		return this;
	}

	ceil (): this {
		this._x = _Math.ceil(this._x);
		this._y = _Math.ceil(this._y);
		this._z = _Math.ceil(this._z);
		this._w = _Math.ceil(this._w);
		return this;
	}

	round (): this {
		this._x = _Math.round( this._x );
		this._y = _Math.round( this._y );
		this._z = _Math.round( this._z );
		this._w = _Math.round( this._w );
		return this;
	}

	roundToZero (): this {
		this._x = ( this._x < 0 ) ? _Math.ceil( this._x ) : _Math.floor( this._x );
		this._y = ( this._y < 0 ) ? _Math.ceil( this._y ) : _Math.floor( this._y );
		this._z = ( this._z < 0 ) ? _Math.ceil( this._z ) : _Math.floor( this._z );
		this._w = ( this._w < 0 ) ? _Math.ceil( this._w ) : _Math.floor( this._w );
		return this;
	}

	negate (): this {
		this._x = - this._x;
		this._y = - this._y;
		this._z = - this._z;
		this._w = - this._w;
		return this;
	}

	dot (v: this): number {
		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
	}

	lengthSq (): number {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}

	length (): number {
		return _Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}

	normalize (): this {
		return this.divideScalar(this.length());
	}

	setLength (length: number): this {
		return this.normalize().multiplyScalar(length);
	}

	lerp (v: this, alpha: number): this {
		this._x += (v.x - this._x) * alpha;
		this._y += (v.y - this._y) * alpha;
		this._z += (v.z - this._z) * alpha;
		this._w += (v.w - this._w) * alpha;
		return this;
	}

	lerpVectors (v1: this, v2: this, alpha: number): this {
		return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
	}

	equals (v: this): boolean {
		return (( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ));
	}

	fromArray (array: number[], offset: number = 0): this {
		this._x = array[offset ];
		this._y = array[offset + 1];
		this._z = array[offset + 2];
		this._w = array[offset + 3];
		return this;
	}

	toArray (array: number[] = [], offset: number = 0) {
		array[offset] = this.x;
		array[offset + 1] = this.y;
		array[offset + 2] = this.z;
		array[offset + 3] = this.w;
		return array;
	}
}