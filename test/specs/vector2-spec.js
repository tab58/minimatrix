'use strict';
/* globals describe it Minimatrix expect */

const Vector2 = Minimatrix.Vector2;

describe('Vector2', () => {
  describe('Basic Manipulations', () => {
    it('should have the proper coordinates on create', () => {
      const v = new Vector2(5, 7);
      console.log(v);
      expect(v.x).to.be.eql(5);
      expect(v.y).to.be.eql(7);
    });
    it('should have properties overwritten with set()', () => {
      const v = new Vector2(5, 7);
      v.set(11, 13);
      expect(v.x).to.be.eql(11);
      expect(v.y).to.be.eql(13);
    });
    it('should have both properties overwritten with setScalar()', () => {
      const v = new Vector2(5, 7);
      v.setScalar(11);
      expect(v.x).to.be.eql(11);
      expect(v.y).to.be.eql(11);
    });
    it('should have X coordinate overwritten with setX()', () => {
      const v = new Vector2(5, 7);
      v.setX(11);
      expect(v.x).to.be.eql(11);
      expect(v.y).to.be.eql(7);
    });
    it('should have Y coordinate overwritten with setY()', () => {
      const v = new Vector2(5, 7);
      v.setY(11);
      expect(v.x).to.be.eql(5);
      expect(v.y).to.be.eql(11);
    });
    it('should be duplicated with clone()', () => {
      const v = new Vector2(5, 7);
      const w = v.clone();
      expect(v.x).to.be.eql(w.x);
      expect(v.y).to.be.eql(w.y);
    });
    it('should be copied over with copy()', () => {
      const v = new Vector2(5, 7);
      const w = new Vector2(11, 13);
      w.copy(v);
      expect(w.x).to.be.eql(v.x);
      expect(w.y).to.be.eql(v.y);
    });
  });
  describe('Mathematical Operations', () => {
    it('should add 2 vectors properly', () => {
      const a = new Vector2(5, 7);
      const b = new Vector2(11, 13);
      const c = (new Vector2(0, 0)).addVectors(a, b);
      expect(c.x).to.be.eql(5 + 11);
      expect(c.y).to.be.eql(7 + 13);
    });
  });
});
