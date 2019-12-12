"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Base code by authors below, additions by Tim Bright
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
const core_1 = __importDefault(require("./core"));
exports.DEFAULT_TOLERANCE = 1e-14;
/**
 * Test if a number is close to zero.
 * @function isZero
 * @memberof Compare
 * @param {number} x The number to test.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number absolute value is below numerical tolerance, false if not.
 */
function isZero(x, eps) {
    return (core_1.default.abs(x) < eps);
}
exports.isZero = isZero;
/**
 * Test if a number is greater than zero.
 * @function isGTZero
 * @memberof Compare
 * @param {number} x The number to test.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number value is greater than the numerical tolerance, false if not.
 */
function isGTZero(x, eps) {
    return (x >= eps);
}
exports.isGTZero = isGTZero;
/**
 * Test if a number is less than zero.
 * @function isLTZero
 * @memberof Compare
 * @param {number} x The number to test.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number is less than the negative of the numerical tolerance, false if not.
 */
function isLTZero(x, eps) {
    return (x <= -eps);
}
exports.isLTZero = isLTZero;
/**
 * Test if a number is equal to another number within a tolerance.
 * @function isEqual
 * @memberof Compare
 * @param {number} x The first number.
 * @param {number} y The second number.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if number difference is within the numerical tolerance, false if not.
 */
function isEqual(x, y, eps) {
    return isZero(x - y, eps);
}
exports.isEqual = isEqual;
/**
 * Test if a vector length is equal to another vector length within a tolerance.
 * @function vectorLengthsAreEqual
 * @memberof Compare
 * @param {Vector2|Vector3|Vector4} x The first vector.
 * @param {Vector2|Vector3|Vector4} y The second vector.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if vector length difference is within the numerical tolerance, false if not.
 */
function areVectorLengthsEqual(x, y, eps) {
    return isZero(x.length() - y.length(), eps);
}
exports.areVectorLengthsEqual = areVectorLengthsEqual;
/**
 * Test if a vector length is equal to another vector length within a tolerance.
 * @function vector2AreEqual
 * @memberof Compare
 * @param {Vector2} x The first vector.
 * @param {Vector2} y The second vector.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if vector component differences are within the numerical tolerance, false if not.
 */
function areVector2Equal(x, y, eps) {
    return (isZero(x.x - y.x, eps) &&
        isZero(x.y - y.y, eps));
}
exports.areVector2Equal = areVector2Equal;
/**
 * Test if a vector length is equal to another vector length within a tolerance.
 * @function vector3AreEqual
 * @memberof Compare
 * @param {Vector3} x The first vector.
 * @param {Vector3} y The second vector.
 * @param {number} eps The numerical tolerance.
 * @returns {boolean} True if vector component differences are within the numerical tolerance, false if not.
 */
function areVector3Equal(x, y, eps) {
    return (isZero(x.x - y.x, eps) &&
        isZero(x.y - y.y, eps) &&
        isZero(x.z - y.z, eps));
}
exports.areVector3Equal = areVector3Equal;
//# sourceMappingURL=compare.js.map