import { expect } from 'chai';
import { Vector3, Matrix3 } from '../src/index';

describe('Vector3', () => {
  const EPS = 1e-14;
  describe('Basic Manipulations', () => {
    it('should have the proper coordinates on create', () => {
      const v = new Vector3(5, 7, 11);
      expect(v.x).to.be.eql(5);
      expect(v.y).to.be.eql(7);
      expect(v.z).to.be.eql(11);
    });
    it('should be able to get individual components', () => {
      const v = new Vector3(5, 7, 11);
      expect(v.getComponent(0)).to.be.eql(5);
      expect(v.getComponent(1)).to.be.eql(7);
      expect(v.getComponent(2)).to.be.eql(11);
      expect(v.getComponent.bind(v, 3)).to.throw('index is out of range: 3');
    });
    it('should be set from an array', () => {
      const a = [0.4, 1.5, 2.6, 3.7];
      const b = new Vector3(0, 0, 0);
      b.fromArray(a, 1);
      expect(b).to.be.eql(new Vector3(1.5, 2.6, 3.7));
      const c = new Vector3(0, 0, 0);
      c.fromArray(a);
      expect(c).to.be.eql(new Vector3(0.4, 1.5, 2.6));
    });
    it('should have properties overwritten when set', () => {
      const v = new Vector3(5, 7, 11);
      v.set(13, 17, 19);
      expect(v).to.be.eql(new Vector3(13, 17, 19));
    });
    it('should have both properties overwritten with setScalar()', () => {
      const v = new Vector3(5, 7, 11);
      v.setScalar(13);
      expect(v).to.be.eql(new Vector3(13, 13, 13));
    });
    it('should have just X coordinate overwritten', () => {
      const v = new Vector3(5, 7, 11);
      v.setX(13);
      expect(v).to.be.eql(new Vector3(13, 7, 11));
    });
    it('should have just Y coordinate overwritten', () => {
      const v = new Vector3(5, 7, 13);
      v.setY(11);
      expect(v).to.be.eql(new Vector3(5, 11, 13));
    });
    it('should have just Z coordinate overwritten', () => {
      const v = new Vector3(5, 7, 13);
      v.setZ(11);
      expect(v).to.be.eql(new Vector3(5, 7, 11));
    });
    it('should be able to set components by index', () => {
      const w = new Vector3(5, 7, 11);
      w.setComponent(0, 13);
      expect(w).to.be.eql(new Vector3(13, 7, 11));
      w.setComponent(1, 19);
      expect(w).to.be.eql(new Vector3(13, 19, 11));
      w.setComponent(2, 23);
      expect(w).to.be.eql(new Vector3(13, 19, 23));
      expect(w.setComponent.bind(w, 3)).to.throw('index is out of range: 3');
    });
    it('should be duplicated with clone()', () => {
      const v = new Vector3(5, 7, 11);
      const w = v.clone();
      expect(v).to.be.eql(w);
    });
    it('should be copied over with copy()', () => {
      const v = new Vector3(5, 7, 11);
      const w = new Vector3(13, 17, 19);
      w.copy(v);
      expect(w.x).to.be.eql(v.x);
      expect(w.y).to.be.eql(v.y);
      expect(w.z).to.be.eql(v.z);
    });
  });
  describe('Arithmetic Operations', () => {
    it('should add one vector to another properly', () => {
      const a = new Vector3(5, 7, 11);
      const b = new Vector3(13, 17, 19);
      a.add(b);
      expect(a).to.be.eql(new Vector3(5 + 13, 7 + 17, 11 + 19));
    });
    it('should add a scalar to a vector', () => {
      const v = new Vector3(5, 7, 11);
      v.addScalar(13);
      expect(v).to.be.eql(new Vector3(5 + 13, 7 + 13, 11 + 13));
    });
    it('should add 2 vectors properly', () => {
      const a = new Vector3(5, 7, 11);
      const b = new Vector3(13, 17, 19);
      const c = (new Vector3(0, 0, 0)).addVectors(a, b);
      expect(c).to.be.eql(new Vector3(5 + 13, 7 + 17, 11 + 19));
    });
    it('should add a scaled vector to a vector', () => {
      const a = new Vector3(5, 7, 11);
      const b = new Vector3(13, 17, 19);
      a.addScaledVector(b, 3);
      expect(a).to.be.eql(new Vector3(5 + 13 * 3, 7 + 17 * 3, 11 + 19 * 3));
    });
    it('should subtract one vector from another properly', () => {
      const a = new Vector3(5, 7, 11);
      const b = new Vector3(13, 17, 19);
      b.sub(a);
      expect(b).to.be.eql(new Vector3(13 - 5, 17 - 7, 19 - 11));
    });
    it('should subtract a scalar to a vector', () => {
      const v = new Vector3(5, 7, 11);
      v.subScalar(13);
      expect(v).to.be.eql(new Vector3(5 - 13, 7 - 13, 11 - 13));
    });
    it('should subtract 2 vectors properly', () => {
      const a = new Vector3(5, 7, 11);
      const b = new Vector3(13, 17, 19);
      const c = (new Vector3(0, 0, 0)).subVectors(a, b);
      expect(c).to.be.eql(new Vector3(5 - 13, 7 - 17, 11 - 19));
    });
    it('should scale by multiplying by a scalar', () => {
      const a = new Vector3(5, 7, 11);
      a.multiplyScalar(13);
      expect(a).to.be.eql(new Vector3(13 * 5, 13 * 7, 13 * 11));
    });
    it('should multiply 2 vectors element-wise', () => {
      const a = new Vector3(5, 7, 11);
      const b = new Vector3(13, 17, 19);
      a.multiply(b);
      expect(a).to.be.eql(new Vector3(13 * 5, 17 * 7, 11 * 19));
    });
    it('should scale by dividing by a scalar', () => {
      const a = new Vector3(5, 7, 11);
      a.divideScalar(13);
      expect(Math.abs(a.x - (5 / 13)) < EPS);
      expect(Math.abs(a.y - (7 / 13)) < EPS);
      expect(Math.abs(a.z - (11 / 13)) < EPS);
    });
    it('should divide 2 vectors element-wise', () => {
      const a = new Vector3(13, 17, 19);
      const b = new Vector3(5, 7, 11);
      a.divide(b);
      expect(a).to.be.eql(new Vector3(13 / 5, 17 / 7, 19 / 11));
    });
  });
  describe('Computational Helper Functions', () => {
    it('should choose the minimum components of 2 vectors', () => {
      const a = new Vector3(11, 7, 17);
      const b = new Vector3(5, 13, 19);
      a.min(b);
      expect(a).to.be.eql(new Vector3(5, 7, 17));
    });
    it('should choose the maximum components of 2 vectors', () => {
      const a = new Vector3(11, 7, 17);
      const b = new Vector3(5, 13, 19);
      a.max(b);
      expect(a).to.be.eql(new Vector3(11, 13, 19));
    });
    it('should clamp components to between the values', () => {
      const min = new Vector3(0, 0, 0);
      const max = new Vector3(1, 1, 1);
      const a = new Vector3(1.5, -0.5, 2);
      a.clamp(min, max);
      expect(a).to.be.eql(new Vector3(1, 0, 1));
      
      a.set(1.5, -0.5, 2);
      a.clampScalar(-1, 1);
      expect(a).to.be.eql(new Vector3(1, -0.5, 1));
    });
    it('should clamp the length to a scalar', () => {
      const v = new Vector3(3, 4, 5);
      v.clampLength(0, 1);
      expect(Math.abs(1 - v.length())).to.be.lessThan(EPS);
    });
    it('should round components to the lowest integer values', () => {
      const a = new Vector3(1.5, -0.5, 2.3);
      a.floor();
      expect(a).to.be.eql(new Vector3(1, -1, 2));
    });
    it('should round components to the highest integer values', () => {
      const a = new Vector3(1.5, 0.5, 2.3);
      a.ceil();
      expect(a).to.be.eql(new Vector3(2, 1, 3));
    });
    it('should round components to nearest', () => {
      const a = new Vector3(1.4, 1.5, 1.9);
      a.round();
      expect(a).to.be.eql(new Vector3(1, 2, 2));
    });
    it('should round components toward zero', () => {
      const a = new Vector3(-1.7, 1.7, 2.3);
      a.roundToZero();
      expect(a).to.be.eql(new Vector3(-1, 1, 2));

      const b = new Vector3(1.7, -1.7, -2.3);
      b.roundToZero();
      expect(b).to.be.eql(new Vector3(1, -1, -2));
    });
    it('should negate the components of a vector', () => {
      const a = new Vector3(1.7, -2.1, -1);
      a.negate();
      expect(a).to.be.eql(new Vector3(-1.7, 2.1, 1));
    });
    it('should compute the vector length squared', () => {
      const a = new Vector3(3, 4, 5);
      const lenSq = a.lengthSq();
      expect(lenSq).to.be.eql(3 * 3 + 4 * 4 + 5 * 5);
    });
    it('should compute the vector length', () => {
      const a = new Vector3(3, 4, 5);
      const len = a.length();
      expect(len).to.be.eql(Math.sqrt(3 * 3 + 4 * 4 + 5 * 5));
    });
    it('should normalize the vector', () => {
      const a = new Vector3(3, 4, 5);
      a.normalize();
      expect(Math.abs(a.x - 3 / Math.sqrt(50)) < EPS);
      expect(Math.abs(a.y - 4 / Math.sqrt(50)) < EPS);
      expect(Math.abs(a.z - 5 / Math.sqrt(50)) < EPS);
    });
    it('should return the distance from the vector tip to another', () => {
      const a = new Vector3(3, 4, 5);
      const b = new Vector3(7, 1, 2);
      const dist = a.distanceTo(b);
      expect(dist).to.be.eql(Math.sqrt(34));
    });
    it('should return the distance from the vector tip to another', () => {
      const a = new Vector3(3, 4, 5);
      const b = new Vector3(7, 1, 2);
      const distSq = a.distanceToSquared(b);
      expect(distSq).to.be.eql(34);
    });
    it('should scale the vector to have a certain length', () => {
      const a = new Vector3(3, 7, 11);
      a.setLength(5);
      expect(Math.abs(a.length() - 5) < EPS);
    });
    it('should lerp the vector between this and another', () => {
      const a = new Vector3(0, 1, 2);
      const b = new Vector3(1, 2, 3);
      a.lerp(b, 0.4);
      expect(a).to.be.eql(new Vector3(0.4, 1.4, 2.4));
    });
    it('should lerp the distance between 2 vectors', () => {
      const a = new Vector3(0, 1, 2);
      const b = new Vector3(1, 2, 3);
      const c = new Vector3(0, 0, 0);
      c.lerpVectors(a, b, 0.4);
      expect(c).to.be.eql(new Vector3(0.4, 1.4, 2.4));
    });
    it('should put its components in an array', () => {
      const a = new Vector3(1.5, 2.6, 3.7);
      const b = a.toArray(undefined, 1);
      expect(b).to.be.eql([undefined, 1.5, 2.6, 3.7]);
      const c = [0, 1, 2, 3];
      const d = a.toArray(c, 2);
      expect(d).to.be.eql([0, 1, 1.5, 2.6, 3.7]);
      const e = [0, 1, 2, 3];
      const f = a.toArray(e);
      expect(f).to.be.eql([1.5, 2.6, 3.7, 3]);
    });
  });
  describe('Linear Algebra Operations', () => {
    it('should be transformed a 3x3 matrix', () => {
      const m = new Matrix3();
      m.setElements(13, 17, 19, 23, 29, 31, 37, 41, 43);
      const a = new Vector3(5, 7, 11);
      a.multiplyMatrix3(m);
      expect(a.x).to.be.eql(13 * 5 + 17 * 7 + 19 * 11);
      expect(a.y).to.be.eql(23 * 5 + 29 * 7 + 31 * 11);
      expect(a.z).to.be.eql(37 * 5 + 41 * 7 + 43 * 11);
    });
    it('should compute the dot product', () => {
      const a = new Vector3(13, 17, 19);
      const b = new Vector3(5, 7, 11);
      const d = a.dot(b);
      expect(d).to.be.eql(13 * 5 + 17 * 7 + 19 * 11);
    });
    it('should compute the cross product', () => {
      const a = new Vector3(1, 0, 0);
      const b = new Vector3(0, 1, 0);
      const d = (new Vector3(0, 0, 0)).crossVectors(a, b);
      expect(d).to.be.eql(new Vector3(0, 0, 1));
      const e = a.cross(b);
      expect(e).to.be.eql(new Vector3(0, 0, 1));
    });
    it('should reflect off of a plane', () => {
      const a = new Vector3(-1, -1, -1);
      const normal = new Vector3(0, 0, 1);
      const b = a.clone().reflect(normal);
      expect(b).to.be.eql(new Vector3(-1, -1, 1));
    });
    it('should calculate the angle between 2 vectors', () => {
      const a = new Vector3(1, 0, 0);
      const b = new Vector3(0, 0, 1);
      const angle = a.angleTo(b);
      expect(angle).to.be.eql(Math.PI / 2);
      const c = new Vector3(1, 1, 1);
      const angle2 = a.angleTo(c);
      expect(angle2).to.be.eql(Math.acos(1 / Math.sqrt(3)));
    });
    it('should project this vector onto another vector', () => {
      const a = new Vector3(1, 1, 0);
      const b = new Vector3(2, 0, 0);
      const c = a.clone().projectOnVector(b);
      expect(c).to.be.eql(new Vector3(1, 0, 0));
    });
    it('should project a vector onto a plane', () => {
      const v = new Vector3(1, 1, 1);
      const p = new Vector3(0, 0, 1);
      v.projectOnPlane(p);
      expect(v).to.be.eql(new Vector3(1, 1, 0));
    });
    it('should rotate a vector about another vector', () => {
      const v = new Vector3(1, 1, 1);
      const r = new Vector3(0, 0, 1);
      v.rotateAround(r, Math.PI / 2);
      const d = v.distanceTo(new Vector3(-1, 1, 1));
      expect(d).to.be.lessThan(EPS);
    });
    it('should calculate an outer (dyadic) product', () => {
      const s = 3;
      const v = new Vector3(3, 5, 7);
      const m = new Matrix3().setElements(s * 3 * 3, s * 3 * 5, s * 3 * 7,
        s * 5 * 3, s * 5 * 5, s * 5 * 7,
        s * 7 * 3, s * 7 * 5, s * 7 * 7);
      const mv = v.getOuterProduct(s);
      expect(mv).to.be.eql(m);
    });
  });
});
