import { expect } from 'chai';
import { Matrix } from '../src/matrix';
import { Vector } from '../src/vector';

describe('Vector', () => {
  const EPS = 1e-14;
  describe('Basic Manipulations', () => {
    it('should have the proper coordinates on create', () => {
      const v = new Vector(2).setComponents([5, 7]);
      expect(v.get(0)).to.be.eql(5);
      expect(v.get(1)).to.be.eql(7);
      
      const b = new Vector(2).setComponents([2]);
      expect(b).to.be.eql(new Vector(2).setComponents([2, 0]));
    });
    it('should be set from an array', () => {
      const a = [0.4, 1.5, 2.6];
      const b = new Vector(2);
      b.fromArray(a, 1);
      expect(b).to.be.eql(new Vector(2).setComponents([1.5, 2.6]));
      
      b.fromArray(a);
      expect(b).to.be.eql(new Vector(2).setComponents([0.4, 1.5]));

      expect(b.fromArray.bind(b, [1])).to.throw(`Vector.fromArray(): array length, offset, and vector dimension do not match.`);
    });
    it('should have properties overwritten when set', () => {
      const v = new Vector(2).setComponents([5, 7]);
      v.set(0, 13);
      expect(v).to.be.eql(new Vector(2).setComponents([13, 7]));
    });
    it('should have both properties overwritten with setScalar()', () => {
      const v = new Vector(2).setComponents([2]).setComponents([5, 7]);
      v.setScalar(11);
      expect(v).to.be.eql(new Vector(2).setComponents([11, 11]));
    });
    it('should have X coordinate overwritten with setX()', () => {
      const v = new Vector(2).setComponents([5, 7]);
      v.setComponent(0, 11);
      expect(v).to.be.eql(new Vector(2).setComponents([11, 7]));
    });
    it('should have Y coordinate overwritten with setY()', () => {
      const v = new Vector(2).setComponents([5, 7]);
      v.setComponent(1, 11);
      expect(v).to.be.eql(new Vector(2).setComponents([5, 11]));
    });
    it('should be duplicated with clone()', () => {
      const v = new Vector(2).setComponents([5, 7]);
      const w = v.clone();
      expect(v).to.be.eql(w);
    });
    it('should be copied over with copy()', () => {
      const v = new Vector(2).setComponents([5, 7]);
      const w = new Vector(2).setComponents([11, 13]);
      w.copy(v);
      expect(w.getComponent(0)).to.be.eql(v.getComponent(0));
      expect(w.getComponent(1)).to.be.eql(v.getComponent(1));

      const z = new Vector(3).setComponents([11, 13, 17]);
      expect(w.copy.bind(w, z)).to.throw(`Vector.copy(): vector dimensions don't agree.`);
    });
    it('should get a component from the vector', () => {
      const v = new Vector(2).setComponents([2, 3]);
      expect(v.getComponent(0)).to.be.eql(2);
      expect(v.getComponent(1)).to.be.eql(3);
      expect(v.getComponent.bind(v, 2)).to.throw('index is out of range: 2');
    });
    it('should set a component in the vector', () => {
      const v = new Vector(2).setComponents([2, 3]);
      v.setComponent(0, 5);
      expect(v.getComponent(0)).to.be.eql(5);
      v.setComponent(1, 7);
      expect(v.getComponent(1)).to.be.eql(7);
      expect(v.setComponent.bind(v, 2, 11)).to.throw('index is out of range: 2');
    });
  });
  describe('Arithmetic Operations', () => {
    it('should add one vector to another properly', () => {
      const a = new Vector(2).setComponents([5, 7]);
      const b = new Vector(2).setComponents([11, 13]);
      a.add(b);
      expect(a).to.be.eql(new Vector(2).setComponents([5 + 11, 7 + 13]));

      const c = new Vector(3).setComponents([17, 19, 23]);
      expect(a.add.bind(a, c)).to.throw(`Vector.add(): vector dimensions don't agree.`);
    });
    it('should add a scalar to a vector', () => {
      const v = new Vector(2).setComponents([5, 7]);
      v.addScalar(11);
      expect(v).to.be.eql(new Vector(2).setComponents([5 + 11, 7 + 11]));
    });
    it('should add 2 vectors properly', () => {
      const a = new Vector(2).setComponents([5, 7]);
      const b = new Vector(2).setComponents([11, 13]);
      const c = (new Vector(2).setComponents([0, 0])).addVectors(a, b);
      expect(c).to.be.eql(new Vector(2).setComponents([5 + 11, 7 + 13]));

      const d = new Vector(3).setComponents([17, 19, 23]);
      expect(c.addVectors.bind(c, a, d)).to.throw(`Vector.addVectors(): vector dimensions don't agree.`);
    });
    it('should add a scaled vector to a vector', () => {
      const a = new Vector(2).setComponents([5, 7]);
      const b = new Vector(2).setComponents([11, 13]);
      a.addScaledVector(b, 3);
      expect(a).to.be.eql(new Vector(2).setComponents([5 + 11 * 3, 7 + 13 * 3]));

      const d = new Vector(3).setComponents([17, 19, 23]);
      expect(a.addScaledVector.bind(a, d)).to.throw(`Vector.addScaledVector(): vector dimensions don't agree.`);
    });
    it('should subtract one vector from another properly', () => {
      const a = new Vector(2).setComponents([11, 13]);
      const b = new Vector(2).setComponents([5, 7]);
      a.sub(b);
      expect(a).to.be.eql(new Vector(2).setComponents([11 - 5, 13 - 7]));

      const d = new Vector(3).setComponents([17, 19, 23]);
      expect(a.sub.bind(a, d)).to.throw(`Vector.sub(): vector dimensions don't agree.`);
    });
    it('should subtract a scalar to a vector', () => {
      const v = new Vector(2).setComponents([5, 7]);
      v.subScalar(11);
      expect(v).to.be.eql(new Vector(2).setComponents([5 - 11, 7 - 11]));
    });
    it('should subtract 2 vectors properly', () => {
      const a = new Vector(2).setComponents([5, 7]);
      const b = new Vector(2).setComponents([11, 13]);
      const c = (new Vector(2).setComponents([0, 0])).subVectors(a, b);
      expect(c).to.be.eql(new Vector(2).setComponents([5 - 11, 7 - 13]));

      const d = new Vector(3).setComponents([17, 19, 23]);
      expect(a.subVectors.bind(a, b, d)).to.throw(`Vector.subVectors(): vector dimensions don't agree.`);
    });
    it('should scale by multiplying by a scalar', () => {
      const a = new Vector(2).setComponents([5, 7]);
      a.multiplyScalar(11);
      expect(a).to.be.eql(new Vector(2).setComponents([11 * 5, 11 * 7]));
    });
    it('should multiply 2 vectors element-wise', () => {
      const a = new Vector(2).setComponents([11, 13]);
      const b = new Vector(2).setComponents([5, 7]);
      const c = a.clone().multiply(b);
      expect(c).to.be.eql(new Vector(2).setComponents([11 * 5, 13 * 7]));
      c.multiplyVectors(a, b);
      expect(c).to.be.eql(new Vector(2).setComponents([11 * 5, 13 * 7]));

      const d = new Vector(3).setComponents([17, 19, 23]);
      expect(d.multiplyVectors.bind(d, a, b)).to.throw(`Vector.multiplyVectors(): vector dimensions don't agree.`);
      expect(d.multiply.bind(d, a)).to.throw(`Vector.multiply(): vector dimensions don't agree.`);
    });
    it('should scale by dividing by a scalar', () => {
      const a = new Vector(2).setComponents([5, 7]);
      a.divideScalar(11);
      expect(Math.abs(a.getComponent(0) - (5 / 11)) < EPS);
      expect(Math.abs(a.getComponent(1) - (7 / 11)) < EPS);
    });
    it('should divide 2 vectors element-wise', () => {
      const a = new Vector(2).setComponents([11, 13]);
      const b = new Vector(2).setComponents([5, 7]);
      a.divide(b);
      expect(a).to.be.eql(new Vector(2).setComponents([11 / 5, 13 / 7]));

      const d = new Vector(3).setComponents([17, 19, 23]);
      expect(a.divide.bind(a, d)).to.throw(`Vector.divide(): vector dimensions don't agree.`);
    });
  });
  describe('Computational Helper Functions', () => {
    it('should choose the minimum components of 2 vectors', () => {
      const a = new Vector(2).setComponents([11, 7]);
      const b = new Vector(2).setComponents([5, 13]);
      a.min(b);
      expect(a).to.be.eql(new Vector(2).setComponents([5, 7]));
      
      const d = new Vector(3).setComponents([17, 19, 23]);
      expect(a.min.bind(a, d)).to.throw(`Vector.min(): vector dimensions don't agree.`);
    });
    it('should choose the maximum components of 2 vectors', () => {
      const a = new Vector(2).setComponents([11, 7]);
      const b = new Vector(2).setComponents([5, 13]);
      a.max(b);
      expect(a).to.be.eql(new Vector(2).setComponents([11, 13]));
      
      const d = new Vector(3).setComponents([17, 19, 23]);
      expect(a.max.bind(a, d)).to.throw(`Vector.max(): vector dimensions don't agree.`);
    });
    it('should clamp components to between the values', () => {
      const min = new Vector(2).setComponents([0, 0]);
      const max = new Vector(2).setComponents([1, 1]);
      const a = new Vector(2).setComponents([1.5, -0.5]);
      a.clamp(min, max);
      expect(a).to.be.eql(new Vector(2).setComponents([1, 0]));

      const d = new Vector(3).setComponents([17, 19, 23]);
      expect(a.clamp.bind(a, d)).to.throw(`Vector.clamp(): vector dimensions don't agree.`);
    });
    it('should clamp the vector length to between the values', () => {
      const min = 0;
      const max = 1;
      const a = new Vector(2).setComponents([2, 2]);
      a.clampLength(min, max);
      const s = Math.sqrt(2) / 2;
      expect(Math.abs(a.getComponent(0) - s) < EPS);
      expect(Math.abs(a.getComponent(1) - s) < EPS);
    });
    it('should round components to the lowest integer values', () => {
      const a = new Vector(2).setComponents([1.5, -0.5]);
      a.floor();
      expect(a).to.be.eql(new Vector(2).setComponents([1, -1]));
    });
    it('should round components to the highest integer values', () => {
      const a = new Vector(2).setComponents([1.5, 0.5]);
      a.ceil();
      expect(a).to.be.eql(new Vector(2).setComponents([2, 1]));
    });
    it('should round components to nearest', () => {
      const a = new Vector(2).setComponents([1.4, 1.5]);
      a.round();
      expect(a).to.be.eql(new Vector(2).setComponents([1, 2]));
    });
    it('should round components toward zero', () => {
      const a = new Vector(2).setComponents([-1.7, 1.7]);
      a.roundToZero();
      expect(a).to.be.eql(new Vector(2).setComponents([-1, 1]));
      const b = new Vector(2).setComponents([1.4, -1.4]);
      b.roundToZero();
      expect(b).to.be.eql(new Vector(2).setComponents([1, -1]));
    });
    it('should negate the components of a vector', () => {
      const a = new Vector(2).setComponents([1.7, -2.1]);
      a.negate();
      expect(a).to.be.eql(new Vector(2).setComponents([-1.7, 2.1]));
    });
    it('should compute the vector length squared', () => {
      const a = new Vector(2).setComponents([3, 4]);
      const lenSq = a.lengthSq();
      expect(lenSq).to.be.eql(25);

      const b = new Vector(2).setComponents([0, 0]);
      expect(b.lengthSq()).to.be.eql(0);
    });
    it('should compute the vector length', () => {
      const a = new Vector(2).setComponents([3, 4]);
      const len = a.length();
      expect(len).to.be.eql(5);

      const b = new Vector(2).setComponents([0, 0]);
      expect(b.length()).to.be.eql(0);
    });
    it('should normalize the vector', () => {
      const a = new Vector(2).setComponents([3, 4]);
      a.normalize();
      expect(Math.abs(a.getComponent(0) - 0.6) < EPS);
      expect(Math.abs(a.getComponent(1) - 0.8) < EPS);
    });
    it('should return the distance from the vector tip to another', () => {
      const a = new Vector(2).setComponents([3, 4]);
      const b = new Vector(2).setComponents([7, 1]);
      const dist = a.distanceTo(b);
      expect(dist).to.be.eql(5);
    });
    it('should return the distance from the vector tip to another', () => {
      const a = new Vector(2).setComponents([3, 4]);
      const b = new Vector(2).setComponents([7, 1]);
      const distSq = a.distanceToSquared(b);
      expect(distSq).to.be.eql(25);
    });
    it('should scale the vector to have a certain length', () => {
      const a = new Vector(2).setComponents([4, 7]);
      a.setLength(5);
      expect(a.length()).to.be.eql(5);
    });
    it('should lerp the vector between this and another', () => {
      const a = new Vector(2).setComponents([0, 1]);
      const b = new Vector(2).setComponents([1, 2]);
      a.lerp(b, 0.4);
      expect(a).to.be.eql(new Vector(2).setComponents([0.4, 1.4]));
    });
    it('should lerp the distance between 2 vectors', () => {
      const a = new Vector(2).setComponents([0, 1]);
      const b = new Vector(2).setComponents([1, 2]);
      const c = new Vector(2).setComponents([0, 0]);
      c.lerpVectors(a, b, 0.4);
      expect(c).to.be.eql(new Vector(2).setComponents([0.4, 1.4]));
      
      const d = new Vector(3).setComponents([0, 1, 2]);
      expect(d.lerp.bind(d, a)).to.throw(`Vector.lerp(): vector dimensions don't agree.`);
    });
    it('should put its components in an array', () => {
      const a = new Vector(2).setComponents([1.5, 2.6]);
      const b = a.toArray(undefined, 1);
      expect(b).to.be.eql([2.6]);
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
      const m = new Matrix(2, 2);
      m.setElements(11, 13, 17, 19);
      const a = new Vector(2).setComponents([5, 7]);
      const b = m.transformVector(a);
      expect(b.getComponent(0)).to.be.eql(11 * 5 + 13 * 7);
      expect(b.getComponent(1)).to.be.eql(17 * 5 + 19 * 7);
    });
    it('should compute the dot product', () => {
      const a = new Vector(2).setComponents([11, 13]);
      const b = new Vector(2).setComponents([5, 7]);
      const d = a.dot(b);
      expect(d).to.be.eql(11 * 5 + 13 * 7);

      const v = new Vector(3).setComponents([19, 23, 29]);
      expect(v.dot.bind(v, a)).to.throw(`Vector.dot(): vector dimensions don't agree.`);
    });
    it('should compute the angle between two vectors', () => {
      const a = new Vector(2).setComponents([1, 0]);
      const b = new Vector(2).setComponents([1, 1]);
      const u = 45 * Math.PI / 180;
      const v = a.angleTo(b)
      expect(Math.abs(u - v)).to.be.lessThan(EPS);
    });
    it('should compute the outer (dyadic) product', () => {
      const v = new Vector(2).setComponents([3, 5]);
      const s = 2;
      const mv = v.getDyadicProduct(s);
      const m2 = new Matrix(2, 2).setElements(s * 3 * 3, s * 3 * 5, s * 5 * 3, s * 5 * 5);
      expect(mv).to.be.eql(m2);

      const v2 = new Vector(2).setComponents([3, 5]);
      const mv2 = v2.getDyadicProduct();
      const m22 = new Matrix(2, 2).setElements(3 * 3, 3 * 5, 5 * 3, 5 * 5);
      expect(mv2).to.be.eql(m22);
    });
    it('should compute the projected vector', () => {
      const v = new Vector(2).setComponents([0.707, 0.707]);
      const x = new Vector(2).setComponents([1, 0]);
      const p = v.projectOnVector(x);
      const proj = new Vector(2).setComponents([0.707, 0]);
      expect(p).to.be.eql(proj);
    });
  });
});