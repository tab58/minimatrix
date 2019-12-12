import { expect } from 'chai';
import { Matrix4 } from '../src/index';

const EPS = 1e-14;

describe('Matrix4', () => {
  describe('Basic Manipulations', () => {
    it('should create an identity matrix', () => {
      const a = new Matrix4();
      expect(a.elements[0]).to.be.eql(1);
      expect(a.elements[1]).to.be.eql(0);
      expect(a.elements[2]).to.be.eql(0);
      expect(a.elements[3]).to.be.eql(0);
      expect(a.elements[4]).to.be.eql(0);
      expect(a.elements[5]).to.be.eql(1);
      expect(a.elements[6]).to.be.eql(0);
      expect(a.elements[7]).to.be.eql(0);
      expect(a.elements[8]).to.be.eql(0);
      expect(a.elements[9]).to.be.eql(0);
      expect(a.elements[10]).to.be.eql(1);
      expect(a.elements[11]).to.be.eql(0);
      expect(a.elements[12]).to.be.eql(0);
      expect(a.elements[13]).to.be.eql(0);
      expect(a.elements[14]).to.be.eql(0);
      expect(a.elements[15]).to.be.eql(1);
    });
    it('should set the elements of a matrix via arguments', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      expect(a.elements[0]).to.be.eql(2);
      expect(a.elements[1]).to.be.eql(11);
      expect(a.elements[2]).to.be.eql(23);
      expect(a.elements[3]).to.be.eql(41);

      expect(a.elements[4]).to.be.eql(3);
      expect(a.elements[5]).to.be.eql(13);
      expect(a.elements[6]).to.be.eql(29);
      expect(a.elements[7]).to.be.eql(43);

      expect(a.elements[8]).to.be.eql(5);
      expect(a.elements[9]).to.be.eql(17);
      expect(a.elements[10]).to.be.eql(31);
      expect(a.elements[11]).to.be.eql(47);

      expect(a.elements[12]).to.be.eql(7);
      expect(a.elements[13]).to.be.eql(19);
      expect(a.elements[14]).to.be.eql(37);
      expect(a.elements[15]).to.be.eql(53);
    });
    it('should set the elements of a matrix via array', () => {
      const a = new Matrix4();
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71];
      a.fromArray(primes, 2);
      expect(a.elements[0]).to.be.eql(5);
      expect(a.elements[4]).to.be.eql(17);
      expect(a.elements[8]).to.be.eql(31);
      expect(a.elements[12]).to.be.eql(47);

      expect(a.elements[1]).to.be.eql(7);
      expect(a.elements[5]).to.be.eql(19);
      expect(a.elements[9]).to.be.eql(37);
      expect(a.elements[13]).to.be.eql(53);

      expect(a.elements[2]).to.be.eql(11);
      expect(a.elements[6]).to.be.eql(23);
      expect(a.elements[10]).to.be.eql(41);
      expect(a.elements[14]).to.be.eql(59);

      expect(a.elements[3]).to.be.eql(13);
      expect(a.elements[7]).to.be.eql(29);
      expect(a.elements[11]).to.be.eql(43);
      expect(a.elements[15]).to.be.eql(61);
    });
    it('should set the matrix as identity', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      a.identity();
      expect(a).to.be.eql(new Matrix4());
    });
    it('should clone a matrix', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = a.clone();
      expect(a).to.be.eql(b);
    });
    it('should copy a matrix', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = new Matrix4();
      b.copy(a);
      expect(a).to.be.eql(b);
    });
    it('should transpose a matrix', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = a.clone().transpose();
      
      expect(a.elements[0]).to.be.eql(b.elements[0]);
      expect(a.elements[4]).to.be.eql(b.elements[1]);
      expect(a.elements[8]).to.be.eql(b.elements[2]);
      expect(a.elements[12]).to.be.eql(b.elements[3]);
      expect(a.elements[1]).to.be.eql(b.elements[4]);
      expect(a.elements[5]).to.be.eql(b.elements[5]);
      expect(a.elements[9]).to.be.eql(b.elements[6]);
      expect(a.elements[13]).to.be.eql(b.elements[7]);
      expect(a.elements[2]).to.be.eql(b.elements[8]);
      expect(a.elements[6]).to.be.eql(b.elements[9]);
      expect(a.elements[10]).to.be.eql(b.elements[10]);
      expect(a.elements[14]).to.be.eql(b.elements[11]);
      expect(a.elements[3]).to.be.eql(b.elements[12]);
      expect(a.elements[7]).to.be.eql(b.elements[13]);
      expect(a.elements[11]).to.be.eql(b.elements[14]);
      expect(a.elements[15]).to.be.eql(b.elements[15]);
    });
    it('should create an array from matrix values', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const elems = a.toArray();
      expect(a.elements).to.be.eql(elems);

      const elemArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const offset = 2;
      a.toArray(elemArray, offset);
      for (let i = 0; i < 16; ++i) {
        expect(a.elements[i]).to.be.eql(elemArray[offset + i]);  
      }
    });
  });
  describe('Arithmetic Operations', () => {
    it('should add a matrix to another', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = new Matrix4();
      b.set(59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131);
      const c = a.clone().add(b);

      expect(c.elements[0]).to.be.eql(2 + 59);
      expect(c.elements[1]).to.be.eql(11 + 73);
      expect(c.elements[2]).to.be.eql(23 + 97);
      expect(c.elements[3]).to.be.eql(41 + 109);
      expect(c.elements[4]).to.be.eql(3 + 61);
      expect(c.elements[5]).to.be.eql(13 + 79);
      expect(c.elements[6]).to.be.eql(29 + 101);
      expect(c.elements[7]).to.be.eql(43 + 113);
      expect(c.elements[8]).to.be.eql(5 + 67);
      expect(c.elements[9]).to.be.eql(17 + 83);
      expect(c.elements[10]).to.be.eql(31 + 103);
      expect(c.elements[11]).to.be.eql(47 + 127);
      expect(c.elements[12]).to.be.eql(7 + 71);
      expect(c.elements[13]).to.be.eql(19 + 89);
      expect(c.elements[14]).to.be.eql(37 + 107);
      expect(c.elements[15]).to.be.eql(53 + 131);

      const d = (new Matrix4()).addMatrices(a, b);
      expect(d.elements[0]).to.be.eql(2 + 59);
      expect(d.elements[1]).to.be.eql(11 + 73);
      expect(d.elements[2]).to.be.eql(23 + 97);
      expect(d.elements[3]).to.be.eql(41 + 109);
      expect(d.elements[4]).to.be.eql(3 + 61);
      expect(d.elements[5]).to.be.eql(13 + 79);
      expect(d.elements[6]).to.be.eql(29 + 101);
      expect(d.elements[7]).to.be.eql(43 + 113);
      expect(d.elements[8]).to.be.eql(5 + 67);
      expect(d.elements[9]).to.be.eql(17 + 83);
      expect(d.elements[10]).to.be.eql(31 + 103);
      expect(d.elements[11]).to.be.eql(47 + 127);
      expect(d.elements[12]).to.be.eql(7 + 71);
      expect(d.elements[13]).to.be.eql(19 + 89);
      expect(d.elements[14]).to.be.eql(37 + 107);
      expect(d.elements[15]).to.be.eql(53 + 131);
    });
    it('should add a scaled matrix to another', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = new Matrix4();
      b.set(59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131);
      const d = (new Matrix4()).addMatrices(a, b, 2);
      expect(d.elements[0]).to.be.eql(2 + 59 * 2);
      expect(d.elements[1]).to.be.eql(11 + 73 * 2);
      expect(d.elements[2]).to.be.eql(23 + 97 * 2);
      expect(d.elements[3]).to.be.eql(41 + 109 * 2);
      expect(d.elements[4]).to.be.eql(3 + 61 * 2);
      expect(d.elements[5]).to.be.eql(13 + 79 * 2);
      expect(d.elements[6]).to.be.eql(29 + 101 * 2);
      expect(d.elements[7]).to.be.eql(43 + 113 * 2);
      expect(d.elements[8]).to.be.eql(5 + 67 * 2);
      expect(d.elements[9]).to.be.eql(17 + 83 * 2);
      expect(d.elements[10]).to.be.eql(31 + 103 * 2);
      expect(d.elements[11]).to.be.eql(47 + 127 * 2);
      expect(d.elements[12]).to.be.eql(7 + 71 * 2);
      expect(d.elements[13]).to.be.eql(19 + 89 * 2);
      expect(d.elements[14]).to.be.eql(37 + 107 * 2);
      expect(d.elements[15]).to.be.eql(53 + 131 * 2);
    });
    it('should scale a matrix', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      a.multiplyScalar(59);
      expect(a.elements[0]).to.be.eql(2 * 59);
      expect(a.elements[1]).to.be.eql(11 * 59);
      expect(a.elements[2]).to.be.eql(23 * 59);
      expect(a.elements[3]).to.be.eql(41 * 59);
      expect(a.elements[4]).to.be.eql(3 * 59);
      expect(a.elements[5]).to.be.eql(13 * 59);
      expect(a.elements[6]).to.be.eql(29 * 59);
      expect(a.elements[7]).to.be.eql(43 * 59);
      expect(a.elements[8]).to.be.eql(5 * 59);
      expect(a.elements[9]).to.be.eql(17 * 59);
      expect(a.elements[10]).to.be.eql(31 * 59);
      expect(a.elements[11]).to.be.eql(47 * 59);
      expect(a.elements[12]).to.be.eql(7 * 59);
      expect(a.elements[13]).to.be.eql(19 * 59);
      expect(a.elements[14]).to.be.eql(37 * 59);
      expect(a.elements[15]).to.be.eql(53 * 59);
    });
    it('should calculate the determinant', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const detA = a.determinant();
      expect(detA).to.be.eql(880);
    });
    it('should calculate the inverse', () => {
      const A = new Matrix4();
      A.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      A.invert();
      const a = A.elements;
      expect(Math.abs(a[0] - 3/11) < EPS).to.be.true;
      expect(Math.abs(a[1] - -5/11) < EPS).to.be.true;
      expect(Math.abs(a[2] - -13/22) < EPS).to.be.true;
      expect(Math.abs(a[3] - 15/22) < EPS).to.be.true;
      expect(Math.abs(a[4] - -12/55) < EPS).to.be.true;
      expect(Math.abs(a[5] - -2/55) < EPS).to.be.true;
      expect(Math.abs(a[6] - 307/440) < EPS).to.be.true;
      expect(Math.abs(a[7] - -37/88) < EPS).to.be.true;
      expect(Math.abs(a[8] - -1/5) < EPS).to.be.true;
      expect(Math.abs(a[9] - 3/10) < EPS).to.be.true;
      expect(Math.abs(a[10] - -1/10) < EPS).to.be.true;
      expect(Math.abs(a[11] - 0) < EPS).to.be.true;
      expect(Math.abs(a[12] - 2/11) < EPS).to.be.true;
      expect(Math.abs(a[13] - -3/22) < EPS).to.be.true;
      expect(Math.abs(a[14] - -9/88) < EPS).to.be.true;
      expect(Math.abs(a[15] - 7/88) < EPS).to.be.true;
    });
    it('should multiply 2 matrices together', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = new Matrix4();
      b.set(59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131);
      const c = (new Matrix4()).multiplyMatrices(a, b);
      const C = c.elements;
      expect(C[0]).to.be.eql(1585);
      expect(C[1]).to.be.eql(5318);
      expect(C[2]).to.be.eql(10514);
      expect(C[3]).to.be.eql(15894);
      expect(C[4]).to.be.eql(1655);
      expect(C[5]).to.be.eql(5562);
      expect(C[6]).to.be.eql(11006);
      expect(C[7]).to.be.eql(16634);
      expect(C[8]).to.be.eql(1787);
      expect(C[9]).to.be.eql(5980);
      expect(C[10]).to.be.eql(11840);
      expect(C[11]).to.be.eql(17888);
      expect(C[12]).to.be.eql(1861);
      expect(C[13]).to.be.eql(6246);
      expect(C[14]).to.be.eql(12378);
      expect(C[15]).to.be.eql(18710);

      const d = a.clone().multiply(b);
      expect(d).to.be.eql(c);
      const f = b.clone().premultiply(a);
      expect(f).to.be.eql(c);
    });
    it('should print the matrix', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      console.log(a.prettyPrint());
    });
  });
  describe('Linear Algebra Functions', () => {
    it('should compute the determinant', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const det = a.determinant();
      expect(det).to.be.eql(880);
    });
    it('should compute the adjugate matrix', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = new Matrix4();
      b.set(240, -192, -176, 160, -400, -32, 264, -120, -520, 614, -88, -90, 600, -370, 0, 70);
      const c = new Matrix4().copy(a);
      
      c.getAdjugate(a);
      a.adjugate();
      expect(a).to.be.eql(b);
      expect(c).to.be.eql(b);
    });
    it('should compute the matrix trace', () => {
      const a = new Matrix4();
      a.set(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const trace = a.trace();
      expect(trace).to.be.eql(99);
    });
  });
});