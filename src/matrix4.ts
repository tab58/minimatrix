/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */
import _Math from './core';
import { Vector3 } from './vector3';
import { Vector4 } from './vector4';
import { Matrix } from './interfaces';
import { formatPrintNumber } from './utils';

export class Matrix4 implements Matrix {
  private _elements: number[];
  private _tempElements: number[];

  public readonly rowDimension: number = 4;
  public readonly colDimension: number = 4;

	public readonly E0 = new Vector4(1, 0, 0, 0);
  public readonly E1 = new Vector4(0, 1, 0, 0);
	public readonly E2 = new Vector4(0, 0, 1, 0);
  public readonly E3 = new Vector4(0, 0, 0, 1);

  constructor () {
    const a = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1  
		];
		this._elements = a;
    this._tempElements = a.slice();
	}

  set (i: number, j: number, value: number): this {
    const n = this.colDimension;
    this._elements[i + j * n] = value;
    return this;
  }

  get (i: number, j: number): number {
    const n = this.colDimension;
    return this._elements[i + j * n];
	}
	
	/**
   * Gets the row at the specified index of the matrix.
   * @param {number} i The index of the row (0-3).
   * @returns {Vector4} The vector with the row values.
   */
  getRow (i: number): Vector4 {
    const te = this._elements;
    switch (i) {
      case 0:
        return new Vector4(te[0], te[4], te[8], te[12]);
      case 1:
        return new Vector4(te[1], te[5], te[9], te[13]);
      case 2:
        return new Vector4(te[2], te[6], te[10], te[14]);
			case 3:
				return new Vector4(te[3], te[7], te[11], te[15]);
      default:
        throw new Error('getRow(): no row defined at ' + i + '.');
    }
	}

  /**
   * Gets the column at the specified index of the matrix.
   * @param {number} i The index of the column (0-3).
   * @returns {Vector4} The vector with the column values.
   */
  getColumn (i: number): Vector4 {
    const te = this._elements;
    switch (i) {
      case 0:
        return new Vector4(te[0], te[1], te[2], te[3]);
      case 1:
        return new Vector4(te[4], te[5], te[6], te[7]);
      case 2:
        return new Vector4(te[8], te[9], te[10], te[11]);
			case 3:
				return new Vector4(te[12], te[13], te[14], te[15]);
      default:
        throw new Error('getColumn(): no column defined at ' + i + '.');
    }
  }

	/** Sets the matrix values in a row-major ordered fashion. */
  setElements (n11: number, n12: number, n13: number, n14: number,
    n21: number, n22: number, n23: number, n24: number,
    n31: number, n32: number, n33: number, n34: number,
    n41: number, n42: number, n43: number, n44: number) {
		const te = this._elements;
		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;
		return this;
	}

	identity () {
		this.setElements(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		);
		return this;
	}

	clone (): this {
		return new Matrix4().fromArray(this._elements) as this;
	}

	copy (m: this): this {
		const te = this._elements;
		const me = m._elements;
		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
		te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ];
		te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ];
		te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; te[ 15 ] = me[ 15 ];
		return this;
	}

	copyPosition (m: this): this {
    const te = this._elements;
    const me = m._elements;
		te[ 12 ] = me[ 12 ];
		te[ 13 ] = me[ 13 ];
		te[ 14 ] = me[ 14 ];
		return this;
	}

	/**
   * Adds a given matrix to this matrix.
   * @param {Matrix4} m The given matrix.
   */
  add (m: this): this {
    return this.addMatrices(this, m, 1);
  }

	/**
   * Adds 2 matrices together and optionally scales the result: a + alpha * b.
   * @param {Matrix4} a The first matrix.
   * @param {Matrix4} b The second matrix.
   * @param {number} scalar The number to scale the result by.
   */
  addMatrices (a: this, b: this, scalar: number = 1): this {
    const alpha = scalar;
    const ae = a._elements;
    const be = b._elements;
    const te = this._elements;

    const a11 = ae[ 0 ];
    const a12 = ae[ 4 ];
		const a13 = ae[ 8 ];
		const a14 = ae[ 12 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 5 ];
		const a23 = ae[ 9 ];
		const a24 = ae[ 13 ];
    const a31 = ae[ 2 ];
    const a32 = ae[ 6 ];
		const a33 = ae[ 10 ];
		const a34 = ae[ 14 ];
		const a41 = ae[ 3 ];
    const a42 = ae[ 7 ];
		const a43 = ae[ 11 ];
		const a44 = ae[ 15 ];

    const b11 = be[ 0 ];
    const b12 = be[ 4 ];
		const b13 = be[ 8 ];
		const b14 = be[ 12 ];
    const b21 = be[ 1 ];
    const b22 = be[ 5 ];
		const b23 = be[ 9 ];
		const b24 = be[ 13 ];
    const b31 = be[ 2 ];
    const b32 = be[ 6 ];
		const b33 = be[ 10 ];
		const b34 = be[ 14 ];
		const b41 = be[ 3 ];
    const b42 = be[ 7 ];
		const b43 = be[ 11 ];
		const b44 = be[ 15 ];

    te[ 0 ] = a11 + (b11 * alpha);
    te[ 4 ] = a12 + (b12 * alpha);
		te[ 8 ] = a13 + (b13 * alpha);
		te[ 12 ] = a14 + (b14 * alpha);
		te[ 1 ] = a21 + (b21 * alpha);
    te[ 5 ] = a22 + (b22 * alpha);
		te[ 9 ] = a23 + (b23 * alpha);
		te[ 13 ] = a24 + (b24 * alpha);
		te[ 2 ] = a31 + (b31 * alpha);
    te[ 6 ] = a32 + (b32 * alpha);
		te[ 10 ] = a33 + (b33 * alpha);
		te[ 14 ] = a34 + (b34 * alpha);
		te[ 3 ] = a41 + (b41 * alpha);
    te[ 7 ] = a42 + (b42 * alpha);
		te[ 11 ] = a43 + (b43 * alpha);
		te[ 15 ] = a44 + (b44 * alpha);

    return this;
	}

	  /**
   * Computes the outer product of two vectors (a*b^T).
   * @param {Vector4} a The first vector.
   * @param {Vector4} b The second vector.
   * @param {number} scalar The number to scale the matrix by (defaults to 1).
   */
  setOuterProduct (a: Vector4, b: Vector4, scalar: number = 1): this {
    // computes alpha * (ab^T)
    const alpha = scalar;
    const n11 = alpha * a.x * b.x;
    const n12 = alpha * a.x * b.y;
		const n13 = alpha * a.x * b.z;
		const n14 = alpha * a.x * b.w;
		
    const n21 = alpha * a.y * b.x;
    const n22 = alpha * a.y * b.y;
		const n23 = alpha * a.y * b.z;
		const n24 = alpha * a.y * b.w;
		
		const n31 = alpha * a.z * b.x;
    const n32 = alpha * a.z * b.y;
		const n33 = alpha * a.z * b.z;
		const n34 = alpha * a.z * b.w;

		const n41 = alpha * a.w * b.x;
    const n42 = alpha * a.w * b.y;
		const n43 = alpha * a.w * b.z;
		const n44 = alpha * a.w * b.w;
		
    return this.setElements(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
  }

  /**
   * Adds the outer product of two vectors (a*b^T) to this matrix.
   * @param {Vector4} a The first vector.
   * @param {Vector4} b The second vector.
   * @param {number} scalar The number to scale the matrix by (defaults to 1).
   */
  addOuterProduct (a: Vector4, b: Vector4, scalar: number = 1): this {
    // computes [this + alpha * (ab^T)]
    const te = this._elements;
    const alpha = scalar;
    const n11 = alpha * a.x * b.x;
    const n12 = alpha * a.x * b.y;
		const n13 = alpha * a.x * b.z;
		const n14 = alpha * a.x * b.w;
		
    const n21 = alpha * a.y * b.x;
    const n22 = alpha * a.y * b.y;
		const n23 = alpha * a.y * b.z;
		const n24 = alpha * a.y * b.w;
		
		const n31 = alpha * a.z * b.x;
    const n32 = alpha * a.z * b.y;
		const n33 = alpha * a.z * b.z;
		const n34 = alpha * a.z * b.w;

		const n41 = alpha * a.w * b.x;
    const n42 = alpha * a.w * b.y;
		const n43 = alpha * a.w * b.z;
		const n44 = alpha * a.w * b.w;

    te[ 0 ] += n11;
    te[ 1 ] += n21;
    te[ 2 ] += n31;
    te[ 3 ] += n41;
		te[ 4 ] += n12;
    te[ 5 ] += n22;
    te[ 6 ] += n32;
    te[ 7 ] += n42;
		te[ 8 ] += n13;
		te[ 9 ] += n23;
		te[ 10 ] += n33;
		te[ 11 ] += n43;
		te[ 12 ] += n14;
		te[ 13 ] += n24;
		te[ 14 ] += n34;
		te[ 15 ] += n44;
    return this;
  }
	
	/**
   * Swaps rows in-place in the matrix. Zero is the first row.
   */
  swapRows (i: number, j: number): this {
    const A = this._elements;
    const n = 4;
    if (i > n - 1 || j > n - 1) {
      throw new Error(`swapRows(): row index out of bounds.`);
    }
    if (i !== j) {
      for (let k = 0; k < n; ++k) {
        const offset = k * n;
        const tmp = A[i + offset];
        A[i + offset] = A[j + offset];
        A[j + offset] = tmp;
      }
    }
    return this;
  }

  /**
   * Swaps columns in-place in the matrix. Zero is the first column.
   */
  swapColumns (i: number, j: number): this {
    const A = this._elements;
    const n = 4;
    if (i > n - 1 || j > n - 1) {
      throw new Error(`swapColumns(): column index out of bounds.`);
    }
    if (i !== j) {
      const iOffset = i * n;
      const jOffset = j * n;
      for (let k = 0; k < n; ++k) {
        const tmp = A[iOffset + k];
        A[iOffset + k] = A[jOffset + k];
        A[jOffset + k] = tmp;
      }
    }
    return this;
  }

	extractBasis (xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this {
		const te = this._elements;
		xAxis.fromArray(te, 0);
		yAxis.fromArray(te, 4);
		zAxis.fromArray(te, 8);
		return this;
	}

	makeBasis (xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this {
		this.setElements(
			xAxis.x, yAxis.x, zAxis.x, 0,
			xAxis.y, yAxis.y, zAxis.y, 0,
			xAxis.z, yAxis.z, zAxis.z, 0,
			0, 0, 0, 1
		);
		return this;
	}

	multiply (m: this): this {
		return this.multiplyMatrices( this, m );
	}

	premultiply (m: this): this {
		return this.multiplyMatrices( m, this );
	}

	transformVector3 (v: Vector3): Vector3 {
		const x = v.x;
		const y = v.y;
		const z = v.z;
		const w = 1;
		const e = this._elements;
		
		const _x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ];
		const _y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ];
		const _z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ];
		return v.set(_x, _y, _z);
	}

	transformVector4 (v: Vector4): Vector4 {
		const x = v.x;
		const y = v.y;
		const z = v.z;
		const w = v.w;
		const e = this._elements;
		
		const _x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
		const _y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
		const _z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
		const _w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;
		return v.set(_x, _y, _z, _w);
	}

	multiplyMatrices (a: this, b: this): this {
		const ae = a._elements;
		const be = b._elements;
		const te = this._elements;

		const a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
		const a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
		const a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
		const a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

		const b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
		const b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
		const b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
		const b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;
	}

	multiplyScalar (s: number): this {
		const te = this._elements;

		te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
		te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
		te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
		te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

		return this;
	}

	determinant (): number {
		const te = this._elements;

		const n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
		const n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
		const n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
		const n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
		return (
			n41 * (
				+ n14 * n23 * n32
				 - n13 * n24 * n32
				 - n14 * n22 * n33
				 + n12 * n24 * n33
				 + n13 * n22 * n34
				 - n12 * n23 * n34
			) +
			n42 * (
				+ n11 * n23 * n34
				 - n11 * n24 * n33
				 + n14 * n21 * n33
				 - n13 * n21 * n34
				 + n13 * n24 * n31
				 - n14 * n23 * n31
			) +
			n43 * (
				+ n11 * n24 * n32
				 - n11 * n22 * n34
				 - n14 * n21 * n32
				 + n12 * n21 * n34
				 + n14 * n22 * n31
				 - n12 * n24 * n31
			) +
			n44 * (
				- n13 * n22 * n31
				 - n11 * n23 * n32
				 + n11 * n22 * n33
				 + n13 * n21 * n32
				 - n12 * n21 * n33
				 + n12 * n23 * n31
			)
		);
	}

	trace (): number {
		const te = this._elements;
		const t11 = te[0];
		const t22 = te[5];
		const t33 = te[10];
		const t44 = te[15];
		return t11 + t22 + t33 + t44;
	}

	transpose (): this {
		const te = this._elements;
		let tmp;

		tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
		tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
		tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

		tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
		tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
		tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

		return this;
	}

	setPosition (x: number, y: number, z: number) {
		const te = this._elements;
		te[ 12 ] = x;
		te[ 13 ] = y;
		te[ 14 ] = z;
		return this;
	}

	adjugate (): this {
		return this.getAdjugate(this);
	}

	getAdjugate (matrix: this): this {
		const te = this._elements;
		const	me = matrix._elements;

		const a = me[0];
		const e = me[1];
		const i = me[2];
		const m = me[3];
		
		const b = me[4];
		const f = me[5];
		const j = me[6];
		const n = me[7];
		
		const c = me[8];
		const g = me[9];
		const k = me[10];
		const p = me[11];
		
		const d = me[12];
		const h = me[13];
		const l = me[14];
		const q = me[15];
		
		te[0] =   f * k * q - f * l * p - g * j * q + g * l * n + h * j * p - h * k * n;
		te[4] =  -b * k * q + b * l * p + c * j * q - c * l * n - d * j * p + d * k * n;
		te[8] =   b * g * q - b * h * p - c * f * q + c * h * n + d * f * p - d * g * n;
		te[12] = -b * g * l + b * h * k + c * f * l - c * h * j - d * f * k + d * g * j;
		
		te[1] =  -e * k * q + e * l * p + g * i * q - g * l * m - h * i * p + h * k * m;
		te[5] =   a * k * q - a * l * p - c * i * q + c * l * m + d * i * p - d * k * m;
		te[9] =  -a * g * q + a * h * p + c * e * q - c * h * m - d * e * p + d * g * m;
		te[13] =  a * g * l - a * h * k - c * e * l + c * h * i + d * e * k - d * g * i;
		
		te[2] =   e * j * q - e * l * n - f * i * q + f * l * m + h * i * n - h * j * m;
		te[6] =  -a * j * q + a * l * n + b * i * q - b * l * m - d * i * n + d * j * m;
		te[10] =  a * f * q - a * h * n - b * e * q + b * h * m + d * e * n - d * f * m;
		te[14] = -a * f * l + a * h * j + b * e * l - b * h * i - d * e * j + d * f * i;
		
		te[3] =  -e * j * p + e * k * n + f * i * p - f * k * m - g * i * n + g * j * m;
		te[7] =   a * j * p - a * k * n - b * i * p + b * k * m + c * i * n - c * j * m;
		te[11] = -a * f * p + a * g * n + b * e * p - b * g * m - c * e * n + c * f * m;
		te[15] =  a * f * k - a * g * j - b * e * k + b * g * i + c * e * j - c * f * i;
		return this;
	}

	invert (throwOnDegenerate: boolean = false): this {
		return this.getInverse(this, throwOnDegenerate);
	}

	getInverse (m: this, throwOnDegenerate: boolean, singularTol: number = 1e-14): this {
		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		const te = this._elements;
		const	me = m._elements;

		const	n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ], n41 = me[ 3 ],
			n12 = me[ 4 ], n22 = me[ 5 ], n32 = me[ 6 ], n42 = me[ 7 ],
			n13 = me[ 8 ], n23 = me[ 9 ], n33 = me[ 10 ], n43 = me[ 11 ],
			n14 = me[ 12 ], n24 = me[ 13 ], n34 = me[ 14 ], n44 = me[ 15 ],

			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

		const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

		if (_Math.abs(det) < singularTol) {
			const msg = "Matrix4.getInverse(): matrix is degenerate.";
			if (throwOnDegenerate) {
				throw new Error(msg);
			} else {
				console.warn(msg);
			}
			return this.identity();
		}

		const detInv = 1.0 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
		te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
		te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

		te[ 4 ] = t12 * detInv;
		te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
		te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
		te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

		te[ 8 ] = t13 * detInv;
		te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
		te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
		te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

		te[ 12 ] = t14 * detInv;
		te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
		te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
		te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

		return this;
	}

	scale (v: Vector3) {
		const te = this._elements;
		const x = v.x, y = v.y, z = v.z;

		te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
		te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
		te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
		te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

		return this;
	}

	makeTranslation (x: number, y: number, z: number): this {
		this.setElements(
			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1
		);
		return this;
	}

	makeRotationX (theta: number ): this {
		const c = _Math.cos(theta);
		const s = _Math.sin(theta);
		this.setElements(
			1, 0, 0, 0,
			0, c, - s, 0,
			0, s, c, 0,
			0, 0, 0, 1
		);
		return this;
	}

	makeRotationY (theta: number): this {
		const c = _Math.cos(theta);
		const s = _Math.sin(theta);
		this.setElements(
			 c, 0, s, 0,
			 0, 1, 0, 0,
			- s, 0, c, 0,
			 0, 0, 0, 1
		);
		return this;
	}

	makeRotationZ (theta: number): this {
		const c = _Math.cos(theta);
		const s = _Math.sin(theta);
		this.setElements(
			c, - s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		);
		return this;
	}

	makeRotationAxis (axis: Vector3, angle: number): this {
		// Based on http://www.gamedev.net/reference/articles/article1199.asp
		const c = _Math.cos(angle);
		const s = _Math.sin(angle);
		const t = 1 - c;
		const x = axis.x, y = axis.y, z = axis.z;
		const tx = t * x, ty = t * y;
		this.setElements(
			tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1
		);
		return this;
	}

	makeScale (x: number, y: number, z: number): this {
		this.setElements(
			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1
		);
		return this;
	}

	makeShear (x: number, y: number, z: number): this {
		this.setElements(
			1, y, z, 0,
			x, 1, z, 0,
			x, y, 1, 0,
			0, 0, 0, 1
		);
		return this;
	}

	equals (matrix: this): boolean {
		const te = this._elements;
		const me = matrix._elements;

		for (let i = 0; i < 16; i++) {
			if (te[i] !== me[i]) return false;
		}
		return true;
	}

	fromArray (array: number[], offset: number = 0) {
		for (let i = 0; i < 16; i++) {
			this._elements[i] = array[i + offset];
		}
		return this;
	}

	toArray (array: number[] = [], offset: number = 0) {
		const te = this._elements;

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];
		array[ offset + 3 ] = te[ 3 ];

		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];
		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];

		array[ offset + 8 ] = te[ 8 ];
		array[ offset + 9 ] = te[ 9 ];
		array[ offset + 10 ] = te[ 10 ];
		array[ offset + 11 ] = te[ 11 ];

		array[ offset + 12 ] = te[ 12 ];
		array[ offset + 13 ] = te[ 13 ];
		array[ offset + 14 ] = te[ 14 ];
		array[ offset + 15 ] = te[ 15 ];

		return array;
	}

	/**
   * Pretty prints this matrix.
   */
  prettyPrint (): string {
    const tStr = this._elements.map(formatPrintNumber);
    const matrixString = `
    +-                                  -+
    | ${tStr[0]}  ${tStr[4]}  ${tStr[8]}  ${tStr[12]} |
    | ${tStr[1]}  ${tStr[5]}  ${tStr[9]}  ${tStr[13]} |
    | ${tStr[2]}  ${tStr[6]}  ${tStr[10]}  ${tStr[14]} |
    | ${tStr[3]}  ${tStr[7]}  ${tStr[11]}  ${tStr[15]} |
    +-                                  -+`;
    return matrixString;
	}
	
	applyFunction (fn: (elements: number[], rowDim: number, colDim: number) => void): void {
    const ee = this._elements;
    const te = this._tempElements;
		const n = ee.length;
    const r = this.rowDimension;
		const c = this.colDimension;

    for (let i = 0; i < n; ++i) { te[i] = ee[i]; }
    fn.call(null, te, r, c);
    for (let i = 0; i < n; ++i) { ee[i] = te[i]; }
  }
}