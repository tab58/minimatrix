'use strict';

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

const CompareFunctions = {
  DEFAULT_TOLERANCE: 1e-14,
  isZero: function isZero (x, eps) {
    return (Math.abs(x) < eps);
  },
  isGTZero: function isGTZero (x, eps) {
    return (x >= eps);
  },
  isLTZero: function isGTZero (x, eps) {
    return (x <= -eps);
  },
  isEqual: function isEqual (x, y, eps) {
    return CompareFunctions.isZero(x - y, eps);
  },
  vectorLengthsAreEqual: function (x, y, eps) {
    return CompareFunctions.isZero(x.length() - y.length(), eps);
  },
  vector2AreEqual: function (x, y, eps) {
    return (CompareFunctions.isZero(x.x - y.x, eps) &&
      CompareFunctions.isZero(x.y - y.y, eps));
  },
  vector3AreEqual: function (x, y, eps) {
    return (CompareFunctions.isZero(x.x - y.x, eps) &&
      CompareFunctions.isZero(x.y - y.y, eps) &&
      CompareFunctions.isZero(x.z - y.z, eps));
  },
  selectDistinctValues: function selectDistinctValues (args, tol) {
    const uniqueValues = [];
    let i;
    let j;
    let n = args.length;
    for (i = 0; i < n; ++i) {
      const arg = args[i];
      let isNotUnique = false;
      for (j = 0; j < uniqueValues.length; ++j) {
        isNotUnique = isNotUnique || CompareFunctions.isEqual(arg, uniqueValues[j], tol);
      }
      if (!isNotUnique) {
        uniqueValues.push(arg);
      }
    }
    return uniqueValues;
  },
  selectDistinctVector2: function selectDistinctVector3 (args, tol) {
    const TOLERANCE = (tol === undefined ? CompareFunctions.DEFAULT_TOLERANCE : tol);
    const uniqueValues = [];
    let i;
    let n = args.length;
    for (i = 0; i < n; ++i) {
      const arg = args[i];
      if (arg.isVector2 === undefined) {
        throw new Error('selectDistinctVector2: argument not a Vector2.');
      }
      const vec2AreEqual = CompareFunctions.vector2AreEqual;
      if (!uniqueValues.reduce((acc, uniqueVal) => acc || vec2AreEqual(arg, uniqueVal, TOLERANCE), false)) {
        uniqueValues.push(arg);
      }
    }
    return uniqueValues;
  },
  selectDistinctVector3: function selectDistinctVector3 (args, tol) {
    const TOLERANCE = (tol === undefined ? CompareFunctions.DEFAULT_TOLERANCE : tol);
    const uniqueValues = [];
    let i;
    let n = args.length;
    for (i = 0; i < n; ++i) {
      const arg = args[i];
      if (arg.isVector3 === undefined) {
        throw new Error('selectDistinctVector2: argument not a Vector2.');
      }
      const vec3AreEqual = CompareFunctions.vector3AreEqual;
      if (!uniqueValues.reduce((acc, uniqueVal) => acc || vec3AreEqual(arg, uniqueVal, TOLERANCE), false)) {
        uniqueValues.push(arg);
      }
    }
    return uniqueValues;
  }
};

module.exports = CompareFunctions;
