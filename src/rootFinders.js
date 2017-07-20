'use strict';

const Compare = require('./compare.js');
const TOLERANCE = Compare.DEFAULT_TOLERANCE;

const RootFinders = {
  bisectionMethod: function bisectionMethod (f, options) {
    const imax = options.maxIterations;
    const es = options.rootTolerance || TOLERANCE;
    let xl = options.lowerBound;
    let xu = options.upperBound;
    let xr = options.initialValue;

    let iter = 0;
    let fl = f(xl);
    do {
      xr = (xl + xu) / 2;
      const fr = f(xr);
      iter++;
      const test = fl * fr;
      if (test < 0) {
        xu = xr;
      } else if (test > 0) {
        xl = xr;
        fl = fr;
      }
    } while (!Compare.isZero(f(xr), es) && iter < imax);
    if (iter >= imax) {
      console.warn('bisectionMethod(): Iteration max reached. Solution may not be accurate.');
    }
    return xr;
  }
};

module.exports = RootFinders;
