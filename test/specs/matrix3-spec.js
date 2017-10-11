'use strict';
/* globals describe it Minimatrix expect */

// const expect = require('chai').expect;
// const Minimatrix = require('../../src/index.js');
describe('Matrix3', () => {
  const Vector3 = Minimatrix.Vector3;
  const Matrix3 = Minimatrix.Matrix3;
  const EPS = 1e-14;
  describe('Basic Manipulations', () => {
    it('should create an identity matrix', () => {
      const a = new Matrix3();
      const ae = a.elements;
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
      b.set(2, 3, 4, 5, 6, 7, 8, 9, 10);
      b.identity();
      expect(b).to.be.eql(a);
    });
    it('should set matrix via direct elements', () => {
      const a = new Matrix3();
      a.set(2, 3, 4, 5, 6, 7, 8, 9, 10);
      const ae = a.elements;
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
      const ae = a.elements;
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
      const ae = a.elements;
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
      const ae = a.elements;
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
      b.set(2, 5, 8, 3, 6, 9, 4, 7, 10);
      const elems1 = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const elems2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      b.toArray(elems1, 2);
      expect(elems1).to.be.eql(elems2);
    });
    it('should clone a matrix', () => {
      const a = new Matrix3();
      a.set(2, 3, 4, 5, 6, 7, 8, 9, 10);
      expect(a).to.be.eql(a.clone());
    });
    it('should copy a matrix', () => {
      const a = new Matrix3();
      a.set(2, 3, 4, 5, 6, 7, 8, 9, 10);
      const b = new Matrix3();
      b.copy(a);
      expect(b).to.be.eql(a);
    });
    it('should transpose a matrix', () => {
      const a = new Matrix3();
      a.set(2, 3, 4, 5, 6, 7, 8, 9, 10);
      const b = new Matrix3();
      b.set(2, 5, 8, 3, 6, 9, 4, 7, 10);
      a.transpose();
      expect(b).to.be.eql(a);
    });
    it('should get a row from the matrix', () => {
      const a = new Matrix3();
      a.set(2, 3, 4, 5, 6, 7, 8, 9, 10);
      expect(a.getRow(0)).to.be.eql(new Vector3(2, 3, 4));
      expect(a.getRow(1)).to.be.eql(new Vector3(5, 6, 7));
      expect(a.getRow(2)).to.be.eql(new Vector3(8, 9, 10));
    });
    it('should get a column from the matrix', () => {
      const a = new Matrix3();
      a.set(2, 3, 4, 5, 6, 7, 8, 9, 10);
      expect(a.getColumn(0)).to.be.eql(new Vector3(2, 5, 8));
      expect(a.getColumn(1)).to.be.eql(new Vector3(3, 6, 9));
      expect(a.getColumn(2)).to.be.eql(new Vector3(4, 7, 10));
    });
    it('should print the matrix', () => {
      const a = new Matrix3();
      a.set(3.123456789, 1102345.123456789, 7.123456789e-15, 11.123456789, 1, 12, 123, 1234, 12345);
      console.log(a.prettyPrint());
    });
  });
  describe('Arithmetic Operations', () => {
    it('should add a matrix to another', () => {
      const a = new Matrix3();
      a.set(3, 5, 7, 11, 13, 17, 19, 23, 29);
      const b = new Matrix3();
      b.set(31, 37, 41, 43, 47, 53, 59, 61, 67);
      const c = a.clone().add(b);
      expect(c.elements[0]).to.be.eql(3 + 31);
      expect(c.elements[3]).to.be.eql(5 + 37);
      expect(c.elements[6]).to.be.eql(7 + 41);
      expect(c.elements[1]).to.be.eql(11 + 43);
      expect(c.elements[4]).to.be.eql(13 + 47);
      expect(c.elements[7]).to.be.eql(17 + 53);
      expect(c.elements[2]).to.be.eql(19 + 59);
      expect(c.elements[5]).to.be.eql(23 + 61);
      expect(c.elements[8]).to.be.eql(29 + 67);
      const d = (new Matrix3()).addMatrices(a, b);
      expect(d.elements[0]).to.be.eql(3 + 31);
      expect(d.elements[3]).to.be.eql(5 + 37);
      expect(d.elements[6]).to.be.eql(7 + 41);
      expect(d.elements[1]).to.be.eql(11 + 43);
      expect(d.elements[4]).to.be.eql(13 + 47);
      expect(d.elements[7]).to.be.eql(17 + 53);
      expect(d.elements[2]).to.be.eql(19 + 59);
      expect(d.elements[5]).to.be.eql(23 + 61);
      expect(d.elements[8]).to.be.eql(29 + 67);
    });
    it('should add a scaled matrix to another', () => {
      const a = new Matrix3();
      a.set(3, 5, 7, 11, 13, 17, 19, 23, 29);
      const b = new Matrix3();
      b.set(31, 37, 41, 43, 47, 53, 59, 61, 67);
      const d = (new Matrix3()).addMatrices(a, b, 3);
      expect(d.elements[0]).to.be.eql(3 + 31 * 3);
      expect(d.elements[3]).to.be.eql(5 + 37 * 3);
      expect(d.elements[6]).to.be.eql(7 + 41 * 3);
      expect(d.elements[1]).to.be.eql(11 + 43 * 3);
      expect(d.elements[4]).to.be.eql(13 + 47 * 3);
      expect(d.elements[7]).to.be.eql(17 + 53 * 3);
      expect(d.elements[2]).to.be.eql(19 + 59 * 3);
      expect(d.elements[5]).to.be.eql(23 + 61 * 3);
      expect(d.elements[8]).to.be.eql(29 + 67 * 3);
    });
    it('should scale a matrix', () => {
      const a = new Matrix3();
      a.set(3, 5, 7, 11, 13, 17, 19, 23, 29);
      a.multiplyScalar(31);
      expect(a.elements[0]).to.be.eql(3 * 31);
      expect(a.elements[3]).to.be.eql(5 * 31);
      expect(a.elements[6]).to.be.eql(7 * 31);
      expect(a.elements[1]).to.be.eql(11 * 31);
      expect(a.elements[4]).to.be.eql(13 * 31);
      expect(a.elements[7]).to.be.eql(17 * 31);
      expect(a.elements[2]).to.be.eql(19 * 31);
      expect(a.elements[5]).to.be.eql(23 * 31);
      expect(a.elements[8]).to.be.eql(29 * 31);
    });
    it('should multiply 2 matrices together', () => {
      const a = new Matrix3();
      a.set(3, 5, 7, 11, 13, 17, 19, 23, 29);
      const b = new Matrix3();
      b.set(31, 37, 41, 43, 47, 53, 59, 61, 67);
      const c = (new Matrix3()).multiplyMatrices(a, b);
      expect(c.elements[0]).to.be.eql(3 * 31 + 5 * 43 + 7 * 59);
      expect(c.elements[3]).to.be.eql(3 * 37 + 5 * 47 + 7 * 61);
      expect(c.elements[6]).to.be.eql(3 * 41 + 5 * 53 + 7 * 67);
      expect(c.elements[1]).to.be.eql(11 * 31 + 13 * 43 + 17 * 59);
      expect(c.elements[4]).to.be.eql(11 * 37 + 13 * 47 + 17 * 61);
      expect(c.elements[7]).to.be.eql(11 * 41 + 13 * 53 + 17 * 67);
      expect(c.elements[2]).to.be.eql(19 * 31 + 23 * 43 + 29 * 59);
      expect(c.elements[5]).to.be.eql(19 * 37 + 23 * 47 + 29 * 61);
      expect(c.elements[8]).to.be.eql(19 * 41 + 23 * 53 + 29 * 67);
      const d = a.clone().multiply(b);
      expect(d).to.be.eql(c);
      const f = b.clone().premultiply(a);
      expect(f).to.be.eql(c);
    });
  });
  describe('Computational Helper Functions', () => {
    it('should find largest element', () => {
      const a = new Matrix3();
      a.set(2, 3, 4, 5, 6, 7, 8, 10, 9);
      const lrg1 = a.findLargestAbsElement();
      expect(lrg1.row).to.be.eql(2);
      expect(lrg1.column).to.be.eql(1);
      expect(lrg1.value).to.be.eql(10);
      const b = new Matrix3();
      b.set(2, 3, 4, 10, 6, 7, 8, 10, 5);
      const lrg2 = b.findLargestAbsElement();
      expect(lrg2.row).to.be.eql(1);
      expect(lrg2.column).to.be.eql(0);
      expect(lrg2.value).to.be.eql(10);
    });
    it('should find first nonzero element', () => {
      const a = new Matrix3();
      a.set(0, 0, 4, 5, 6, 7, 8, 10, 9);
      const z1 = a.findFirstNonvanishing();
      expect(z1.row).to.be.eql(1);
      expect(z1.column).to.be.eql(0);
      expect(z1.value).to.be.eql(5);
    });
    it('should threshold near zero entries to zero', () => {
      const a = new Matrix3();
      a.set(-5e-15, 4e-15, 4, 5, 6, 7, 2e-14, 10, 9);
      const b = new Matrix3();
      b.set(0, 0, 4, 5, 6, 7, 2e-14, 10, 9);
      a.thresholdEntriesToZero(EPS);
      expect(a).to.be.eql(b);
    });
  });
  describe('Linear Algebra Functions', () => {
    it('should compute a skew-symmetric matrix from a Vector3', () => {
      const b = new Vector3(3, 5, 7);
      const a = new Matrix3();
      a.setSkewSymmetric(b);
      const c = new Matrix3();
      c.set(0, -7, 5, 7, 0, -3, -5, 3, 0);
      expect(a).to.be.eql(c);
    });
    it('should compute the determinant', () => {
      const a = new Matrix3();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23);
      const det = a.determinant();
      expect(det).to.be.eql(-78);
    });
    it('should compute the matrix inverse', () => {
      const a = new Matrix3();
      a.set(3, 0, 2, 2, 0, -2, 0, 1, 1);
      const c = a.clone().getInverse(a);
      const b = new Matrix3();
      b.set(0.2, 0.2, 0, -0.2, 0.3, 1, 0.2, -0.3, 0);
      for (let i = 0; i < 9; ++i) {
        expect(Math.abs(c.elements[i] - b.elements[i]) < EPS);
      }
      a.invert();
      for (let i = 0; i < 9; ++i) {
        expect(Math.abs(a.elements[i] - b.elements[i]) < EPS);
      }
    });
    it('should compute the adjugate matrix', () => {
      const a = new Matrix3();
      a.set(3, 0, 2, 2, 0, -2, 0, 1, 1);
      const c = a.clone().getAdjugate(a);
      const b = new Matrix3();
      b.set(2, 2, -0, -2, 3, 10, 2, -3, 0);
      expect(c).to.be.eql(b);
      a.adjugate();
      expect(a).to.be.eql(b);
    });
    it('should compute the matrix trace', () => {
      const a = new Matrix3();
      a.set(2, 3, 4, 5, 6, 7, 8, 9, 10);
      const trace = a.trace();
      expect(trace).to.be.eql(2 + 6 + 10);
    });
    it('should compute the eigenvalues', () => {
      const a = new Matrix3();
      a.set(3, 2, 4, 2, 0, 2, 4, 2, 3);
      const eigenInfo = a.getEigenvalues();
      // returns 1 real and 2 (possibly) complex roots
      // eigenvalues are A0, A1 + B1*i, A2 + B2*i
      const realEigens = [];
      if (eigenInfo.A0) {
        realEigens.push(eigenInfo.A0);
      }
      if (eigenInfo.B1 === 0) {
        realEigens.push(eigenInfo.A1);
      }
      if (eigenInfo.B2 === 0) {
        realEigens.push(eigenInfo.A2);
      }
      expect(realEigens.sort()).to.be.eql([-1, -1, 8]);
    });
    it('should compute the rank of a matrix', () => {
      const a = new Matrix3();
      a.set(1, 2, 3, 2, 3, 5, 3, 4, 7);
      expect(a.getRank()).to.be.eql(2);
      const b = new Matrix3();
      b.set(1, 0, 2, 2, 1, 0, 3, 2, 1);
      expect(b.getRank()).to.be.eql(3);
      const c = new Matrix3();
      c.set(1, 2, 0, 2, 4, 0, 3, 6, 0);
      expect(c.getRank()).to.be.eql(1);
    });
    it('should compute the QR decomposition of a matrix', () => {
      const a = new Matrix3();
      a.set(1, 0, 2, 2, 1, 0, 3, 2, 1);
      const qrInfo1 = a.decomposeQR();
      expect(qrInfo1.Q.getRank()).to.be.eql(3);
      expect(qrInfo1.R.getRank()).to.be.eql(3);
      const A = qrInfo1.Q.multiply(qrInfo1.R);
      for (let i = 0; i < 9; ++i) {
        expect(Math.abs(a.elements[i] - A.elements[i]) < EPS);
      }
      const b = new Matrix3();
      b.set(1, 2, 3, 2, 3, 5, 3, 4, 7);
      expect(b.getRank()).to.be.eql(2);
      const qrInfo2 = b.decomposeQR();
      expect(qrInfo2.Q.getRank()).to.be.eql(3);
      expect(qrInfo2.R.getRank()).to.be.eql(2);
      const B = qrInfo2.Q.multiply(qrInfo2.R);
      for (let i = 0; i < 9; ++i) {
        expect(Math.abs(b.elements[i] - B.elements[i]) < EPS);
      }
    });
    it('should compute the LU decomposition of a matrix in place', () => {
      const A = new Matrix3();
      A.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      expect(() => A.decomposeLU(true)).to.throw();

      A.set(3, -0.1, -0.2, 0.1, 7, -0.3, 0.3, -0.2, 10);
      const { A: B } = A.decomposeLU(true);
      expect(A).to.be.eql(B);
    });
    it('should compute the LU decomposition of a matrix as a copy', () => {
      const A = new Matrix3();
      A.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      expect(() => A.decomposeLU(false)).to.throw();

      A.set(3, -0.1, -0.2, 0.1, 7, -0.3, 0.3, -0.2, 10);
      const { A: B } = A.decomposeLU(false);
      expect(A.equals(B)).to.be.eql(true);
    });
    it('should solve Ax=b using the LU decomposition method', () => {
      const A = new Matrix3();
      A.set(3, -0.1, -0.2, 0.1, 7, -0.3, 0.3, -0.2, 10);
      const { P } = A.decomposeLU(true);
      const b = new Vector3(7.85, -19.3, 71.4);
      const X = A.solveLU(P, b, new Vector3());
      const X0 = new Vector3(3, -2.5, 7);
      const TOL = 1e-14;
      expect(Math.abs(X.x - X0.x) < TOL).to.be.eql(true);
      expect(Math.abs(X.y - X0.y) < TOL).to.be.eql(true);
      expect(Math.abs(X.z - X0.z) < TOL).to.be.eql(true);
    });
    it('should be able to convert to Hessenberg form', () => {
      const A = new Matrix3();
      A.set(4, 1, -2, 1, 2, 0, -2, 0, 3);
      const B = A.clone().convertToHessenberg();
      const A0 = new Matrix3();
      A0.set(4, 2.2360679774997894, 0, 2.2360679774997894, 2.8, 0.4, 0, 0.4, 2.2);
      for (let i = 0; i < 9; ++i) {
        const a0 = A0.elements[i];
        const b = B.elements[i];
        expect(Math.abs(a0 - b)).to.be.below(EPS);
      }
    });
    it('should be able to take Hessenberg QR step', () => {
      const A = new Matrix3();
      A.set(3, 1, 2, 4, 2, 3, 0, 0.01, 1);
      const A0 = A.clone();
      A0.takeHessenbergQRStep();
      const { Q: Q0, R: R0 } = A.decomposeQR();
      const B0 = R0.clone().multiply(Q0);
      for (let i = 0; i < 9; ++i) {
        expect(Math.abs(A0.elements[i] - B0.elements[i]) < EPS).to.be.eql(true);
      }
    });
  });
});
