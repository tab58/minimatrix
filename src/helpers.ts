import { Vector2 } from './vector2';
import { Vector3 } from './vector3';
import { Vector4 } from './vector4';
import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';

type Vector = Vector2 | Vector3 | Vector4;
type Matrix = Matrix2 | Matrix3 | Matrix4;

/** Helpers for common linear algebra functions. */
export class LinAlgHelpers {
  /**
   * Builds the outer product from a vector.
   * @param v The vector.
   */
  public static getOuterProduct (v: Vector): Matrix {
    const d = v.dimension;
    switch (d) {
      case 2:
        return (v as Vector2).getOuterProduct();
      case 3:
        return (v as Vector3).getOuterProduct();
      case 4:
        return (v as Vector4).getOuterProduct();
      default:
        throw new Error(`LinAlgHelpers.getOuterProduct(): vector dimension (${d}) is not Vector2, Vector3, or Vector4.`);
    }
  }

  /**
   * Computes the outer product ab^T and applies it to a matrix.
   * @param a 
   * @param b 
   * @param scalar 
   */
  public static setMatrixOuterProduct (A: Matrix, a: Vector, b: Vector, scalar?: number): Matrix {
    const d = a.dimension;
    if (A.rows !== b.dimension || A.columns !== a.dimension) {
      throw new Error('LinAlgHelpers.setOuterProduct(): vector dimensions do not match with matrix.');
    } 
    switch (d) {
      case 2:
        return (A as any).setOuterProduct(a as any, b as any, scalar);
      case 3:
        return (A as any).setOuterProduct(a as any, b as any, scalar);
      case 4:
        return (A as any).setOuterProduct(a as any, b as any, scalar);
      default:
        throw new Error(`LinAlgHelpers.setOuterProduct(): vector dimension (${d}) is not Vector2, Vector3, or Vector4.`);
    }
  }

  /**
   * Computes the outer product alpha*(ab^T) and adds it to a matrix.
   * @param a 
   * @param b 
   * @param scalar 
   */
  public static addMatrixOuterProduct (A: Matrix, a: Vector, b: Vector, scalar?: number): Matrix {
    const d = a.dimension;
    if (A.rows !== b.dimension || A.columns !== a.dimension) {
      throw new Error('LinAlgHelpers.addOuterProduct(): vector dimensions do not match with matrix.');
    } 
    switch (d) {
      case 2:
        return A.addOuterProduct(a as any, b as any, scalar);
      case 3:
        return (A as any).addOuterProduct(a as any, b as any, scalar);
      case 4:
        return (A as any).addOuterProduct(a as any, b as any, scalar);
      default:
        throw new Error(`LinAlgHelpers.addOuterProduct(): vector dimension (${d}) is not Vector2, Vector3, or Vector4.`);
    }
  }

  /**
   * Gets a row from the matrix as a vector.
   * @param m The matrix.
   * @param i The row number (zero-based index).
   */
  public static getRow (m: Matrix, i: number): Vector {
    const d = m.columns;
    switch (d) {
      case 2:
        return (m as Matrix2).getRow(i);
      case 3:
        return (m as Matrix3).getRow(i);
      case 4:
        return (m as Matrix4).getRow(i);
      default:
        throw new Error(`LinAlgHelpers.getRow(): matrix dimension (${d}) does not produce Vector2, Vector3, or Vector4.`);
    }
  }

  /**
   * Gets a column from the matrix as a vector.
   * @param m The matrix.
   * @param i The column number (zero-based index).
   */
  public static getColumn (m: Matrix, i: number): Vector {
    const d = m.rows;
    switch (d) {
      case 2:
        return (m as Matrix2).getColumn(i);
      case 3:
        return (m as Matrix3).getColumn(i);
      case 4:
        return (m as Matrix4).getColumn(i);
      default:
        throw new Error(`LinAlgHelpers.getColumn(): matrix dimension (${d}) does not produce Vector2, Vector3, or Vector4.`);
    }
  }

  /**
   * Builds a vector of the values.
   * @param a The array with values.
   * @param n The size of the vector.
   * @param offset The offset index of the array.
   */
  public static vectorFromValues (a: number[], n: number, offset = 0): Vector {
    if (n === 2) {
      const v0 = a[offset];
      const v1 = a[offset + 1];
      return new Vector2(v0, v1);
    } else if (n === 3) {
      const v0 = a[offset];
      const v1 = a[offset + 1];
      const v2 = a[offset + 2];
      return new Vector3(v0, v1, v2);
    } else if (n === 4) {
      const v0 = a[offset];
      const v1 = a[offset + 1];
      const v2 = a[offset + 2];
      const v3 = a[offset + 3];
      return new Vector4(v0, v1, v2, v3);
    } else {
      throw new Error(`LinAlgHelpers.vectorFromValues(): vector size (${n}) is not Vector2, Vector3, or Vector4.`);
    }
  }

  /**
   * Transforms (multiplies) a vector by a matrix.
   * @param m The matrix to transform the vector by.
   * @param v The vector to transform.
   */
  public static transformVector (m: Matrix, v: Vector): Vector {
    if (m.columns !== v.dimension) {
      throw new Error(`LinAlgHelpers.transformVector(): matrix row (${m.columns}) and vector (${v.dimension}) dimensions are not equal.`);
    }
    const n = m.columns;
    switch (n) {
      case 2:
        return (m as Matrix2).transformVector((v as Vector2).clone());
      case 3:
        return (m as Matrix3).transformVector((v as Vector3).clone());
      case 4:
        return (m as Matrix4).transformVector((v as Vector4).clone());
      default:
        throw new Error(`LinAlgHelpers.transformVector(): vector size (${n}) not a Vector2, Vector3, or Vector4.`);
    }
  }

    /**
   * Transforms (multiplies) a vector by a matrix.
   * @param m The matrix to transform the vector by.
   * @param v The vector to transform.
   */
  public static transformRowVector (m: Matrix, v: Vector): Vector {
    if (m.rows !== v.dimension) {
      throw new Error(`LinAlgHelpers.transformVector(): matrix column (${m.rows}) and vector (${v.dimension}) dimensions are not equal.`);
    }
    const n = m.rows;
    switch (n) {
      case 2:
        return (m as Matrix2).transformRowVector((v as Vector2).clone());
      case 3:
        return (m as Matrix3).transformRowVector((v as Vector3).clone());
      case 4:
        return (m as Matrix4).transformRowVector((v as Vector4).clone());
      default:
        throw new Error(`LinAlgHelpers.transformRowVector(): vector size (${n}) not a Vector2, Vector3, or Vector4.`);
    }
  }
}