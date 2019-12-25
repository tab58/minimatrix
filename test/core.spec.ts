import { expect } from 'chai';
import Core from '../src/core';

const EPS = 1e-14;

describe('Core Math Functions', () => {
  it('should clamp a value between 2 values', () => {
    const v = 2;
    expect(Core.clamp(v, 0, 1)).to.be.equal(1);
  });
  it('should compute the Euclidean modulo of a value', () => {
    expect(Core.euclideanModulo(5, 3)).to.be.equal(2);
  });
  it('should map a value from one interval to another', () => {
    expect(Core.mapLinear(0.4, 0, 1, 3, 13)).to.be.equal(7);
  });
  it('should lerp a value', () => {
    expect(Core.lerp(3, 13, 0.4)).to.be.equal(7);
  });
  it('should compute a smooth step', () => {
    expect(Core.smoothstep(5, 7, 17)).to.be.equal(0);
    expect(Core.smoothstep(25, 7, 17)).to.be.equal(1);
    expect(Math.abs(Core.smoothstep(11, 7, 17) - 0.352)).to.be.lessThan(EPS);
  });
  it('should compute a smoother step', () => {
    expect(Core.smootherstep(5, 7, 17)).to.be.equal(0);
    expect(Core.smootherstep(25, 7, 17)).to.be.equal(1);
    expect(Math.abs(Core.smootherstep(11, 7, 17) - 0.31744)).to.be.lessThan(EPS);
  });
  it('should compute a random integer', () => {
    const r = Core.randInt(3, 19);
    expect(r).to.be.lessThan(19 + EPS);
    expect(r).to.be.greaterThan(3 - EPS);
    expect(r).to.be.equal(Math.floor(r));
  });
  it('should compute a random floating point number', () => {
    const r = Core.randFloat(3, 19);
    expect(r).to.be.lessThan(19 + EPS);
    expect(r).to.be.greaterThan(3 - EPS);
    expect(parseFloat(r.toString())).to.be.equal(r);
  });
  it('should compute a random floating point number from a spread', () => {
    const r = Core.randFloatSpread(19 / 2);
    expect(r).to.be.lessThan(9.5 + EPS);
    expect(r).to.be.greaterThan(-9.5 - EPS);
    expect(parseFloat(r.toString())).to.be.equal(r);
  });
  it('should compute radians from a number of degrees', () => {
    const r = Core.degToRad(45);
    expect(Math.abs(r - 0.25 * Math.PI)).to.be.lessThan(EPS);
  });
  it('should compute degrees from a number of radians', () => {
    const d = Core.radToDeg(0.25 * Math.PI);
    expect(Math.abs(d - 45)).to.be.lessThan(EPS);
  });
  it('should be able to tell if a value is a power of 2', () => {
    expect(Core.isPowerOfTwo(19)).to.be.false;
    expect(Core.isPowerOfTwo(131072)).to.be.true;
  });
  it('should be able to round to the nearest power of 2', () => {
    expect(Core.nearestPowerOfTwo(19)).to.be.eql(16);
    expect(Core.nearestPowerOfTwo(70000)).to.be.eql(65536);
    expect(Core.nearestPowerOfTwo(100000)).to.be.eql(131072);
  });
  it('should be able to round to the next power of 2', () => {
    expect(Core.nextPowerOfTwo(19)).to.be.eql(32);
    expect(Core.nextPowerOfTwo(70000)).to.be.eql(131072);
  });
});