import { Vector2 } from './vector2';
import { Vector3 } from './vector3';
import { Vector4 } from './vector4';
import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';
import { Vector, Matrix } from './interfaces';

/** Helpers for common linear algebra functions. */
export class LinAlgHelpers {
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
        throw new Error(`LinAlgHelpers.getOuterProduct(): vector is not Vector2, Vector3, or Vector4.`);
    }
  }

  public static getRow (m: Matrix, i: number): Vector {
    const d = m.rowDimension;
    switch (d) {
      case 2:
        return (m as Matrix2).getRow(i);
      case 3:
        return (m as Matrix3).getRow(i);
      case 4:
        return (m as Matrix4).getRow(i);
      default:
        throw new Error(`LinAlgHelpers.getRow(): row is not Vector2, Vector3, or Vector4.`);
    }
  }

  public static getColumn (m: Matrix, i: number): Vector {
    const d = m.colDimension;
    switch (d) {
      case 2:
        return (m as Matrix2).getColumn(i);
      case 3:
        return (m as Matrix3).getColumn(i);
      case 4:
        return (m as Matrix4).getColumn(i);
      default:
        throw new Error(`LinAlgHelpers.getColumn(): column is not Vector2, Vector3, or Vector4.`);
    }
  }
}