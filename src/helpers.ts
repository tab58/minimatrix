import { Vector2 } from './vector2';
import { Vector3 } from './vector3';
import { Vector4 } from './vector4';
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
        throw new Error(`MatrixHelpers.getOuterProduct(): vector is not Vector2, Vector3, or Vector4.`);
    }
  }
}