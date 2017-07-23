'use strict';

const _Math = require('./stdMath.js');
const Compare = require('./compare.js');
const TOLERANCE = Compare.DEFAULT_TOLERANCE;

const helpers = {
  // Based on method from http://web.cs.iastate.edu/~cs577/handouts/polyroots.pdf
  getRootsOfMonicCubic: function (p, q, r) {
    // reduce to y^3 + ay + b = 0
    const a = (3 * q - p * p) / 3;
    const b = (2 * p * p * p - 9 * p * q + 27 * r) / 27;

    // check discriminant
    const disc = (b * b) / 4 + (a * a * a) / 27;
    if (Compare.isZero(disc, TOLERANCE)) {
      // three roots, one with multiplicity 2 or 3
      if (Compare.isZero(b, TOLERANCE)) {
        // roots are all 0
        return [
          -p / 3
        ];
      } else if (b > 0) {
        return [
          -2 * _Math.sqrt(-a / 3) - (p / 3),
          _Math.sqrt(-a / 3) - (p / 3)
        ];
      } else { // b < 0
        return [
          2 * _Math.sqrt(-a / 3) - (p / 3),
          -1 * _Math.sqrt(-a / 3) - (p / 3)
        ];
      }
    } else if (disc > 0) {
      // one real root and a complex conjugate pair
      let innerA = -b / 2 + _Math.sqrt(disc);
      let innerB = -b / 2 - _Math.sqrt(disc);
      const A = (innerA < 0 ? -_Math.pow(-innerA, 1 / 3) : _Math.pow(innerA, 1 / 3));
      const B = (innerB < 0 ? -_Math.pow(-innerB, 1 / 3) : _Math.pow(innerB, 1 / 3));
      return [
        (A + B) - (p / 3)
      ];
    } else { // disc < 0
      const J = ((b * b) / 4) / (-(a * a * a) / 27);
      const cosPhi = _Math.sqrt(J);
      const phi = -_Math.acos((b > 0 ? -cosPhi : cosPhi));
      const angles = [
        phi,
        phi + 2 * _Math.PI,
        phi + 4 * _Math.PI
      ];
      return angles.map(angle => 2 * _Math.sqrt(-a / 3) * _Math.cos(angle / 3) - (p / 3));
    }
  }
};

const Polynomial = {
  getRealQuadraticRoots: function (a, b, c) {
    const disc = b * b - 4 * a * c;
    const Q = -b / (2 * a);
    if (Compare.isZero(disc, TOLERANCE)) {
      return [ Q ];
    } else if (Compare.isLTZero(disc, TOLERANCE)) {
      return [];
    } else {
      const S = _Math.sqrt(disc);
      return [
        Q + (S / (2 * a)),
        Q - (S / (2 * a))
      ];
    }
  },
  // solves for roots of ax^2 + bx^2 + cx + d
  getRealCubicRoots: function (a, b, c, d) {
    // reduce to x^3 + px^2 + qx + r = 0
    const p = b / a;
    const q = c / a;
    const r = d / a;
    return helpers.getRootsOfMonicCubic(p, q, r);
  }
};

module.exports = Polynomial;
