import { expect } from 'chai';
import { Vector2, Matrix2, Matrix3 } from '../src/index';

describe('Vector2', () => {
  const EPS = 1e-14;
  describe('Basic Manipulations', () => {
    it('should have the proper coordinates on create', () => {
      const v = new Vector2(5, 7);
      expect(v.x).to.be.eql(5);
      expect(v.y).to.be.eql(7);
      
      const b = new Vector2();
      expect(b).to.be.eql(new Vector2(0, 0));
    });
    it('should be set from an array', () => {
      const a = [0.4, 1.5, 2.6];
      const b = new Vector2();
      b.fromArray(a, 1);
      expect(b).to.be.eql(new Vector2(1.5, 2.6));
      
      b.fromArray(a);
      expect(b).to.be.eql(new Vector2(0.4, 1.5));
    });
    it('should have properties overwritten when set', () => {
      const v = new Vector2(5, 7);
      v.set(11, 13);
      expect(v).to.be.eql(new Vector2(11, 13));
    });
    it('should have both properties overwritten with setScalar()', () => {
      const v = new Vector2(5, 7);
      v.setScalar(11);
      expect(v).to.be.eql(new Vector2(11, 11));
    });
    it('should have X coordinate overwritten with setX()', () => {
      const v = new Vector2(5, 7);
      v.setX(11);
      expect(v).to.be.eql(new Vector2(11, 7));
    });
    it('should have Y coordinate overwritten with setY()', () => {
      const v = new Vector2(5, 7);
      v.setY(11);
      expect(v).to.be.eql(new Vector2(5, 11));
    });
    it('should be duplicated with clone()', () => {
      const v = new Vector2(5, 7);
      const w = v.clone();
      expect(v).to.be.eql(w);
    });
    it('should be copied over with copy()', () => {
      const v = new Vector2(5, 7);
      const w = new Vector2(11, 13);
      w.copy(v);
      expect(w.x).to.be.eql(v.x);
      expect(w.y).to.be.eql(v.y);
    });
    it('should get a component from the vector', () => {
      const v = new Vector2(2, 3);
      expect(v.getComponent(0)).to.be.eql(2);
      expect(v.getComponent(1)).to.be.eql(3);
      expect(v.getComponent.bind(v, 2)).to.throw('getComponent(): index is out of range: 2');
    });
    it('should set a component in the vector', () => {
      const v = new Vector2(2, 3);
      v.setComponent(0, 5);
      expect(v.getComponent(0)).to.be.eql(5);
      v.setComponent(1, 7);
      expect(v.getComponent(1)).to.be.eql(7);
      expect(v.setComponent.bind(v, 2, 11)).to.throw('setComponent(): index is out of range: 2');
    });
  });
  describe('Arithmetic Operations', () => {
    it('should add one vector to another properly', () => {
      const a = new Vector2(5, 7);
      const b = new Vector2(11, 13);
      a.add(b);
      expect(a).to.be.eql(new Vector2(5 + 11, 7 + 13));
    });
    it('should add a scalar to a vector', () => {
      const v = new Vector2(5, 7);
      v.addScalar(11);
      expect(v).to.be.eql(new Vector2(5 + 11, 7 + 11));
    });
    it('should add 2 vectors properly', () => {
      const a = new Vector2(5, 7);
      const b = new Vector2(11, 13);
      const c = (new Vector2(0, 0)).addVectors(a, b);
      expect(c).to.be.eql(new Vector2(5 + 11, 7 + 13));
    });
    it('should add a scaled vector to a vector', () => {
      const a = new Vector2(5, 7);
      const b = new Vector2(11, 13);
      a.addScaledVector(b, 3);
      expect(a).to.be.eql(new Vector2(5 + 11 * 3, 7 + 13 * 3));
    });
    it('should subtract one vector from another properly', () => {
      const a = new Vector2(11, 13);
      const b = new Vector2(5, 7);
      a.sub(b);
      expect(a).to.be.eql(new Vector2(11 - 5, 13 - 7));
    });
    it('should subtract a scalar to a vector', () => {
      const v = new Vector2(5, 7);
      v.subScalar(11);
      expect(v).to.be.eql(new Vector2(5 - 11, 7 - 11));
    });
    it('should subtract 2 vectors properly', () => {
      const a = new Vector2(5, 7);
      const b = new Vector2(11, 13);
      const c = (new Vector2(0, 0)).subVectors(a, b);
      expect(c).to.be.eql(new Vector2(5 - 11, 7 - 13));
    });
    it('should scale by multiplying by a scalar', () => {
      const a = new Vector2(5, 7);
      a.multiplyScalar(11);
      expect(a).to.be.eql(new Vector2(11 * 5, 11 * 7));
    });
    it('should multiply 2 vectors element-wise', () => {
      const a = new Vector2(11, 13);
      const b = new Vector2(5, 7);
      a.multiply(b);
      expect(a).to.be.eql(new Vector2(11 * 5, 13 * 7));
    });
    it('should scale by dividing by a scalar', () => {
      const a = new Vector2(5, 7);
      a.divideScalar(11);
      expect(Math.abs(a.x - (5 / 11)) < EPS);
      expect(Math.abs(a.y - (7 / 11)) < EPS);
    });
    it('should divide 2 vectors element-wise', () => {
      const a = new Vector2(11, 13);
      const b = new Vector2(5, 7);
      a.divide(b);
      expect(a).to.be.eql(new Vector2(11 / 5, 13 / 7));
    });
  });
  describe('Computational Helper Functions', () => {
    it('should choose the minimum components of 2 vectors', () => {
      const a = new Vector2(11, 7);
      const b = new Vector2(5, 13);
      a.min(b);
      expect(a).to.be.eql(new Vector2(5, 7));
    });
    it('should choose the maximum components of 2 vectors', () => {
      const a = new Vector2(11, 7);
      const b = new Vector2(5, 13);
      a.max(b);
      expect(a).to.be.eql(new Vector2(11, 13));
    });
    it('should clamp components to between the values', () => {
      const min = new Vector2(0, 0);
      const max = new Vector2(1, 1);
      const a = new Vector2(1.5, -0.5);
      a.clamp(min, max);
      expect(a).to.be.eql(new Vector2(1, 0));
    });
    it('should round components to the lowest integer values', () => {
      const a = new Vector2(1.5, -0.5);
      a.floor();
      expect(a).to.be.eql(new Vector2(1, -1));
    });
    it('should round components to the highest integer values', () => {
      const a = new Vector2(1.5, 0.5);
      a.ceil();
      expect(a).to.be.eql(new Vector2(2, 1));
    });
    it('should round components to nearest', () => {
      const a = new Vector2(1.4, 1.5);
      a.round();
      expect(a).to.be.eql(new Vector2(1, 2));
    });
    it('should round components toward zero', () => {
      const a = new Vector2(-1.7, 1.7);
      a.roundToZero();
      expect(a).to.be.eql(new Vector2(-1, 1));
      const b = new Vector2(1.4, -1.4);
      b.roundToZero();
      expect(b).to.be.eql(new Vector2(1, -1));
    });
    it('should negate the components of a vector', () => {
      const a = new Vector2(1.7, -2.1);
      a.negate();
      expect(a).to.be.eql(new Vector2(-1.7, 2.1));
    });
    it('should compute the vector length squared', () => {
      const a = new Vector2(3, 4);
      const lenSq = a.lengthSq();
      expect(lenSq).to.be.eql(25);

      const b = new Vector2(0, 0);
      expect(b.lengthSq()).to.be.eql(0);
    });
    it('should compute the vector length', () => {
      const a = new Vector2(3, 4);
      const len = a.length();
      expect(len).to.be.eql(5);

      const b = new Vector2(0, 0);
      expect(b.length()).to.be.eql(0);
    });
    it('should normalize the vector', () => {
      const a = new Vector2(3, 4);
      a.normalize();
      expect(Math.abs(a.x - 0.6) < EPS);
      expect(Math.abs(a.y - 0.8) < EPS);
    });
    it('should return the distance from the vector tip to another', () => {
      const a = new Vector2(3, 4);
      const b = new Vector2(7, 1);
      const dist = a.distanceTo(b);
      expect(dist).to.be.eql(5);
    });
    it('should return the distance from the vector tip to another', () => {
      const a = new Vector2(3, 4);
      const b = new Vector2(7, 1);
      const distSq = a.distanceToSquared(b);
      expect(distSq).to.be.eql(25);
    });
    it('should scale the vector to have a certain length', () => {
      const a = new Vector2(4, 7);
      a.setLength(5);
      expect(a.length()).to.be.eql(5);
    });
    it('should lerp the vector between this and another', () => {
      const a = new Vector2(0, 1);
      const b = new Vector2(1, 2);
      a.lerp(b, 0.4);
      expect(a).to.be.eql(new Vector2(0.4, 1.4));
    });
    it('should lerp the distance between 2 vectors', () => {
      const a = new Vector2(0, 1);
      const b = new Vector2(1, 2);
      const c = new Vector2(0, 0);
      c.lerpVectors(a, b, 0.4);
      expect(c).to.be.eql(new Vector2(0.4, 1.4));
    });
    it('should put its components in an array', () => {
      const a = new Vector2(1.5, 2.6);
      const b = a.toArray(undefined, 1);
      expect(b).to.be.eql([undefined, 1.5, 2.6]);
      const c = [0, 1, 2, 3];
      const d = a.toArray(c, 2);
      expect(d).to.be.eql([0, 1, 1.5, 2.6]);
      const e = [0, 1, 2, 3];
      const f = a.toArray(e);
      expect(f).to.be.eql([1.5, 2.6, 2, 3]);
    });
  });
  describe('Linear Algebra Operations', () => {
    it('should be transformed a 2x2 matrix', () => {
      const m = new Matrix2();
      m.setElements(11, 13, 17, 19);
      const a = new Vector2(5, 7);
      a.multiplyMatrix2(m);
      expect(a.x).to.be.eql(11 * 5 + 13 * 7);
      expect(a.y).to.be.eql(17 * 5 + 19 * 7);
    });
    it('should be transformed in homogeneous coordinates by a 3x3 matrix', () => {
      const m = new Matrix3();
      m.setElements(3, 5, 7, 11, 13, 17, 19, 23, 29);
      const a = new Vector2(31, 37);
      a.multiplyMatrix3(m);
      expect(a.x).to.be.eql(3 * 31 + 5 * 37 + 7);
      expect(a.y).to.be.eql(11 * 31 + 13 * 37 + 17);
    });
    it('should compute the dot product', () => {
      const a = new Vector2(11, 13);
      const b = new Vector2(5, 7);
      const d = a.dot(b);
      expect(d).to.be.eql(11 * 5 + 13 * 7);
    });
    it('should compute the cross product (out of plane coordinate)', () => {
      const a = new Vector2(10, 5);
      const b = new Vector2(5, 10);
      const d = a.cross(b);
      expect(d).to.be.eql(10 * 10 - 5 * 5);
    });
    it('should rotate a vector', () => {
      const a = new Vector2(1, 0);
      a.rotate(Math.PI);
      expect(Math.abs(a.x - -1) < EPS);
      expect(Math.abs(a.y - 0) < EPS);
      const b = a.clone().rotate(Math.PI / 2);
      expect(Math.abs(b.x - 0) < EPS);
      expect(Math.abs(b.y - 1) < EPS);
    });
    it('should rotate a vector around a point', () => {
      const a = new Vector2(1, 0);
      a.rotateAround(new Vector2(1, 1), Math.PI / 2);
      expect(Math.abs(a.x - 0) < EPS);
      expect(Math.abs(a.y - 1) < EPS);
    });
    it('should compute the angle on the plane the vector lies in', () => {
      const v1 = new Vector2(1, 1);
      const a1 = v1.angle();
      const t1 = 45 * Math.PI / 180;
      expect(Math.abs(t1 - a1)).to.be.lessThan(EPS);

      const v2 = new Vector2(1, -1);
      const a2 = v2.angle();
      const t2 = 315 * Math.PI / 180;
      expect(Math.abs(t2 - a2)).to.be.lessThan(EPS);
    });
    it('should compute the angle between two vectors', () => {
      const a = new Vector2(1, 0);
      const b = new Vector2(1, 1);
      const u = 45 * Math.PI / 180;
      const v = a.angleTo(b)
      expect(Math.abs(u - v)).to.be.lessThan(EPS);
    });
    it('should compute the outer (dyadic) product', () => {
      const v = new Vector2(3, 5);
      const s = 2;
      const mv = v.getOuterProduct(s);
      const m2 = new Matrix2().setElements(s * 3 * 3, s * 3 * 5, s * 5 * 3, s * 5 * 5);
      expect(mv).to.be.eql(m2);
    });
  });
});
