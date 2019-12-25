import { expect } from 'chai';
import { Compare } from '../src/index';

const EPS = 1e-14;

describe('Compare Functions', () => {
  it('should test if number is close to zero', () => {
    expect(Compare.isZero(2e-14, EPS)).to.be.false;
    expect(Compare.isZero(0.7e-14, EPS)).to.be.true;
  });
  it('should test if number is greater than zero', () => {
    expect(Compare.isGTZero(1.1e-14, EPS)).to.be.true;
    expect(Compare.isGTZero(0.7e-14, EPS)).to.be.false;
  });
  it('should test if number is less than zero', () => {
    expect(Compare.isLTZero(-1.1e-14, EPS)).to.be.true;
    expect(Compare.isLTZero(-0.7e-14, EPS)).to.be.false;
  });
  it('should test if 2 numbers are approximately equal', () => {
    expect(Compare.isEqual(-1.1e-14, -1.19e-14, EPS)).to.be.true;
    expect(Compare.isEqual(-7e-14, -8.1e-14, EPS)).to.be.false;
  });
});