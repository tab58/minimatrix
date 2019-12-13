import { expect } from 'chai';
import { Matrix2 } from '../src/index';

describe('Matrix2', () => {
  describe('Basic Manipulations', () => {
    it('should create an identity matrix', () => {
      const A = new Matrix2();
      const a = A.toArray();
      expect(a[0]).to.be.eql(1);
      expect(a[2]).to.be.eql(0);
      expect(a[1]).to.be.eql(0);
      expect(a[3]).to.be.eql(1);
    });
    it('should set the elements of a matrix via arguments', () => {
      const A = new Matrix2();
      A.setElements(3, 5, 7, 11);
      const a = A.toArray();
      expect(a[0]).to.be.eql(3);
      expect(a[2]).to.be.eql(5);
      expect(a[1]).to.be.eql(7);
      expect(a[3]).to.be.eql(11);
    });
    it('should set the elements of a matrix via array', () => {
      const A = new Matrix2();
      const primes = [2, 3, 5, 7, 11, 13, 17, 19];
      A.fromArray(primes, 2);
      const a = A.toArray();
      expect(a[0]).to.be.eql(5);
      expect(a[1]).to.be.eql(7);
      expect(a[2]).to.be.eql(11);
      expect(a[3]).to.be.eql(13);
    });
    it('should set the matrix as identity', () => {
      const a = new Matrix2();
      a.setElements(3, 5, 7, 11);
      a.identity();
      expect(a).to.be.eql(new Matrix2());
    });
    it('should clone a matrix', () => {
      const a = new Matrix2();
      a.setElements(3, 5, 7, 11);
      const b = a.clone();
      expect(a).to.be.eql(b);
    });
    it('should copy a matrix', () => {
      const a = new Matrix2();
      a.setElements(3, 5, 7, 11);
      const b = new Matrix2();
      b.copy(a);
      expect(a).to.be.eql(b);
    });
    it('should transpose a matrix', () => {
      const A = new Matrix2();
      A.setElements(3, 5, 7, 11);
      const B = A.clone().transpose();
      const a = A.toArray();
      const b = B.toArray();
      expect(a[0]).to.be.eql(b[0]);
      expect(a[2]).to.be.eql(b[1]);
      expect(a[1]).to.be.eql(b[2]);
      expect(a[3]).to.be.eql(b[3]);
    });
    it('should create an array from matrix values', () => {
      const a = new Matrix2();
      a.setElements(3, 5, 7, 11);
      const elems = a.toArray();

      const elemArray = [0, 0, 0, 0, 0, 0];
      a.toArray(elemArray, 2);
      expect(elems[0]).to.be.eql(elemArray[2 + 0]);
      expect(elems[1]).to.be.eql(elemArray[2 + 1]);
      expect(elems[2]).to.be.eql(elemArray[2 + 2]);
      expect(elems[3]).to.be.eql(elemArray[2 + 3]);
    });
  });
  describe('Arithmetic Operations', () => {
    it('should add a matrix to another', () => {
      const A = new Matrix2();
      A.setElements(3, 5, 7, 11);
      const B = new Matrix2();
      B.setElements(13, 17, 19, 23);
      const C = A.clone().add(B);
      const c = C.toArray();
      expect(c[0]).to.be.eql(3 + 13);
      expect(c[2]).to.be.eql(5 + 17);
      expect(c[1]).to.be.eql(7 + 19);
      expect(c[3]).to.be.eql(11 + 23);
      const D = (new Matrix2()).addMatrices(A, B);
      const d = D.toArray();
      expect(d[0]).to.be.eql(3 + 13);
      expect(d[2]).to.be.eql(5 + 17);
      expect(d[1]).to.be.eql(7 + 19);
      expect(d[3]).to.be.eql(11 + 23);
    });
    it('should add a scaled matrix to another', () => {
      const A = new Matrix2();
      A.setElements(3, 5, 7, 11);
      const B = new Matrix2();
      B.setElements(13, 17, 19, 23);
      const D = (new Matrix2()).addMatrices(A, B, 2);
      const d = D.toArray();
      expect(d[0]).to.be.eql(3 + 13 * 2);
      expect(d[2]).to.be.eql(5 + 17 * 2);
      expect(d[1]).to.be.eql(7 + 19 * 2);
      expect(d[3]).to.be.eql(11 + 23 * 2);
    });
    it('should scale a matrix', () => {
      const A = new Matrix2();
      A.setElements(3, 5, 7, 11);
      A.multiplyScalar(13);
      const a = A.toArray();
      expect(a[0]).to.be.eql(3 * 13);
      expect(a[2]).to.be.eql(5 * 13);
      expect(a[1]).to.be.eql(7 * 13);
      expect(a[3]).to.be.eql(11 * 13);
    });
    it('should calculate the determinant', () => {
      const a = new Matrix2();
      a.setElements(3, 5, 7, 11);
      const detA = a.determinant();
      expect(detA).to.be.eql(3 * 11 - 5 * 7);
    });
    it('should calculate the inverse', () => {
      const A = new Matrix2();
      const a = 3;
      const b = 5;
      const c = 7;
      const d = 11;
      A.setElements(a, b, c, d);
      const detA = A.determinant();
      A.invert();
      const x = A.toArray();
      expect(x[0]).to.be.eql(d / detA);
      expect(x[2]).to.be.eql(-b / detA);
      expect(x[1]).to.be.eql(-c / detA);
      expect(x[3]).to.be.eql(a / detA);
    });
    it('should multiply 2 matrices together', () => {
      const a = new Matrix2();
      a.setElements(3, 5, 7, 11);
      const b = new Matrix2();
      b.setElements(13, 17, 19, 23);
      const c = (new Matrix2()).multiplyMatrices(a, b);
      const C = c.toArray();
      expect(C[0]).to.be.eql(3 * 13 + 5 * 19);
      expect(C[1]).to.be.eql(7 * 13 + 11 * 19);
      expect(C[2]).to.be.eql(3 * 17 + 5 * 23);
      expect(C[3]).to.be.eql(7 * 17 + 11 * 23);
      const d = a.clone().multiply(b);
      expect(d).to.be.eql(c);
      const f = b.clone().premultiply(a);
      expect(f).to.be.eql(c);
    });
    it('should print the matrix', () => {
      const a = new Matrix2();
      a.setElements(3.123456789, 1102345.123456789, 7.123456789e-15, 11.123456789);
      console.log(a.prettyPrint());
    });
  });
});
