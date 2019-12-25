import { expect } from 'chai';
import { Complex, Vector2 } from '../src/index';

describe('Complex Numbers', () => {
  const EPS = 1e-14;
  describe('Creation/Editing', () => {
    it('should create from a Vector2', () => {
      const v = new Vector2(3, 2);
      const A = new Complex().fromVector2(v);
      expect(A.real).to.be.eql(v.x);
      expect(A.imag).to.be.eql(v.y);
    });
    it('should clone a complex number', () => {
      const A = new Complex(3, 2);
      expect(A.clone() === A).to.be.eql(false);
      expect(A.clone()).to.be.eql(A);
    });
    it('should copy a complex number', () => {
      const A = new Complex(3, 2);
      const B = new Complex(5, 9);
      expect(B.copy(A)).to.be.eql(A);
    });
    it('should set a complex number', () => {
      const A = new Complex(3, 2);
      expect(A.set(5, 9)).to.be.eql(new Complex(5, 9));
    });
    it('should set the real value of a complex number', () => {
      const A = new Complex(3, 2);
      expect(A.setReal(5)).to.be.eql(new Complex(5, 2));
    });
    it('should set the imaginary value of a complex number', () => {
      const A = new Complex(3, 2);
      expect(A.setImag(5)).to.be.eql(new Complex(3, 5));
    });
  });
  describe('Arithmetic', () => {
    it('should add 2 complex numbers', () => {
      const A = new Complex(5, 3);
      const B = new Complex(4, 2);
      expect(A.clone().add(B)).to.be.eql(new Complex(9, 5));
    });
    it('should subtract 2 complex numbers', () => {
      const A = new Complex(5, 3);
      const B = new Complex(4, 2);
      expect(A.clone().sub(B)).to.be.eql(new Complex(1, 1));
      expect(B.clone().sub(A)).to.be.eql(new Complex(-1, -1));
    });
    it('should multiply 2 complex numbers', () => {
      const A = new Complex(3, 2);
      const B = new Complex(1, 4);
      expect(A.clone().multiply(B)).to.be.eql(new Complex(-5, 14));
    });
    it('should divide 2 complex numbers', () => {
      const A = new Complex(3, 2);
      const B = new Complex(4, -3);
      expect(A.clone().divide(B)).to.be.eql(new Complex(6 / 25, 17 / 25));
    });
    it('should scale a complex number', () => {
      const A = new Complex(3, 2);
      expect(A.clone().scale(3)).to.be.eql(new Complex(9, 6));
    });
    it('should compute the complex conjugate', () => {
      const A = new Complex(3, 2);
      expect(A.conjugate()).to.be.eql(new Complex(3, -2));
    });
    it('should compute a purely real number', () => {
      const A = new Complex(16, 0);
      const roots = A.sqrt();
      expect(roots.length).to.be.eql(1);
      const [r] = roots;
      expect(r.real).to.be.eql(4);
      expect(r.imag).to.be.eql(0);
    });
    it('should compute both square roots', () => {
      const A = new Complex(9, 4);
      const a = Math.sqrt((9 + Math.sqrt(97)) / 2);
      const b = 2 * Math.sqrt(2 / (9 + Math.sqrt(97)));
      const roots = [
        new Complex(a, b),
        new Complex(-a, -b)
      ];
      const calcRoots = A.sqrt();
      expect(calcRoots[0].equal(roots[0], EPS)).to.be.eql(true);
      expect(calcRoots[1].equal(roots[1], EPS)).to.be.eql(true);

      const B = new Complex(-1, 0);
      const calcBRoots = B.sqrt();
      const bRoots = [
        new Complex(0, 1),
        new Complex(0, -1)
      ];
      expect(calcBRoots[0].equal(bRoots[0], EPS)).to.be.eql(true);
      expect(calcBRoots[1].equal(bRoots[1], EPS)).to.be.eql(true);

      const C = new Complex(9, -4);
      const c = Math.sqrt((9 + Math.sqrt(97)) / 2);
      const d = 2 * Math.sqrt(2 / (9 + Math.sqrt(97)));
      const cRoots = [
        new Complex(c, -d),
        new Complex(-c, d)
      ];
      const cCalcRoots = C.sqrt();
      expect(cCalcRoots[0].equal(cRoots[0], EPS)).to.be.eql(true);
      expect(cCalcRoots[1].equal(cRoots[1], EPS)).to.be.eql(true);
    });
    it('should compute the cube roots', () => {
      const A = new Complex(1, 1);
      const roots = [
        new Complex(1.084215081491351, 0.290514555507251),
        new Complex(-0.793700525984100, 0.793700525984100),
        new Complex(-0.290514555507251, -1.084215081491351)
      ];
      const calcRoots = A.cbrt();
      expect(calcRoots[0].equal(roots[0], EPS)).to.be.eql(true);
      expect(calcRoots[1].equal(roots[1], EPS)).to.be.eql(true);
      expect(calcRoots[2].equal(roots[2], EPS)).to.be.eql(true);
    });
    it('should add a real number', () => {
      const A = new Complex(2, 3);
      A.addReal(7);
      expect(A.real).to.be.eql(2 + 7);
      expect(A.imag).to.be.eql(3);
    });
    it('should test for exact equality', () => {
      const A = new Complex(2, 3);
      const B = new Complex(2, 3);
      const C = new Complex(2 + 1e-14, 3);
      expect(A.equal(B)).to.be.true;
      expect(A.equal(C)).to.be.false;
    });
  });
});
