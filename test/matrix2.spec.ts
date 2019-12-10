import { expect } from 'chai';
import { Matrix2 } from '../src/index';

describe('Matrix2', () => {
  describe('Basic Manipulations', () => {
    it('should create an identity matrix', () => {
      const a = new Matrix2();
      expect(a.elements[0]).to.be.eql(1);
      expect(a.elements[2]).to.be.eql(0);
      expect(a.elements[1]).to.be.eql(0);
      expect(a.elements[3]).to.be.eql(1);
    });
    it('should set the elements of a matrix via arguments', () => {
      const a = new Matrix2();
      a.set(3, 5, 7, 11);
      expect(a.elements[0]).to.be.eql(3);
      expect(a.elements[2]).to.be.eql(5);
      expect(a.elements[1]).to.be.eql(7);
      expect(a.elements[3]).to.be.eql(11);
    });
    it('should set the elements of a matrix via array', () => {
      const a = new Matrix2();
      const primes = [2, 3, 5, 7, 11, 13, 17, 19];
      a.fromArray(primes, 2);
      expect(a.elements[0]).to.be.eql(5);
      expect(a.elements[1]).to.be.eql(7);
      expect(a.elements[2]).to.be.eql(11);
      expect(a.elements[3]).to.be.eql(13);
    });
    it('should set the matrix as identity', () => {
      const a = new Matrix2();
      a.set(3, 5, 7, 11);
      a.identity();
      expect(a).to.be.eql(new Matrix2());
    });
    it('should clone a matrix', () => {
      const a = new Matrix2();
      a.set(3, 5, 7, 11);
      const b = a.clone();
      expect(a).to.be.eql(b);
    });
    it('should copy a matrix', () => {
      const a = new Matrix2();
      a.set(3, 5, 7, 11);
      const b = new Matrix2();
      b.copy(a);
      expect(a).to.be.eql(b);
    });
    it('should transpose a matrix', () => {
      const a = new Matrix2();
      a.set(3, 5, 7, 11);
      const b = a.clone().transpose();
      expect(a.elements[0]).to.be.eql(b.elements[0]);
      expect(a.elements[2]).to.be.eql(b.elements[1]);
      expect(a.elements[1]).to.be.eql(b.elements[2]);
      expect(a.elements[3]).to.be.eql(b.elements[3]);
    });
    it('should create an array from matrix values', () => {
      const a = new Matrix2();
      a.set(3, 5, 7, 11);
      const elems = a.toArray();
      expect(a.elements).to.be.eql(elems);

      const elemArray = [0, 0, 0, 0, 0, 0];
      a.toArray(elemArray, 2);
      expect(a.elements[0]).to.be.eql(elemArray[2 + 0]);
      expect(a.elements[1]).to.be.eql(elemArray[2 + 1]);
      expect(a.elements[2]).to.be.eql(elemArray[2 + 2]);
      expect(a.elements[3]).to.be.eql(elemArray[2 + 3]);
    });
  });
  describe('Arithmetic Operations', () => {
    it('should add a matrix to another', () => {
      const a = new Matrix2();
      a.set(3, 5, 7, 11);
      const b = new Matrix2();
      b.set(13, 17, 19, 23);
      const c = a.clone().add(b);
      expect(c.elements[0]).to.be.eql(3 + 13);
      expect(c.elements[2]).to.be.eql(5 + 17);
      expect(c.elements[1]).to.be.eql(7 + 19);
      expect(c.elements[3]).to.be.eql(11 + 23);
      const d = (new Matrix2()).addMatrices(a, b);
      expect(d.elements[0]).to.be.eql(3 + 13);
      expect(d.elements[2]).to.be.eql(5 + 17);
      expect(d.elements[1]).to.be.eql(7 + 19);
      expect(d.elements[3]).to.be.eql(11 + 23);
    });
    it('should add a scaled matrix to another', () => {
      const a = new Matrix2();
      a.set(3, 5, 7, 11);
      const b = new Matrix2();
      b.set(13, 17, 19, 23);
      const d = (new Matrix2()).addMatrices(a, b, 2);
      expect(d.elements[0]).to.be.eql(3 + 13 * 2);
      expect(d.elements[2]).to.be.eql(5 + 17 * 2);
      expect(d.elements[1]).to.be.eql(7 + 19 * 2);
      expect(d.elements[3]).to.be.eql(11 + 23 * 2);
    });
    it('should scale a matrix', () => {
      const a = new Matrix2();
      a.set(3, 5, 7, 11);
      a.multiplyScalar(13);
      expect(a.elements[0]).to.be.eql(3 * 13);
      expect(a.elements[2]).to.be.eql(5 * 13);
      expect(a.elements[1]).to.be.eql(7 * 13);
      expect(a.elements[3]).to.be.eql(11 * 13);
    });
    it('should calculate the determinant', () => {
      const a = new Matrix2();
      a.set(3, 5, 7, 11);
      const detA = a.determinant();
      expect(detA).to.be.eql(3 * 11 - 5 * 7);
    });
    it('should calculate the inverse', () => {
      const A = new Matrix2();
      const a = 3;
      const b = 5;
      const c = 7;
      const d = 11;
      A.set(a, b, c, d);
      const detA = A.determinant();
      A.invert();
      expect(A.elements[0]).to.be.eql(d / detA);
      expect(A.elements[2]).to.be.eql(-b / detA);
      expect(A.elements[1]).to.be.eql(-c / detA);
      expect(A.elements[3]).to.be.eql(a / detA);
    });
    it('should multiply 2 matrices together', () => {
      const a = new Matrix2();
      a.set(3, 5, 7, 11);
      const b = new Matrix2();
      b.set(13, 17, 19, 23);
      const c = (new Matrix2()).multiplyMatrices(a, b);
      expect(c.elements[0]).to.be.eql(3 * 13 + 5 * 19);
      expect(c.elements[1]).to.be.eql(7 * 13 + 11 * 19);
      expect(c.elements[2]).to.be.eql(3 * 17 + 5 * 23);
      expect(c.elements[3]).to.be.eql(7 * 17 + 11 * 23);
      const d = a.clone().multiply(b);
      expect(d).to.be.eql(c);
      const f = b.clone().premultiply(a);
      expect(f).to.be.eql(c);
    });
    it('should print the matrix', () => {
      const a = new Matrix2();
      a.set(3.123456789, 1102345.123456789, 7.123456789e-15, 11.123456789);
      console.log(a.prettyPrint());
    });
  });
});
