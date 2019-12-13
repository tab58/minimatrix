import { expect } from 'chai';
import { Vector3, Matrix3, Complex } from '../src/index';

describe('Matrix3', () => {
  const EPS = 1e-14;
  describe('Basic Manipulations', () => {
    it('should create an identity matrix', () => {
      const a = new Matrix3();
      const ae = a.toArray();
      expect(ae[0]).to.be.eql(1);
      expect(ae[1]).to.be.eql(0);
      expect(ae[2]).to.be.eql(0);
      expect(ae[3]).to.be.eql(0);
      expect(ae[4]).to.be.eql(1);
      expect(ae[5]).to.be.eql(0);
      expect(ae[6]).to.be.eql(0);
      expect(ae[7]).to.be.eql(0);
      expect(ae[8]).to.be.eql(1);
      const b = new Matrix3();
      b.setElements(2, 3, 4, 5, 6, 7, 8, 9, 10);
      b.identity();
      expect(b).to.be.eql(a);
    });
    it('should set matrix via direct elements', () => {
      const a = new Matrix3();
      a.setElements(2, 3, 4, 5, 6, 7, 8, 9, 10);
      const ae = a.toArray();
      expect(ae[0]).to.be.eql(2);
      expect(ae[1]).to.be.eql(5);
      expect(ae[2]).to.be.eql(8);
      expect(ae[3]).to.be.eql(3);
      expect(ae[4]).to.be.eql(6);
      expect(ae[5]).to.be.eql(9);
      expect(ae[6]).to.be.eql(4);
      expect(ae[7]).to.be.eql(7);
      expect(ae[8]).to.be.eql(10);
    });
    it('should set matrix via columns', () => {
      const a = new Matrix3();
      const c1 = new Vector3(2, 5, 8);
      const c2 = new Vector3(3, 6, 9);
      const c3 = new Vector3(4, 7, 10);
      a.setColumns(c1, c2, c3);
      const ae = a.toArray();
      expect(ae[0]).to.be.eql(2);
      expect(ae[1]).to.be.eql(5);
      expect(ae[2]).to.be.eql(8);
      expect(ae[3]).to.be.eql(3);
      expect(ae[4]).to.be.eql(6);
      expect(ae[5]).to.be.eql(9);
      expect(ae[6]).to.be.eql(4);
      expect(ae[7]).to.be.eql(7);
      expect(ae[8]).to.be.eql(10);
    });
    it('should set matrix via array', () => {
      const a = new Matrix3();
      const elems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      a.fromArray(elems, 2);
      const ae = a.toArray();
      expect(ae[0]).to.be.eql(2);
      expect(ae[1]).to.be.eql(3);
      expect(ae[2]).to.be.eql(4);
      expect(ae[3]).to.be.eql(5);
      expect(ae[4]).to.be.eql(6);
      expect(ae[5]).to.be.eql(7);
      expect(ae[6]).to.be.eql(8);
      expect(ae[7]).to.be.eql(9);
      expect(ae[8]).to.be.eql(10);
    });
    it('should set matrix via rows', () => {
      const a = new Matrix3();
      const r1 = new Vector3(2, 3, 4);
      const r2 = new Vector3(5, 6, 7);
      const r3 = new Vector3(8, 9, 10);
      a.setRows(r1, r2, r3);
      const ae = a.toArray();
      expect(ae[0]).to.be.eql(2);
      expect(ae[1]).to.be.eql(5);
      expect(ae[2]).to.be.eql(8);
      expect(ae[3]).to.be.eql(3);
      expect(ae[4]).to.be.eql(6);
      expect(ae[5]).to.be.eql(9);
      expect(ae[6]).to.be.eql(4);
      expect(ae[7]).to.be.eql(7);
      expect(ae[8]).to.be.eql(10);
    });
    it('should copy elements into an array', () => {
      const b = new Matrix3();
      b.setElements(2, 5, 8, 3, 6, 9, 4, 7, 10);
      const elems1 = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const elems2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      b.toArray(elems1, 2);
      expect(elems1).to.be.eql(elems2);
    });
    it('should clone a matrix', () => {
      const a = new Matrix3();
      a.setElements(2, 3, 4, 5, 6, 7, 8, 9, 10);
      expect(a).to.be.eql(a.clone());
    });
    it('should copy a matrix', () => {
      const a = new Matrix3();
      a.setElements(2, 3, 4, 5, 6, 7, 8, 9, 10);
      const b = new Matrix3();
      b.copy(a);
      expect(b).to.be.eql(a);
    });
    it('should transpose a matrix', () => {
      const a = new Matrix3();
      a.setElements(2, 3, 4, 5, 6, 7, 8, 9, 10);
      const b = new Matrix3();
      b.setElements(2, 5, 8, 3, 6, 9, 4, 7, 10);
      a.transpose();
      expect(b).to.be.eql(a);
    });
    it('should get a row from the matrix', () => {
      const a = new Matrix3();
      a.setElements(2, 3, 4, 5, 6, 7, 8, 9, 10);
      expect(a.getRow(0)).to.be.eql(new Vector3(2, 3, 4));
      expect(a.getRow(1)).to.be.eql(new Vector3(5, 6, 7));
      expect(a.getRow(2)).to.be.eql(new Vector3(8, 9, 10));
    });
    it('should get a column from the matrix', () => {
      const a = new Matrix3();
      a.setElements(2, 3, 4, 5, 6, 7, 8, 9, 10);
      expect(a.getColumn(0)).to.be.eql(new Vector3(2, 5, 8));
      expect(a.getColumn(1)).to.be.eql(new Vector3(3, 6, 9));
      expect(a.getColumn(2)).to.be.eql(new Vector3(4, 7, 10));
    });
    it('should print the matrix', () => {
      const a = new Matrix3();
      a.setElements(3.123456789, 1102345.123456789, 7.123456789e-15, 11.123456789, 1, 12, 123, 1234, 12345);
      console.log(a.prettyPrint());
    });
  });
  describe('Arithmetic Operations', () => {
    it('should add a matrix to another', () => {
      const a = new Matrix3();
      a.setElements(3, 5, 7, 11, 13, 17, 19, 23, 29);
      const b = new Matrix3();
      b.setElements(31, 37, 41, 43, 47, 53, 59, 61, 67);
      const c = a.clone().add(b);
      const ce = c.toArray();
      expect(ce[0]).to.be.eql(3 + 31);
      expect(ce[3]).to.be.eql(5 + 37);
      expect(ce[6]).to.be.eql(7 + 41);
      expect(ce[1]).to.be.eql(11 + 43);
      expect(ce[4]).to.be.eql(13 + 47);
      expect(ce[7]).to.be.eql(17 + 53);
      expect(ce[2]).to.be.eql(19 + 59);
      expect(ce[5]).to.be.eql(23 + 61);
      expect(ce[8]).to.be.eql(29 + 67);
      const d = (new Matrix3()).addMatrices(a, b);
      const de = d.toArray();
      expect(de[0]).to.be.eql(3 + 31);
      expect(de[3]).to.be.eql(5 + 37);
      expect(de[6]).to.be.eql(7 + 41);
      expect(de[1]).to.be.eql(11 + 43);
      expect(de[4]).to.be.eql(13 + 47);
      expect(de[7]).to.be.eql(17 + 53);
      expect(de[2]).to.be.eql(19 + 59);
      expect(de[5]).to.be.eql(23 + 61);
      expect(de[8]).to.be.eql(29 + 67);
    });
    it('should add a scaled matrix to another', () => {
      const a = new Matrix3();
      a.setElements(3, 5, 7, 11, 13, 17, 19, 23, 29);
      const b = new Matrix3();
      b.setElements(31, 37, 41, 43, 47, 53, 59, 61, 67);
      const d = (new Matrix3()).addMatrices(a, b, 3);
      const de = d.toArray();
      expect(de[0]).to.be.eql(3 + 31 * 3);
      expect(de[3]).to.be.eql(5 + 37 * 3);
      expect(de[6]).to.be.eql(7 + 41 * 3);
      expect(de[1]).to.be.eql(11 + 43 * 3);
      expect(de[4]).to.be.eql(13 + 47 * 3);
      expect(de[7]).to.be.eql(17 + 53 * 3);
      expect(de[2]).to.be.eql(19 + 59 * 3);
      expect(de[5]).to.be.eql(23 + 61 * 3);
      expect(de[8]).to.be.eql(29 + 67 * 3);
    });
    it('should scale a matrix', () => {
      const a = new Matrix3();
      a.setElements(3, 5, 7, 11, 13, 17, 19, 23, 29);
      a.multiplyScalar(31);
      const ae = a.toArray();
      expect(ae[0]).to.be.eql(3 * 31);
      expect(ae[3]).to.be.eql(5 * 31);
      expect(ae[6]).to.be.eql(7 * 31);
      expect(ae[1]).to.be.eql(11 * 31);
      expect(ae[4]).to.be.eql(13 * 31);
      expect(ae[7]).to.be.eql(17 * 31);
      expect(ae[2]).to.be.eql(19 * 31);
      expect(ae[5]).to.be.eql(23 * 31);
      expect(ae[8]).to.be.eql(29 * 31);
    });
    it('should multiply 2 matrices together', () => {
      const a = new Matrix3();
      a.setElements(3, 5, 7, 11, 13, 17, 19, 23, 29);
      const b = new Matrix3();
      b.setElements(31, 37, 41, 43, 47, 53, 59, 61, 67);
      const c = (new Matrix3()).multiplyMatrices(a, b);
      const ce = c.toArray();
      expect(ce[0]).to.be.eql(3 * 31 + 5 * 43 + 7 * 59);
      expect(ce[3]).to.be.eql(3 * 37 + 5 * 47 + 7 * 61);
      expect(ce[6]).to.be.eql(3 * 41 + 5 * 53 + 7 * 67);
      expect(ce[1]).to.be.eql(11 * 31 + 13 * 43 + 17 * 59);
      expect(ce[4]).to.be.eql(11 * 37 + 13 * 47 + 17 * 61);
      expect(ce[7]).to.be.eql(11 * 41 + 13 * 53 + 17 * 67);
      expect(ce[2]).to.be.eql(19 * 31 + 23 * 43 + 29 * 59);
      expect(ce[5]).to.be.eql(19 * 37 + 23 * 47 + 29 * 61);
      expect(ce[8]).to.be.eql(19 * 41 + 23 * 53 + 29 * 67);
      const d = a.clone().multiply(b);
      expect(d).to.be.eql(c);
      const f = b.clone().premultiply(a);
      expect(f).to.be.eql(c);
    });
  });
  describe('Linear Algebra Functions', () => {
    it('should compute a skew-symmetric matrix from a Vector3', () => {
      const b = new Vector3(3, 5, 7);
      const a = new Matrix3();
      a.setSkewSymmetric(b);
      const c = new Matrix3();
      c.setElements(0, -7, 5, 7, 0, -3, -5, 3, 0);
      expect(a).to.be.eql(c);
    });
    it('should compute the determinant', () => {
      const a = new Matrix3();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23);
      const det = a.determinant();
      expect(det).to.be.eql(-78);
    });
    it('should compute the matrix inverse', () => {
      const a = new Matrix3();
      a.setElements(3, 0, 2, 2, 0, -2, 0, 1, 1);
      const c = a.clone().getInverse(a, false);
      const b = new Matrix3();
      b.setElements(0.2, 0.2, 0, -0.2, 0.3, 1, 0.2, -0.3, 0);
      const C = c.toArray();
      const B = b.toArray();
      const A = a.toArray();
      for (let i = 0; i < 9; ++i) {
        expect(Math.abs(C[i] - B[i]) < EPS);
      }
      a.invert();
      for (let i = 0; i < 9; ++i) {
        expect(Math.abs(A[i] - B[i]) < EPS);
      }
    });
    it('should compute the adjugate matrix', () => {
      const a = new Matrix3();
      a.setElements(3, 0, 2, 2, 0, -2, 0, 1, 1);
      const c = a.clone().getAdjugate(a);
      const b = new Matrix3();
      b.setElements(2, 2, -0, -2, 3, 10, 2, -3, 0);
      expect(c).to.be.eql(b);
      a.adjugate();
      expect(a).to.be.eql(b);
    });
    it('should compute the matrix trace', () => {
      const a = new Matrix3();
      a.setElements(2, 3, 4, 5, 6, 7, 8, 9, 10);
      const trace = a.trace();
      expect(trace).to.be.eql(2 + 6 + 10);
    });
    it('should compute the eigenvalues', () => {
      const a = new Matrix3();
      a.setElements(3, 2, 4, 2, 0, 2, 4, 2, 3);
      const eigenInfo = a.getEigenvalues();
      expect(eigenInfo.map((c: Complex): number => c.real).sort()).to.be.eql([-1, -1, 8]);
    });
  });
});
