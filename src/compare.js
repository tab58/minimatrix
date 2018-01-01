'use strict';

/**
 * @namespace Compare
 */

/*
 * Base code by authors below, additions by Tim Bright
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

/**
 * Test if a number is close to zero.
 * @function isZero
 * @memberof Compare
 * @param {number} x The number to test.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number absolute value is below numerical tolerance, false if not.
 */
function isZero (x, eps) {
  return (Math.abs(x) < eps);
}

/**
 * Test if a number is greater than zero.
 * @function isGTZero
 * @memberof Compare
 * @param {number} x The number to test.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number value is greater than the numerical tolerance, false if not.
 */
function isGTZero (x, eps) {
  return (x >= eps);
}

/**
 * Test if a number is less than zero.
 * @function isLTZero
 * @memberof Compare
 * @param {number} x The number to test.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number is less than the negative of the numerical tolerance, false if not.
 */
function isLTZero (x, eps) {
  return (x <= -eps);
}

/**
 * Test if a number is equal to another number within a tolerance.
 * @function isEqual
 * @memberof Compare
 * @param {number} x The first number.
 * @param {number} y The second number.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number difference is within the numerical tolerance, false if not.
 */
function isEqual (x, y, eps) {
  return isZero(x - y, eps);
}

/**
 * Test if a vector length is equal to another vector length within a tolerance.
 * @function vectorLengthsAreEqual
 * @memberof Compare
 * @param {Vector2|Vector3|Vector4} x The first vector.
 * @param {Vector2|Vector3|Vector4} y The second vector.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if vector length difference is within the numerical tolerance, false if not.
 */
function vectorLengthsAreEqual (x, y, eps) {
  return isZero(x.length() - y.length(), eps);
}

/**
 * Test if a vector length is equal to another vector length within a tolerance.
 * @function vector2AreEqual
 * @memberof Compare
 * @param {Vector2} x The first vector.
 * @param {Vector2} y The second vector.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if vector component differences are within the numerical tolerance, false if not.
 */
function vector2AreEqual (x, y, eps) {
  return (isZero(x.x - y.x, eps) &&
    isZero(x.y - y.y, eps));
}

/**
 * Test if a vector length is equal to another vector length within a tolerance.
 * @function vector3AreEqual
 * @memberof Compare
 * @param {Vector3} x The first vector.
 * @param {Vector3} y The second vector.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if vector component differences are within the numerical tolerance, false if not.
 */
function vector3AreEqual (x, y, eps) {
  return (isZero(x.x - y.x, eps) &&
    isZero(x.y - y.y, eps) &&
    isZero(x.z - y.z, eps));
}

/**
 * Selects only distinct values from an array. Distinctness is determined by isEqual() to a tolerance.
 * @function selectDistinctValues
 * @memberof Compare
 * @param {number[]} args The numeric array.
 * @param {number} tol The numerical tolerance.
 * @returns {number[]} The distinct values in an array.
 */
function selectDistinctValues (args, tol) {
  const uniqueValues = [];
  let i;
  let j;
  let n = args.length;
  for (i = 0; i < n; ++i) {
    const arg = args[i];
    let isNotUnique = false;
    for (j = 0; j < uniqueValues.length; ++j) {
      isNotUnique = isNotUnique || isEqual(arg, uniqueValues[j], tol);
    }
    if (!isNotUnique) {
      uniqueValues.push(arg);
    }
  }
  return uniqueValues;
}

/**
 * Selects only distinct Vector2 from an array.
 * Distinctness is determined by vector2AreEqual() to a tolerance.
 * @function selectDistinctVector2
 * @memberof Compare
 * @param {Vector2[]} args The Vector2 array.
 * @param {number} tol The numerical tolerance.
 * @returns {Vector2[]} The distinct Vector2 in an array.
 */
function selectDistinctVector2 (args, tol = 1e-14) {
  const uniqueValues = [];
  let i;
  let n = args.length;
  for (i = 0; i < n; ++i) {
    const arg = args[i];
    if (arg.isVector2 === undefined) {
      throw new Error('selectDistinctVector2: argument not a Vector2.');
    }
    if (!uniqueValues.reduce((acc, uniqueVal) => acc || vector2AreEqual(arg, uniqueVal, tol), false)) {
      uniqueValues.push(arg);
    }
  }
  return uniqueValues;
}

/**
 * Selects only distinct Vector3 from an array.
 * Distinctness is determined by vector3AreEqual() to a tolerance.
 * @function selectDistinctVector3
 * @memberof Compare
 * @param {Vector3[]} args The Vector3 array.
 * @param {number} tol The numerical tolerance.
 * @returns {Vector3[]} The distinct Vector3 in an array.
 */
function selectDistinctVector3 (args, tol = 1e-14) {
  const uniqueValues = [];
  let i;
  let n = args.length;
  for (i = 0; i < n; ++i) {
    const arg = args[i];
    if (arg.isVector3 === undefined) {
      throw new Error('selectDistinctVector2: argument not a Vector2.');
    }
    if (!uniqueValues.reduce((acc, uniqueVal) => acc || vector3AreEqual(arg, uniqueVal, tol), false)) {
      uniqueValues.push(arg);
    }
  }
  return uniqueValues;
}

module.exports = {
  DEFAULT_TOLERANCE: 1e-14,
  isZero,
  isGTZero,
  isLTZero,
  isEqual,
  vectorLengthsAreEqual,
  vector2AreEqual,
  vector3AreEqual,
  selectDistinctValues,
  selectDistinctVector2,
  selectDistinctVector3
};
