'use strict';
/* globals describe it Minimatrix expect */

describe('Complex Numbers', () => {
  const Complex = Minimatrix.Complex;
  const EPS = 1e-14;
  describe('Creation/Editing', () => {
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
  });
});