import { expect } from 'chai';
import { Vector2, Vector3, Matrix2, Matrix3, Vector4, Matrix4 } from '../src/index';

describe('Linear Algebra Helper Functions', () => {
  it('should calculate an outer product properly', () => {
    const v2 = new Vector2(3, 5);
    const m2 = new Matrix2().setElements(9, 15, 15, 25);
    expect(v2.getOuterProduct()).to.be.eql(m2);
    const v3 = new Vector3(3, 5, 7);
    const m3 = new Matrix3().setElements(9, 15, 21, 15, 25, 35, 21, 35, 49);
    expect(v3.getOuterProduct()).to.be.eql(m3);
    const v4 = new Vector4(3, 5, 7, 11);
    const m4 = new Matrix4().setElements(9, 15, 21, 33,
      15, 25, 35, 55,
      21, 35, 49, 77,
      33, 55, 77, 121);
    expect(v4.getOuterProduct()).to.be.eql(m4);
  });
});