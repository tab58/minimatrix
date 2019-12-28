import { expect } from 'chai';
import { Vector4, Matrix4 } from '../src/index';

describe('Vector4', () => {
  const EPS = 1e-14;
  describe('Basic Manipulations', () => {
    it('should have the proper coordinates on create', () => {
      const v = new Vector4(5, 7, 11, 13);
      expect(v.x).to.be.eql(5);
      expect(v.y).to.be.eql(7);
      expect(v.z).to.be.eql(11);
      expect(v.w).to.be.eql(13);
      expect(new Vector4()).to.be.eql(new Vector4(0, 0, 0, 0));
    });
    it('should be able to get individual components', () => {
      const v = new Vector4(5, 7, 11, 13);
      expect(v.getComponent(0)).to.be.eql(5);
      expect(v.getComponent(1)).to.be.eql(7);
      expect(v.getComponent(2)).to.be.eql(11);
      expect(v.getComponent(3)).to.be.eql(13);
      expect(v.getComponent.bind(v, 4)).to.throw('index is out of range: 4');
    });
    it('should be set from an array', () => {
      const a = [0.4, 1.5, 2.6, 3.7, 4.8];
      const b = new Vector4(0, 0, 0, 0);
      b.fromArray(a, 1);
      expect(b).to.be.eql(new Vector4(1.5, 2.6, 3.7, 4.8));
      const c = new Vector4(0, 0, 0, 0);
      c.fromArray(a);
      expect(c).to.be.eql(new Vector4(0.4, 1.5, 2.6, 3.7));
    });
    it('should have properties overwritten when set', () => {
      const v = new Vector4(5, 7, 11, 13);
      v.set(13, 17, 19, 23);
      expect(v).to.be.eql(new Vector4(13, 17, 19, 23));
    });
    it('should have both properties overwritten with setScalar()', () => {
      const v = new Vector4(5, 7, 11, 13);
      v.setScalar(13);
      expect(v).to.be.eql(new Vector4(13, 13, 13, 13));
    });
    it('should have just X coordinate overwritten', () => {
      const v = new Vector4(5, 7, 11, 13);
      v.setX(17);
      expect(v).to.be.eql(new Vector4(17, 7, 11, 13));
    });
    it('should have just Y coordinate overwritten', () => {
      const v = new Vector4(5, 7, 11, 13);
      v.setY(17);
      expect(v).to.be.eql(new Vector4(5, 17, 11, 13));
    });
    it('should have just Z coordinate overwritten', () => {
      const v = new Vector4(5, 7, 11, 13);
      v.setZ(17);
      expect(v).to.be.eql(new Vector4(5, 7, 17, 13));
    });
    it('should have just W coordinate overwritten', () => {
      const v = new Vector4(5, 7, 11, 13);
      v.setW(17);
      expect(v).to.be.eql(new Vector4(5, 7, 11, 17));
    });
    it('should set components via index', () => {
      const w = new Vector4(5, 7, 11, 13);
      w.setComponent(0, 17);
      expect(w).to.be.eql(new Vector4(17, 7, 11, 13));
      w.setComponent(1, 19);
      expect(w).to.be.eql(new Vector4(17, 19, 11, 13));
      w.setComponent(2, 23);
      expect(w).to.be.eql(new Vector4(17, 19, 23, 13));
      w.setComponent(3, 29);
      expect(w).to.be.eql(new Vector4(17, 19, 23, 29));
      expect(w.setComponent.bind(w, 4)).to.throw('index is out of range: 4');
    });
    it('should be duplicated with clone()', () => {
      const v = new Vector4(5, 7, 11, 13);
      const w = v.clone();
      expect(v).to.be.eql(w);
    });
    it('should be copied over with copy()', () => {
      const v = new Vector4(5, 7, 11, 13);
      const w = new Vector4(17, 19, 23, 29);
      w.copy(v);
      expect(w.x).to.be.eql(v.x);
      expect(w.y).to.be.eql(v.y);
      expect(w.z).to.be.eql(v.z);
      expect(w.w).to.be.eql(v.w);
    });
  });
  describe('Arithmetic Operations', () => {
    it('should add one vector to another properly', () => {
      const a = new Vector4(5, 7, 11, 13);
      const b = new Vector4(17, 19, 23, 29);
      a.add(b);
      expect(a).to.be.eql(new Vector4(5 + 17, 7 + 19, 11 + 23, 13 + 29));
    });
    it('should add a scalar to a vector', () => {
      const v = new Vector4(5, 7, 11, 13);
      v.addScalar(17);
      expect(v).to.be.eql(new Vector4(5 + 17, 7 + 17, 11 + 17, 13 + 17));
    });
    it('should add 2 vectors properly', () => {
      const a = new Vector4(5, 7, 11, 13);
      const b = new Vector4(17, 19, 23, 29);
      const c = (new Vector4(0, 0, 0, 0)).addVectors(a, b);
      expect(c).to.be.eql(new Vector4(5 + 17, 7 + 19, 11 + 23, 13 + 29));
    });
    it('should add a scaled vector to a vector', () => {
      const a = new Vector4(5, 7, 11, 13);
      const b = new Vector4(17, 19, 23, 29);
      a.addScaledVector(b, 3);
      expect(a).to.be.eql(new Vector4(5 + 17 * 3, 7 + 19 * 3, 11 + 23 * 3, 13 + 29 * 3));
    });
    it('should subtract one vector from another properly', () => {
      const a = new Vector4(5, 7, 11, 13);
      const b = new Vector4(17, 19, 23, 29);
      b.sub(a);
      expect(b).to.be.eql(new Vector4(17 - 5, 19 - 7, 23 - 11, 29 - 13));
    });
    it('should subtract a scalar to a vector', () => {
      const v = new Vector4(5, 7, 11, 13);
      v.subScalar(17);
      expect(v).to.be.eql(new Vector4(5 - 17, 7 - 17, 11 - 17, 13 - 17));
    });
    it('should subtract 2 vectors properly', () => {
      const a = new Vector4(5, 7, 11, 13);
      const b = new Vector4(17, 19, 23, 29);
      const c = (new Vector4(0, 0, 0, 0)).subVectors(a, b);
      expect(c).to.be.eql(new Vector4(5 - 17, 7 - 19, 11 - 23, 13 - 29));
    });
    it('should scale by multiplying by a scalar', () => {
      const a = new Vector4(5, 7, 11, 13);
      a.multiplyScalar(17);
      expect(a).to.be.eql(new Vector4(17 * 5, 17 * 7, 17 * 11, 17 * 13));
    });
    it('should multiply 2 vectors element-wise', () => {
      const a = new Vector4(5, 7, 11, 13);
      const b = new Vector4(17, 19, 23, 29);
      a.multiply(b);
      expect(a).to.be.eql(new Vector4(17 * 5, 19 * 7, 23 * 11, 29 * 13));
    });
    it('should scale by dividing by a scalar', () => {
      const a = new Vector4(5, 7, 11, 13);
      a.divideScalar(17);
      expect(Math.abs(a.x - (5 / 17)) < EPS);
      expect(Math.abs(a.y - (7 / 17)) < EPS);
      expect(Math.abs(a.z - (11 / 17)) < EPS);
      expect(Math.abs(a.z - (13 / 17)) < EPS);
    });
    it('should divide 2 vectors element-wise', () => {
      const a = new Vector4(17, 19, 23, 29);
      const b = new Vector4(5, 7, 11, 13);
      a.divide(b);
      expect(a).to.be.eql(new Vector4(17 / 5, 19 / 7, 23 / 11, 29 / 13));
    });
  });
  describe('Computational Helper Functions', () => {
    it('should choose the minimum components of 2 vectors', () => {
      const a = new Vector4(11, 7, 17, 23);
      const b = new Vector4(5, 13, 19, 29);
      a.min(b);
      expect(a).to.be.eql(new Vector4(5, 7, 17, 23));
    });
    it('should choose the maximum components of 2 vectors', () => {
      const a = new Vector4(11, 7, 17, 23);
      const b = new Vector4(5, 13, 19, 29);
      a.max(b);
      expect(a).to.be.eql(new Vector4(11, 13, 19, 29));
    });
    it('should clamp components to between the values', () => {
      const min = new Vector4(0, 0, 0, 0);
      const max = new Vector4(1, 1, 1, 1);
      const a = new Vector4(1.5, -0.5, 2, 0.55);
      a.clamp(min, max);
      expect(a).to.be.eql(new Vector4(1, 0, 1, 0.55));

      a.set(1.5, -0.5, 2, 0.55);
      a.clampScalar(0, 1);
      expect(a).to.be.eql(new Vector4(1, 0, 1, 0.55));
    });
    it('should clamp the length between two scalar values', () => {
      const v = new Vector4(1, 1, 1, 1);
      v.clampLength(0, 1);
      const l = v.length();
      expect(Math.abs(l - 1)).to.be.lessThan(EPS);
    });
    it('should round components to the lowest integer values', () => {
      const a = new Vector4(1.5, -0.5, 2.3, -2.5);
      a.floor();
      expect(a).to.be.eql(new Vector4(1, -1, 2, -3));
    });
    it('should round components to the highest integer values', () => {
      const a = new Vector4(1.5, 0.5, 2.3, -2.5);
      a.ceil();
      expect(a).to.be.eql(new Vector4(2, 1, 3, -2));
    });
    it('should round components to nearest', () => {
      const a = new Vector4(1.4, 1.5, 1.9, -1.3);
      a.round();
      expect(a).to.be.eql(new Vector4(1, 2, 2, -1));
    });
    it('should round components toward zero', () => {
      const a = new Vector4(-1.7, 1.7, 2.3, 4.1);
      a.roundToZero();
      expect(a).to.be.eql(new Vector4(-1, 1, 2, 4));
      a.set(1.7, -1.7, -2.3, -4.1);
      a.roundToZero();
      expect(a).to.be.eql(new Vector4(1, -1, -2, -4));
    });
    it('should negate the components of a vector', () => {
      const a = new Vector4(1.7, -2.1, -1, 3);
      a.negate();
      expect(a).to.be.eql(new Vector4(-1.7, 2.1, 1, -3));
    });
    it('should compute the vector length squared', () => {
      const a = new Vector4(3, 4, 5, 7);
      const lenSq = a.lengthSq();
      expect(lenSq).to.be.eql(3 * 3 + 4 * 4 + 5 * 5 + 7 * 7);
    });
    it('should compute the vector length', () => {
      const a = new Vector4(3, 4, 5, 7);
      const len = a.length();
      expect(len).to.be.eql(Math.sqrt(3 * 3 + 4 * 4 + 5 * 5 + 7 * 7));
    });
    it('should normalize the vector', () => {
      const a = new Vector4(3, 4, 5, 7);
      a.normalize();
      expect(Math.abs(a.x - 3 / Math.sqrt(99)) < EPS);
      expect(Math.abs(a.y - 4 / Math.sqrt(99)) < EPS);
      expect(Math.abs(a.z - 5 / Math.sqrt(99)) < EPS);
      expect(Math.abs(a.z - 7 / Math.sqrt(99)) < EPS);
    });
    it('should compute a dot product', () => {
      const u = new Vector4(2, 3, 5, 7);
      const v = new Vector4(11, 13, 19, 23);
      const d = 2 * 11 + 3 * 13 + 5 * 19 + 7 * 23;
      expect(u.dot(v)).to.be.eql(d);
    });
    it('should return the distance from the vector tip to another', () => {
      const a = new Vector4(3, 4, 5, 11);
      const b = new Vector4(7, 1, 2, 13);
      const dist = a.distanceTo(b);
      expect(dist).to.be.eql(Math.sqrt(38));
    });
    it('should return the distance from the vector tip to another', () => {
      const a = new Vector4(3, 4, 5, 11);
      const b = new Vector4(7, 1, 2, 13);
      const distSq = a.distanceToSquared(b);
      expect(distSq).to.be.eql(38);
    });
    it('should scale the vector to have a certain length', () => {
      const a = new Vector4(3, 7, 11, 13);
      a.setLength(5);
      expect(Math.abs(a.length() - 5) < EPS);
    });
    it('should lerp the vector between this and another', () => {
      const a = new Vector4(0, 1, 2, 3);
      const b = new Vector4(1, 2, 3, 5);
      a.lerp(b, 0.4);
      expect(a).to.be.eql(new Vector4(0.4, 1.4, 2.4, 3.8));
    });
    it('should lerp the distance between 2 vectors', () => {
      const a = new Vector4(0, 1, 2, 3);
      const b = new Vector4(1, 2, 3, 5);
      const c = new Vector4(0, 0, 0);
      c.lerpVectors(a, b, 0.4);
      expect(c).to.be.eql(new Vector4(0.4, 1.4, 2.4, 3.8));
    });
    it('should put its components in an array', () => {
      const a = new Vector4(1.5, 2.6, 3.7, 4.8);
      const b = a.toArray(undefined, 1);
      expect(b).to.be.eql([undefined, 1.5, 2.6, 3.7, 4.8]);
      const c = [0, 1, 2, 3];
      const d = a.toArray(c, 2);
      expect(d).to.be.eql([0, 1, 1.5, 2.6, 3.7, 4.8]);
      const e = [0, 1, 2, 3, 4];
      const f = a.toArray(e);
      expect(f).to.be.eql([1.5, 2.6, 3.7, 4.8, 4]);
    });
    it('should compute the angle of a vector to another vector that both lie in the same plane', () => {
      const u = new Vector4(1, 1, 1, 1);
      const v = new Vector4(1, -1, 1, 1);
      const a = u.angleTo(v);
      const t = Math.PI / 3;
      expect(Math.abs(a - t)).lessThan(EPS);
    });
    it('should compute the outer (dyadic) product', () => {
      const s = 2;
      const v = new Vector4(2, 3, 5, 7);
      const mv = new Matrix4().setElements(s * 2 * 2, s * 2 * 3, s * 2 * 5, s * 2 * 7,
        s * 3 * 2, s * 3 * 3, s * 3 * 5, s * 3 * 7,
        s * 5 * 2, s * 5 * 3, s * 5 * 5, s * 5 * 7,
        s * 7 * 2, s * 7 * 3, s * 7 * 5, s * 7 * 7);
      const m = v.getOuterProduct(s);
      expect(m).to.be.eql(mv);
    })
  });
});