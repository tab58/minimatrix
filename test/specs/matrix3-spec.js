'use strict';
/* globals describe it Minimatrix expect */

// const expect = require('chai').expect;
// const Minimatrix = require('../../src/index.js');
describe('Matrix2', () => {
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
      const eigen = a.getEigenvalues().sort();
      expect(eigen).to.be.eql([-1, 8]);
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
  });
});
