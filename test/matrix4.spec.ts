import { expect } from 'chai';
import { Matrix4, Vector3, Vector4 } from '../src/index';

const EPS = 1e-14;

describe('Matrix4', () => {
  describe('Basic Manipulations', () => {
    it('should create an identity matrix', () => {
      const a = new Matrix4();
      const ae = a.toArray();
      expect(ae[0]).to.be.eql(1);
      expect(ae[1]).to.be.eql(0);
      expect(ae[2]).to.be.eql(0);
      expect(ae[3]).to.be.eql(0);
      expect(ae[4]).to.be.eql(0);
      expect(ae[5]).to.be.eql(1);
      expect(ae[6]).to.be.eql(0);
      expect(ae[7]).to.be.eql(0);
      expect(ae[8]).to.be.eql(0);
      expect(ae[9]).to.be.eql(0);
      expect(ae[10]).to.be.eql(1);
      expect(ae[11]).to.be.eql(0);
      expect(ae[12]).to.be.eql(0);
      expect(ae[13]).to.be.eql(0);
      expect(ae[14]).to.be.eql(0);
      expect(ae[15]).to.be.eql(1);
    });
    it('should set the elements of a matrix via arguments', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const ae = a.toArray();
      expect(ae[0]).to.be.eql(2);
      expect(ae[1]).to.be.eql(11);
      expect(ae[2]).to.be.eql(23);
      expect(ae[3]).to.be.eql(41);

      expect(ae[4]).to.be.eql(3);
      expect(ae[5]).to.be.eql(13);
      expect(ae[6]).to.be.eql(29);
      expect(ae[7]).to.be.eql(43);

      expect(ae[8]).to.be.eql(5);
      expect(ae[9]).to.be.eql(17);
      expect(ae[10]).to.be.eql(31);
      expect(ae[11]).to.be.eql(47);

      expect(ae[12]).to.be.eql(7);
      expect(ae[13]).to.be.eql(19);
      expect(ae[14]).to.be.eql(37);
      expect(ae[15]).to.be.eql(53);
    });
    it('should set the elements of a matrix via array', () => {
      const a = new Matrix4();
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71];
      a.fromArray(primes, 2);
      const ae = a.toArray();
      expect(ae[0]).to.be.eql(5);
      expect(ae[4]).to.be.eql(17);
      expect(ae[8]).to.be.eql(31);
      expect(ae[12]).to.be.eql(47);

      expect(ae[1]).to.be.eql(7);
      expect(ae[5]).to.be.eql(19);
      expect(ae[9]).to.be.eql(37);
      expect(ae[13]).to.be.eql(53);

      expect(ae[2]).to.be.eql(11);
      expect(ae[6]).to.be.eql(23);
      expect(ae[10]).to.be.eql(41);
      expect(ae[14]).to.be.eql(59);

      expect(ae[3]).to.be.eql(13);
      expect(ae[7]).to.be.eql(29);
      expect(ae[11]).to.be.eql(43);
      expect(ae[15]).to.be.eql(61);
    });
    it('should set the matrix as identity', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      a.identity();
      expect(a).to.be.eql(new Matrix4());
    });
    it('should clone a matrix', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = a.clone();
      expect(a).to.be.eql(b);
    });
    it('should copy a matrix', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = new Matrix4();
      b.copy(a);
      expect(a).to.be.eql(b);
    });
    it('should transpose a matrix', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = a.clone().transpose();
      const ae = a.toArray();
      const be = b.toArray();
      
      expect(ae[0]).to.be.eql(be[0]);
      expect(ae[4]).to.be.eql(be[1]);
      expect(ae[8]).to.be.eql(be[2]);
      expect(ae[12]).to.be.eql(be[3]);
      expect(ae[1]).to.be.eql(be[4]);
      expect(ae[5]).to.be.eql(be[5]);
      expect(ae[9]).to.be.eql(be[6]);
      expect(ae[13]).to.be.eql(be[7]);
      expect(ae[2]).to.be.eql(be[8]);
      expect(ae[6]).to.be.eql(be[9]);
      expect(ae[10]).to.be.eql(be[10]);
      expect(ae[14]).to.be.eql(be[11]);
      expect(ae[3]).to.be.eql(be[12]);
      expect(ae[7]).to.be.eql(be[13]);
      expect(ae[11]).to.be.eql(be[14]);
      expect(ae[15]).to.be.eql(be[15]);
    });
    it('should create an array from matrix values', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const elems = a.toArray();

      const elemArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const offset = 2;
      a.toArray(elemArray, offset);
      for (let i = 0; i < 16; ++i) {
        expect(elems[i]).to.be.eql(elemArray[offset + i]);  
      }
    });
    it('should swap rows in a matrix', () => {
      const A = new Matrix4();
      A.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      A.swapRows(0, 2);
      expect(A.get(2, 0)).to.be.eql(2);
      expect(A.get(2, 1)).to.be.eql(3);
      expect(A.get(2, 2)).to.be.eql(5);
      expect(A.get(2, 3)).to.be.eql(7);
      expect(A.get(1, 0)).to.be.eql(11);
      expect(A.get(1, 1)).to.be.eql(13);
      expect(A.get(1, 2)).to.be.eql(17);
      expect(A.get(1, 3)).to.be.eql(19);
      expect(A.get(0, 0)).to.be.eql(23);
      expect(A.get(0, 1)).to.be.eql(29);
      expect(A.get(0, 2)).to.be.eql(31);
      expect(A.get(0, 3)).to.be.eql(37);
      expect(A.get(3, 0)).to.be.eql(41);
      expect(A.get(3, 1)).to.be.eql(43);
      expect(A.get(3, 2)).to.be.eql(47);
      expect(A.get(3, 3)).to.be.eql(53);

      expect(A.swapRows.bind(A, 0, 5)).to.throw(`swapRows(): row index out of bounds.`);
      expect(A.swapRows.bind(A, 5, 0)).to.throw(`swapRows(): row index out of bounds.`);
      expect(A.swapRows.bind(A, 4, 5)).to.throw(`swapRows(): row index out of bounds.`);
    
      A.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      A.swapRows(2, 2);
      expect(A.get(0, 0)).to.be.eql(2);
      expect(A.get(0, 1)).to.be.eql(3);
      expect(A.get(0, 2)).to.be.eql(5);
      expect(A.get(0, 3)).to.be.eql(7);
      expect(A.get(1, 0)).to.be.eql(11);
      expect(A.get(1, 1)).to.be.eql(13);
      expect(A.get(1, 2)).to.be.eql(17);
      expect(A.get(1, 3)).to.be.eql(19);
      expect(A.get(2, 0)).to.be.eql(23);
      expect(A.get(2, 1)).to.be.eql(29);
      expect(A.get(2, 2)).to.be.eql(31);
      expect(A.get(2, 3)).to.be.eql(37);
      expect(A.get(3, 0)).to.be.eql(41);
      expect(A.get(3, 1)).to.be.eql(43);
      expect(A.get(3, 2)).to.be.eql(47);
      expect(A.get(3, 3)).to.be.eql(53);
    });
    it('should swap columns in a matrix', () => {
      const A = new Matrix4();
      A.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      A.swapColumns(0, 2);
      expect(A.get(0, 2)).to.be.eql(2);
      expect(A.get(0, 1)).to.be.eql(3);
      expect(A.get(0, 0)).to.be.eql(5);
      expect(A.get(0, 3)).to.be.eql(7);
      
      expect(A.get(1, 2)).to.be.eql(11);
      expect(A.get(1, 1)).to.be.eql(13);
      expect(A.get(1, 0)).to.be.eql(17);
      expect(A.get(1, 3)).to.be.eql(19);
      
      expect(A.get(2, 2)).to.be.eql(23);
      expect(A.get(2, 1)).to.be.eql(29);
      expect(A.get(2, 0)).to.be.eql(31);
      expect(A.get(2, 3)).to.be.eql(37);

      expect(A.get(3, 2)).to.be.eql(41);
      expect(A.get(3, 1)).to.be.eql(43);
      expect(A.get(3, 0)).to.be.eql(47);
      expect(A.get(3, 3)).to.be.eql(53);

      expect(A.swapColumns.bind(A, 0, 4)).to.throw(`swapColumns(): column index out of bounds.`);
      expect(A.swapColumns.bind(A, 4, 0)).to.throw(`swapColumns(): column index out of bounds.`);
      expect(A.swapColumns.bind(A, 4, 5)).to.throw(`swapColumns(): column index out of bounds.`);
      
      A.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      A.swapColumns(2, 2);
      expect(A.get(0, 0)).to.be.eql(2);
      expect(A.get(0, 1)).to.be.eql(3);
      expect(A.get(0, 2)).to.be.eql(5);
      expect(A.get(0, 3)).to.be.eql(7);
      
      expect(A.get(1, 0)).to.be.eql(11);
      expect(A.get(1, 1)).to.be.eql(13);
      expect(A.get(1, 2)).to.be.eql(17);
      expect(A.get(1, 3)).to.be.eql(19);
      
      expect(A.get(2, 0)).to.be.eql(23);
      expect(A.get(2, 1)).to.be.eql(29);
      expect(A.get(2, 2)).to.be.eql(31);
      expect(A.get(2, 3)).to.be.eql(37);

      expect(A.get(3, 0)).to.be.eql(41);
      expect(A.get(3, 1)).to.be.eql(43);
      expect(A.get(3, 2)).to.be.eql(47);
      expect(A.get(3, 3)).to.be.eql(53);
    });
    it('should get a row from the matrix', () => {
      const A = new Matrix4();
      A.setElements(11, 13, 17, 19,
        23, 29, 31, 37,
        41, 43, 47, 53,
        59, 61, 67, 71);
      expect(A.getRow(0)).to.be.eql(new Vector4(11, 13, 17, 19));
      expect(A.getRow(1)).to.be.eql(new Vector4(23, 29, 31, 37));
      expect(A.getRow(2)).to.be.eql(new Vector4(41, 43, 47, 53));
      expect(A.getRow(3)).to.be.eql(new Vector4(59, 61, 67, 71));
      
      expect(A.getRow.bind(A, 4)).to.throw('getRow(): no row defined at 4.');
    });
    it('should get a column from the matrix', () => {
      const A = new Matrix4();
      A.setElements(11, 13, 17, 19,
        23, 29, 31, 37,
        41, 43, 47, 53,
        59, 61, 67, 71);
      expect(A.getColumn(0)).to.be.eql(new Vector4(11, 23, 41, 59));
      expect(A.getColumn(1)).to.be.eql(new Vector4(13, 29, 43, 61));
      expect(A.getColumn(2)).to.be.eql(new Vector4(17, 31, 47, 67));
      expect(A.getColumn(3)).to.be.eql(new Vector4(19, 37, 53, 71));

      expect(A.getColumn.bind(A, 4)).to.throw('getColumn(): no column defined at 4.');
    });
    it('should get a value from the matrix', () => {
      const A = new Matrix4();
      A.setElements(11, 13, 17, 19,
        23, 29, 31, 37,
        41, 43, 47, 53,
        59, 61, 67, 71);
      expect(A.get(0, 3)).to.be.eql(19);
      expect(A.get(2, 2)).to.be.eql(47);
    });
    it('should set a value of the matrix', () => {
      const A = new Matrix4();
      A.setElements(11, 13, 17, 19,
        23, 29, 31, 37,
        41, 43, 47, 53,
        59, 61, 67, 71);
      A.set(1, 2, 73);

      expect(A.get(0, 0)).to.be.eql(11);
      expect(A.get(0, 1)).to.be.eql(13);      
      expect(A.get(0, 2)).to.be.eql(17);
      expect(A.get(0, 3)).to.be.eql(19);

      expect(A.get(1, 0)).to.be.eql(23);
      expect(A.get(1, 1)).to.be.eql(29);      
      expect(A.get(1, 2)).to.be.eql(73);
      expect(A.get(1, 3)).to.be.eql(37);
      
      expect(A.get(2, 0)).to.be.eql(41);
      expect(A.get(2, 1)).to.be.eql(43);      
      expect(A.get(2, 2)).to.be.eql(47);
      expect(A.get(2, 3)).to.be.eql(53);
      
      expect(A.get(3, 0)).to.be.eql(59);
      expect(A.get(3, 1)).to.be.eql(61);      
      expect(A.get(3, 2)).to.be.eql(67);
      expect(A.get(3, 3)).to.be.eql(71);
    });
    it('should copy the position from another matrix', () => {
      const A = new Matrix4();
      A.setElements(11, 13, 17, 19,
        23, 29, 31, 37,
        41, 43, 47, 53,
        59, 61, 67, 71);
      const B = new Matrix4();
      B.copyPosition(A);
      
      expect(B.get(0, 0)).to.be.eql(1);
      expect(B.get(0, 1)).to.be.eql(0);      
      expect(B.get(0, 2)).to.be.eql(0);
      expect(B.get(0, 3)).to.be.eql(19);

      expect(B.get(1, 0)).to.be.eql(0);
      expect(B.get(1, 1)).to.be.eql(1);      
      expect(B.get(1, 2)).to.be.eql(0);
      expect(B.get(1, 3)).to.be.eql(37);
      
      expect(B.get(2, 0)).to.be.eql(0);
      expect(B.get(2, 1)).to.be.eql(0);      
      expect(B.get(2, 2)).to.be.eql(1);
      expect(B.get(2, 3)).to.be.eql(53);
      
      expect(B.get(3, 0)).to.be.eql(0);
      expect(B.get(3, 1)).to.be.eql(0);      
      expect(B.get(3, 2)).to.be.eql(0);
      expect(B.get(3, 3)).to.be.eql(1);
    });
  });
  describe('Arithmetic Operations', () => {
    it('should add a matrix to another', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = new Matrix4();
      b.setElements(59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131);
      const c = a.clone().add(b);
      const ce = c.toArray();

      expect(ce[0]).to.be.eql(2 + 59);
      expect(ce[1]).to.be.eql(11 + 73);
      expect(ce[2]).to.be.eql(23 + 97);
      expect(ce[3]).to.be.eql(41 + 109);
      expect(ce[4]).to.be.eql(3 + 61);
      expect(ce[5]).to.be.eql(13 + 79);
      expect(ce[6]).to.be.eql(29 + 101);
      expect(ce[7]).to.be.eql(43 + 113);
      expect(ce[8]).to.be.eql(5 + 67);
      expect(ce[9]).to.be.eql(17 + 83);
      expect(ce[10]).to.be.eql(31 + 103);
      expect(ce[11]).to.be.eql(47 + 127);
      expect(ce[12]).to.be.eql(7 + 71);
      expect(ce[13]).to.be.eql(19 + 89);
      expect(ce[14]).to.be.eql(37 + 107);
      expect(ce[15]).to.be.eql(53 + 131);

      const d = (new Matrix4()).addMatrices(a, b);
      const de = d.toArray();
      expect(de[0]).to.be.eql(2 + 59);
      expect(de[1]).to.be.eql(11 + 73);
      expect(de[2]).to.be.eql(23 + 97);
      expect(de[3]).to.be.eql(41 + 109);
      expect(de[4]).to.be.eql(3 + 61);
      expect(de[5]).to.be.eql(13 + 79);
      expect(de[6]).to.be.eql(29 + 101);
      expect(de[7]).to.be.eql(43 + 113);
      expect(de[8]).to.be.eql(5 + 67);
      expect(de[9]).to.be.eql(17 + 83);
      expect(de[10]).to.be.eql(31 + 103);
      expect(de[11]).to.be.eql(47 + 127);
      expect(de[12]).to.be.eql(7 + 71);
      expect(de[13]).to.be.eql(19 + 89);
      expect(de[14]).to.be.eql(37 + 107);
      expect(de[15]).to.be.eql(53 + 131);
    });
    it('should add a scaled matrix to another', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = new Matrix4();
      b.setElements(59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131);
      const d = (new Matrix4()).addMatrices(a, b, 2);
      const de = d.toArray();
      expect(de[0]).to.be.eql(2 + 59 * 2);
      expect(de[1]).to.be.eql(11 + 73 * 2);
      expect(de[2]).to.be.eql(23 + 97 * 2);
      expect(de[3]).to.be.eql(41 + 109 * 2);
      expect(de[4]).to.be.eql(3 + 61 * 2);
      expect(de[5]).to.be.eql(13 + 79 * 2);
      expect(de[6]).to.be.eql(29 + 101 * 2);
      expect(de[7]).to.be.eql(43 + 113 * 2);
      expect(de[8]).to.be.eql(5 + 67 * 2);
      expect(de[9]).to.be.eql(17 + 83 * 2);
      expect(de[10]).to.be.eql(31 + 103 * 2);
      expect(de[11]).to.be.eql(47 + 127 * 2);
      expect(de[12]).to.be.eql(7 + 71 * 2);
      expect(de[13]).to.be.eql(19 + 89 * 2);
      expect(de[14]).to.be.eql(37 + 107 * 2);
      expect(de[15]).to.be.eql(53 + 131 * 2);
    });
    it('should scale a matrix', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      a.multiplyScalar(59);
      const ae = a.toArray();
      expect(ae[0]).to.be.eql(2 * 59);
      expect(ae[1]).to.be.eql(11 * 59);
      expect(ae[2]).to.be.eql(23 * 59);
      expect(ae[3]).to.be.eql(41 * 59);
      expect(ae[4]).to.be.eql(3 * 59);
      expect(ae[5]).to.be.eql(13 * 59);
      expect(ae[6]).to.be.eql(29 * 59);
      expect(ae[7]).to.be.eql(43 * 59);
      expect(ae[8]).to.be.eql(5 * 59);
      expect(ae[9]).to.be.eql(17 * 59);
      expect(ae[10]).to.be.eql(31 * 59);
      expect(ae[11]).to.be.eql(47 * 59);
      expect(ae[12]).to.be.eql(7 * 59);
      expect(ae[13]).to.be.eql(19 * 59);
      expect(ae[14]).to.be.eql(37 * 59);
      expect(ae[15]).to.be.eql(53 * 59);
    });
    it('should calculate the determinant', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const detA = a.determinant();
      expect(detA).to.be.eql(880);
    });
    it('should calculate the inverse', () => {
      const A = new Matrix4();
      A.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      A.invert();
      const a = A.toArray();
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

      const B = new Matrix4();
      B.setElements(0, 0, 0, 0, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      expect(B.invert.bind(B, 1e-14, true)).to.throw('Matrix4.getInverse(): matrix is degenerate.');
      
      const M = new Matrix4().identity();
      expect(B.getInverse(B, false)).to.be.eql(M);
    });
    it('should multiply 2 matrices together', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = new Matrix4();
      b.setElements(59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131);
      const c = (new Matrix4()).multiplyMatrices(a, b);
      const C = c.toArray();
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
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      console.log(a.prettyPrint());
    });
    it('should scale the matrix', () => {
      const A = new Matrix4();
      A.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 0, 0, 0, 1);
      A.scale(new Vector3(2, 3, 5));
      expect(A.get(0, 0)).to.be.eql(2 * 2);
      expect(A.get(0, 1)).to.be.eql(3 * 3);
      expect(A.get(0, 2)).to.be.eql(5 * 5);
      expect(A.get(0, 3)).to.be.eql(7);

      expect(A.get(1, 0)).to.be.eql(11 * 2);
      expect(A.get(1, 1)).to.be.eql(13 * 3);
      expect(A.get(1, 2)).to.be.eql(17 * 5);
      expect(A.get(1, 3)).to.be.eql(19);
      
      expect(A.get(2, 0)).to.be.eql(23 * 2);
      expect(A.get(2, 1)).to.be.eql(29 * 3);
      expect(A.get(2, 2)).to.be.eql(31 * 5);
      expect(A.get(2, 3)).to.be.eql(37);

      expect(A.get(3, 0)).to.be.eql(0);
      expect(A.get(3, 1)).to.be.eql(0);
      expect(A.get(3, 2)).to.be.eql(0);
      expect(A.get(3, 3)).to.be.eql(1);
    });
    it('should make a 3D projective translation matrix', () => {
      const A = new Matrix4();
      A.makeTranslation(2, 3, 5);
      expect(A.get(0, 0)).to.be.eql(1);
      expect(A.get(0, 1)).to.be.eql(0);
      expect(A.get(0, 2)).to.be.eql(0);
      expect(A.get(0, 3)).to.be.eql(2);

      expect(A.get(1, 0)).to.be.eql(0);
      expect(A.get(1, 1)).to.be.eql(1);
      expect(A.get(1, 2)).to.be.eql(0);
      expect(A.get(1, 3)).to.be.eql(3);
      
      expect(A.get(2, 0)).to.be.eql(0);
      expect(A.get(2, 1)).to.be.eql(0);
      expect(A.get(2, 2)).to.be.eql(1);
      expect(A.get(2, 3)).to.be.eql(5);

      expect(A.get(3, 0)).to.be.eql(0);
      expect(A.get(3, 1)).to.be.eql(0);
      expect(A.get(3, 2)).to.be.eql(0);
      expect(A.get(3, 3)).to.be.eql(1);
    });
    it('should make a 3D projective X-rotation matrix', () => {
      const A = new Matrix4();
      const t = 45 * Math.PI / 180;
      A.makeRotationX(t);
      const c = Math.cos(t);
      const s = Math.sin(t);
      expect(A.get(0, 0)).to.be.eql(1);
      expect(A.get(0, 1)).to.be.eql(0);
      expect(A.get(0, 2)).to.be.eql(0);
      expect(A.get(0, 3)).to.be.eql(0);

      expect(A.get(1, 0)).to.be.eql(0);
      expect(A.get(1, 1)).to.be.eql(c);
      expect(A.get(1, 2)).to.be.eql(-s);
      expect(A.get(1, 3)).to.be.eql(0);
      
      expect(A.get(2, 0)).to.be.eql(0);
      expect(A.get(2, 1)).to.be.eql(s);
      expect(A.get(2, 2)).to.be.eql(c);
      expect(A.get(2, 3)).to.be.eql(0);

      expect(A.get(3, 0)).to.be.eql(0);
      expect(A.get(3, 1)).to.be.eql(0);
      expect(A.get(3, 2)).to.be.eql(0);
      expect(A.get(3, 3)).to.be.eql(1);
    });
    it('should make a 3D projective Y-rotation matrix', () => {
      const A = new Matrix4();
      const t = 45 * Math.PI / 180;
      A.makeRotationY(t);
      const c = Math.cos(t);
      const s = Math.sin(t);
      expect(A.get(0, 0)).to.be.eql(c);
      expect(A.get(0, 1)).to.be.eql(0);
      expect(A.get(0, 2)).to.be.eql(s);
      expect(A.get(0, 3)).to.be.eql(0);

      expect(A.get(1, 0)).to.be.eql(0);
      expect(A.get(1, 1)).to.be.eql(1);
      expect(A.get(1, 2)).to.be.eql(0);
      expect(A.get(1, 3)).to.be.eql(0);
      
      expect(A.get(2, 0)).to.be.eql(-s);
      expect(A.get(2, 1)).to.be.eql(0);
      expect(A.get(2, 2)).to.be.eql(c);
      expect(A.get(2, 3)).to.be.eql(0);

      expect(A.get(3, 0)).to.be.eql(0);
      expect(A.get(3, 1)).to.be.eql(0);
      expect(A.get(3, 2)).to.be.eql(0);
      expect(A.get(3, 3)).to.be.eql(1);
    });
    it('should make a 3D projective Z-rotation matrix', () => {
      const A = new Matrix4();
      const t = 45 * Math.PI / 180;
      A.makeRotationZ(t);
      const c = Math.cos(t);
      const s = Math.sin(t);
      expect(A.get(0, 0)).to.be.eql(c);
      expect(A.get(0, 1)).to.be.eql(-s);
      expect(A.get(0, 2)).to.be.eql(0);
      expect(A.get(0, 3)).to.be.eql(0);

      expect(A.get(1, 0)).to.be.eql(s);
      expect(A.get(1, 1)).to.be.eql(c);
      expect(A.get(1, 2)).to.be.eql(0);
      expect(A.get(1, 3)).to.be.eql(0);
      
      expect(A.get(2, 0)).to.be.eql(0);
      expect(A.get(2, 1)).to.be.eql(0);
      expect(A.get(2, 2)).to.be.eql(1);
      expect(A.get(2, 3)).to.be.eql(0);

      expect(A.get(3, 0)).to.be.eql(0);
      expect(A.get(3, 1)).to.be.eql(0);
      expect(A.get(3, 2)).to.be.eql(0);
      expect(A.get(3, 3)).to.be.eql(1);
    });
    it('should make a 3D projective rotation matrix around an axis by an angle', () => {
      const xAxis = new Vector3(1, 0, 0);
      const yAxis = new Vector3(0, 1, 0);
      const zAxis = new Vector3(0, 0, 1);
      const t = 45 * Math.PI / 180;

      const A = new Matrix4();
      const B = new Matrix4();
      expect(A.makeRotationAxis(xAxis, t)).to.be.eql(B.makeRotationX(t));
      expect(A.makeRotationAxis(yAxis, t)).to.be.eql(B.makeRotationY(t));
      expect(A.makeRotationAxis(zAxis, t)).to.be.eql(B.makeRotationZ(t));
    });
    it('should make a 3D projective scaling matrix', () => {
      const s = new Vector3(2, 3, 5);
      const A = new Matrix4().makeScale(s.x, s.y, s.z);
      
      expect(A.get(0, 0)).to.be.eql(s.x);
      expect(A.get(0, 1)).to.be.eql(0);
      expect(A.get(0, 2)).to.be.eql(0);
      expect(A.get(0, 3)).to.be.eql(0);

      expect(A.get(1, 0)).to.be.eql(0);
      expect(A.get(1, 1)).to.be.eql(s.y);
      expect(A.get(1, 2)).to.be.eql(0);
      expect(A.get(1, 3)).to.be.eql(0);
      
      expect(A.get(2, 0)).to.be.eql(0);
      expect(A.get(2, 1)).to.be.eql(0);
      expect(A.get(2, 2)).to.be.eql(s.z);
      expect(A.get(2, 3)).to.be.eql(0);

      expect(A.get(3, 0)).to.be.eql(0);
      expect(A.get(3, 1)).to.be.eql(0);
      expect(A.get(3, 2)).to.be.eql(0);
      expect(A.get(3, 3)).to.be.eql(1);
    });
    it('should make a 3D projective shearing matrix', () => {
      const x = 2;
      const y = 3;
      const z = 5;
      const A = new Matrix4().makeShear(x, y, z);
      
      expect(A.get(0, 0)).to.be.eql(1);
      expect(A.get(0, 1)).to.be.eql(y);
      expect(A.get(0, 2)).to.be.eql(z);
      expect(A.get(0, 3)).to.be.eql(0);

      expect(A.get(1, 0)).to.be.eql(x);
      expect(A.get(1, 1)).to.be.eql(1);
      expect(A.get(1, 2)).to.be.eql(z);
      expect(A.get(1, 3)).to.be.eql(0);
      
      expect(A.get(2, 0)).to.be.eql(x);
      expect(A.get(2, 1)).to.be.eql(y);
      expect(A.get(2, 2)).to.be.eql(1);
      expect(A.get(2, 3)).to.be.eql(0);

      expect(A.get(3, 0)).to.be.eql(0);
      expect(A.get(3, 1)).to.be.eql(0);
      expect(A.get(3, 2)).to.be.eql(0);
      expect(A.get(3, 3)).to.be.eql(1);
    });
    it('should apply a function to the matrix elements', () => {
      const A = new Matrix4();
      A.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      A.applyFunction((elems: number[]) => {
        for (let i = 0; i < elems.length; ++i) {
          elems[i] *= 2;
        }
      });

      const B = new Matrix4();
      B.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53)
        .multiplyScalar(2);

      expect(A.toArray()).to.be.eql(B.toArray());
    });
  });
  describe('Linear Algebra Functions', () => {
    it('should compute the determinant', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const det = a.determinant();
      expect(det).to.be.eql(880);
    });
    it('should compute the adjugate matrix', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const b = new Matrix4();
      b.setElements(240, -192, -176, 160, -400, -32, 264, -120, -520, 614, -88, -90, 600, -370, 0, 70);
      const c = new Matrix4().copy(a);
      
      c.getAdjugate(a);
      a.adjugate();
      expect(a).to.be.eql(b);
      expect(c).to.be.eql(b);
    });
    it('should compute the matrix trace', () => {
      const a = new Matrix4();
      a.setElements(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53);
      const trace = a.trace();
      expect(trace).to.be.eql(99);
    });
    it('should transform a row vector (x^T * A)', () => {
      const x = new Vector4(2, 3, 5, 7);
      const A = new Matrix4().setElements(11, 13, 17, 19,
        23, 29, 31, 37,
        41, 43, 47, 53,
        59, 61, 67, 71);
      const y = A.transformRowVector(x);

      expect(y.getComponent(0)).to.be.eql(709);
      expect(y.getComponent(1)).to.be.eql(755);
      expect(y.getComponent(2)).to.be.eql(831);
      expect(y.getComponent(3)).to.be.eql(911);
    });
    it('should transform a column vector (A * x)', () => {
      const x = new Vector4(2, 3, 5, 7);
      const A = new Matrix4().setElements(11, 13, 17, 19,
        23, 29, 31, 37,
        41, 43, 47, 53,
        59, 61, 67, 71);
      const y = A.transformVector(x);

      expect(y.getComponent(0)).to.be.eql(279);
      expect(y.getComponent(1)).to.be.eql(547);
      expect(y.getComponent(2)).to.be.eql(817);
      expect(y.getComponent(3)).to.be.eql(1133);
    });
    it('should set the position of the transformation matrix', () => {
      const v = new Vector3(2, 3, 5);
      const A = new Matrix4();
      A.setPosition(v.x, v.y, v.z);
      expect(A.get(0, 3)).to.be.eql(v.x);
      expect(A.get(1, 3)).to.be.eql(v.y);
      expect(A.get(2, 3)).to.be.eql(v.z);
    });
    it('should calculate the outer product correctly', () => {
      const A = new Matrix4();
      const u = new Vector4(2, 3, 5, 7);
      const v = new Vector4(11, 13, 17, 23);
      const s = 2;
      A.setOuterProduct(u, v, s);
      expect(A.get(0, 0)).to.be.eql(22 * s);
      expect(A.get(0, 1)).to.be.eql(26 * s);
      expect(A.get(0, 2)).to.be.eql(34 * s);
      expect(A.get(0, 3)).to.be.eql(46 * s);

      expect(A.get(1, 0)).to.be.eql(33 * s);
      expect(A.get(1, 1)).to.be.eql(39 * s);
      expect(A.get(1, 2)).to.be.eql(51 * s);
      expect(A.get(1, 3)).to.be.eql(69 * s);
      
      expect(A.get(2, 0)).to.be.eql(55 * s);
      expect(A.get(2, 1)).to.be.eql(65 * s);
      expect(A.get(2, 2)).to.be.eql(85 * s);
      expect(A.get(2, 3)).to.be.eql(115 * s);

      expect(A.get(3, 0)).to.be.eql(77 * s);
      expect(A.get(3, 1)).to.be.eql(91 * s);
      expect(A.get(3, 2)).to.be.eql(119 * s);
      expect(A.get(3, 3)).to.be.eql(161 * s);

      const B = new Matrix4();
      B.setOuterProduct(u, v);
      expect(B.get(0, 0)).to.be.eql(22);
      expect(B.get(0, 1)).to.be.eql(26);
      expect(B.get(0, 2)).to.be.eql(34);
      expect(B.get(0, 3)).to.be.eql(46);

      expect(B.get(1, 0)).to.be.eql(33);
      expect(B.get(1, 1)).to.be.eql(39);
      expect(B.get(1, 2)).to.be.eql(51);
      expect(B.get(1, 3)).to.be.eql(69);
      
      expect(B.get(2, 0)).to.be.eql(55);
      expect(B.get(2, 1)).to.be.eql(65);
      expect(B.get(2, 2)).to.be.eql(85);
      expect(B.get(2, 3)).to.be.eql(115);

      expect(B.get(3, 0)).to.be.eql(77);
      expect(B.get(3, 1)).to.be.eql(91);
      expect(B.get(3, 2)).to.be.eql(119);
      expect(B.get(3, 3)).to.be.eql(161);
    });
    it('should calculate and add an outer product correctly', () => {
      const a = 29;
      const A = new Matrix4().setElements(a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a);
      const u = new Vector4(2, 3, 5, 7);
      const v = new Vector4(11, 13, 17, 23);
      const s = 3;
      A.addOuterProduct(u, v, s);
      expect(A.get(0, 0)).to.be.eql(22 * s + a);
      expect(A.get(0, 1)).to.be.eql(26 * s + a);
      expect(A.get(0, 2)).to.be.eql(34 * s + a);
      expect(A.get(0, 3)).to.be.eql(46 * s + a);

      expect(A.get(1, 0)).to.be.eql(33 * s + a);
      expect(A.get(1, 1)).to.be.eql(39 * s + a);
      expect(A.get(1, 2)).to.be.eql(51 * s + a);
      expect(A.get(1, 3)).to.be.eql(69 * s + a);
      
      expect(A.get(2, 0)).to.be.eql(55 * s + a);
      expect(A.get(2, 1)).to.be.eql(65 * s + a);
      expect(A.get(2, 2)).to.be.eql(85 * s + a);
      expect(A.get(2, 3)).to.be.eql(115 * s + a);

      expect(A.get(3, 0)).to.be.eql(77 * s + a);
      expect(A.get(3, 1)).to.be.eql(91 * s + a);
      expect(A.get(3, 2)).to.be.eql(119 * s + a);
      expect(A.get(3, 3)).to.be.eql(161 * s + a);

      const B = new Matrix4().setElements(a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a);
      B.addOuterProduct(u, v);
      expect(B.get(0, 0)).to.be.eql(22 + a);
      expect(B.get(0, 1)).to.be.eql(26 + a);
      expect(B.get(0, 2)).to.be.eql(34 + a);
      expect(B.get(0, 3)).to.be.eql(46 + a);

      expect(B.get(1, 0)).to.be.eql(33 + a);
      expect(B.get(1, 1)).to.be.eql(39 + a);
      expect(B.get(1, 2)).to.be.eql(51 + a);
      expect(B.get(1, 3)).to.be.eql(69 + a);
      
      expect(B.get(2, 0)).to.be.eql(55 + a);
      expect(B.get(2, 1)).to.be.eql(65 + a);
      expect(B.get(2, 2)).to.be.eql(85 + a);
      expect(B.get(2, 3)).to.be.eql(115 + a);

      expect(B.get(3, 0)).to.be.eql(77 + a);
      expect(B.get(3, 1)).to.be.eql(91 + a);
      expect(B.get(3, 2)).to.be.eql(119 + a);
      expect(B.get(3, 3)).to.be.eql(161 + a);
    });
  });
});