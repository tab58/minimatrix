"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */
var core_1 = __importDefault(require("./core"));
var Vector4 = /** @class */ (function () {
    function Vector4(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 0; }
        this.dimension = 4;
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    Object.defineProperty(Vector4.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "z", {
        get: function () { return this._z; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "w", {
        get: function () { return this._w; },
        enumerable: true,
        configurable: true
    });
    Vector4.prototype.set = function (x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        return this;
    };
    Vector4.prototype.setScalar = function (scalar) {
        this._x = scalar;
        this._y = scalar;
        this._z = scalar;
        this._w = scalar;
        return this;
    };
    Vector4.prototype.setX = function (x) {
        this._x = x;
        return this;
    };
    Vector4.prototype.setY = function (y) {
        this._y = y;
        return this;
    };
    Vector4.prototype.setZ = function (z) {
        this._z = z;
        return this;
    };
    Vector4.prototype.setW = function (w) {
        this._w = w;
        return this;
    };
    Vector4.prototype.setComponent = function (index, value) {
        switch (index) {
            case 0:
                this._x = value;
                break;
            case 1:
                this._y = value;
                break;
            case 2:
                this._z = value;
                break;
            case 3:
                this._w = value;
                break;
            default: throw new Error("index is out of range: " + index);
        }
        return this;
    };
    Vector4.prototype.getComponent = function (index) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            case 3: return this.w;
            default: throw new Error("index is out of range: " + index);
        }
    };
    Vector4.prototype.clone = function () {
        return new Vector4(this._x, this._y, this._z, this._w);
    };
    Vector4.prototype.copy = function (v) {
        this._x = v.x;
        this._y = v.y;
        this._z = v.z;
        this._w = v.w;
        return this;
    };
    Vector4.prototype.add = function (v) {
        this._x += v.x;
        this._y += v.y;
        this._z += v.z;
        this._w += v.w;
        return this;
    };
    Vector4.prototype.addScalar = function (s) {
        this._x += s;
        this._y += s;
        this._z += s;
        this._w += s;
        return this;
    };
    Vector4.prototype.addVectors = function (a, b) {
        this._x = a.x + b.x;
        this._y = a.y + b.y;
        this._z = a.z + b.z;
        this._w = a.w + b.w;
        return this;
    };
    Vector4.prototype.addScaledVector = function (v, s) {
        this._x += v.x * s;
        this._y += v.y * s;
        this._z += v.z * s;
        this._w += v.w * s;
        return this;
    };
    Vector4.prototype.sub = function (v) {
        this._x -= v.x;
        this._y -= v.y;
        this._z -= v.z;
        this._w -= v.w;
        return this;
    };
    Vector4.prototype.subScalar = function (s) {
        this._x -= s;
        this._y -= s;
        this._z -= s;
        this._w -= s;
        return this;
    };
    Vector4.prototype.subVectors = function (a, b) {
        this._x = a.x - b.x;
        this._y = a.y - b.y;
        this._z = a.z - b.z;
        this._w = a.w - b.w;
        return this;
    };
    /**
     * Multiplies element-wise a vector with this one.
     * @param {Vector3} v The vector.
     * @returns {Vector3} This vector.
     */
    Vector4.prototype.multiply = function (v) {
        this._x *= v.x;
        this._y *= v.y;
        this._z *= v.z;
        this._w *= v.w;
        return this;
    };
    Vector4.prototype.multiplyScalar = function (scalar) {
        this._x *= scalar;
        this._y *= scalar;
        this._z *= scalar;
        this._w *= scalar;
        return this;
    };
    /**
     * Multiplies the vector components element-wise.
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @returns {Vector3} This vector.
     */
    Vector4.prototype.multiplyVectors = function (a, b) {
        this._x = a.x * b.x;
        this._y = a.y * b.y;
        this._z = a.z * b.z;
        this._w = a.w * b.w;
        return this;
    };
    /**
     * Divides element-wise this vector by a vector.
     * @param {Vector4} v The vector to divide by.
     * @returns {Vector4} This vector.
     */
    Vector4.prototype.divide = function (v) {
        this._x /= v.x;
        this._y /= v.y;
        this._z /= v.z;
        this._w /= v.w;
        return this;
    };
    Vector4.prototype.divideScalar = function (scalar) {
        return this.multiplyScalar(1.0 / scalar);
    };
    /**
     * Calculates the angle between this vector and the given vector.
     * @param {Vector4} v The given vector.
     * @returns {number} The angle.
     */
    Vector4.prototype.angleTo = function (v) {
        var theta = this.dot(v) / (core_1.default.sqrt(this.lengthSq() * v.lengthSq()));
        // clamp, to handle numerical problems
        return core_1.default.acos(core_1.default.max(-1, core_1.default.min(theta, 1)));
    };
    /**
     * Computes the distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {number} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    Vector4.prototype.distanceTo = function (v) {
        return core_1.default.sqrt(this.distanceToSquared(v));
    };
    /**
     * Computes the squared distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {number} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    Vector4.prototype.distanceToSquared = function (v) {
        var dx = this._x - v.x;
        var dy = this._y - v.y;
        var dz = this._z - v.z;
        var dw = this._w - v.w;
        return dx * dx + dy * dy + dz * dz + dw * dw;
    };
    Vector4.prototype.setAxisAngleFromRotationMatrix = function (m) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        var angle, x, y, z; // variables for result
        var epsilon = 0.01; // margin to allow for rounding errors
        var epsilon2 = 0.1; // margin to distinguish between 0 and 180 degrees
        var te = m.toArray();
        var m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
        if ((core_1.default.abs(m12 - m21) < epsilon) &&
            (core_1.default.abs(m13 - m31) < epsilon) &&
            (core_1.default.abs(m23 - m32) < epsilon)) {
            // singularity found
            // first check for identity matrix which must have +1 for all terms
            // in leading diagonal and zero in other terms
            if ((core_1.default.abs(m12 + m21) < epsilon2) &&
                (core_1.default.abs(m13 + m31) < epsilon2) &&
                (core_1.default.abs(m23 + m32) < epsilon2) &&
                (core_1.default.abs(m11 + m22 + m33 - 3) < epsilon2)) {
                // this singularity is identity matrix so angle = 0
                this.set(1, 0, 0, 0);
                return this; // zero angle, arbitrary axis
            }
            // otherwise this singularity is angle = 180
            angle = core_1.default.PI;
            var xx = (m11 + 1) / 2;
            var yy = (m22 + 1) / 2;
            var zz = (m33 + 1) / 2;
            var xy = (m12 + m21) / 4;
            var xz = (m13 + m31) / 4;
            var yz = (m23 + m32) / 4;
            if ((xx > yy) && (xx > zz)) {
                // m11 is the largest diagonal term
                if (xx < epsilon) {
                    x = 0;
                    y = 0.707106781;
                    z = 0.707106781;
                }
                else {
                    x = core_1.default.sqrt(xx);
                    y = xy / x;
                    z = xz / x;
                }
            }
            else if (yy > zz) {
                // m22 is the largest diagonal term
                if (yy < epsilon) {
                    x = 0.707106781;
                    y = 0;
                    z = 0.707106781;
                }
                else {
                    y = core_1.default.sqrt(yy);
                    x = xy / y;
                    z = yz / y;
                }
            }
            else {
                // m33 is the largest diagonal term so base result on this
                if (zz < epsilon) {
                    x = 0.707106781;
                    y = 0.707106781;
                    z = 0;
                }
                else {
                    z = core_1.default.sqrt(zz);
                    x = xz / z;
                    y = yz / z;
                }
            }
            this.set(x, y, z, angle);
            return this; // return 180 deg rotation
        }
        // as we have reached here there are no singularities so we can handle normally
        var s = core_1.default.sqrt((m32 - m23) * (m32 - m23) +
            (m13 - m31) * (m13 - m31) +
            (m21 - m12) * (m21 - m12)); // used to normalize
        if (core_1.default.abs(s) < 0.001) {
            s = 1;
        }
        // prevent divide by zero, should not happen if matrix is orthogonal and should be
        // caught by singularity test above, but I've left it in just in case
        this._x = (m32 - m23) / s;
        this._y = (m13 - m31) / s;
        this._z = (m21 - m12) / s;
        this._w = core_1.default.acos((m11 + m22 + m33 - 1) / 2);
        return this;
    };
    Vector4.prototype.min = function (v) {
        this._x = core_1.default.min(this.x, v.x);
        this._y = core_1.default.min(this.y, v.y);
        this._z = core_1.default.min(this.z, v.z);
        this._w = core_1.default.min(this.w, v.w);
        return this;
    };
    Vector4.prototype.max = function (v) {
        this._x = core_1.default.max(this.x, v.x);
        this._y = core_1.default.max(this.y, v.y);
        this._z = core_1.default.max(this.z, v.z);
        this._w = core_1.default.max(this.w, v.w);
        return this;
    };
    Vector4.prototype.clamp = function (min, max) {
        // assumes min < max, componentwise
        this._x = core_1.default.max(min.x, core_1.default.min(max.x, this.x));
        this._y = core_1.default.max(min.y, core_1.default.min(max.y, this.y));
        this._z = core_1.default.max(min.z, core_1.default.min(max.z, this.z));
        this._w = core_1.default.max(min.w, core_1.default.min(max.w, this.w));
        return this;
    };
    Vector4.prototype.clampScalar = function (minVal, maxVal) {
        this._x = core_1.default.max(minVal, core_1.default.min(maxVal, this.x));
        this._y = core_1.default.max(minVal, core_1.default.min(maxVal, this.y));
        this._z = core_1.default.max(minVal, core_1.default.min(maxVal, this.z));
        this._w = core_1.default.max(minVal, core_1.default.min(maxVal, this.w));
        return this;
    };
    Vector4.prototype.clampLength = function (min, max) {
        var length = this.length();
        return this.divideScalar(length).multiplyScalar(core_1.default.max(min, core_1.default.min(max, length)));
    };
    Vector4.prototype.floor = function () {
        this._x = core_1.default.floor(this._x);
        this._y = core_1.default.floor(this._y);
        this._z = core_1.default.floor(this._z);
        this._w = core_1.default.floor(this._w);
        return this;
    };
    Vector4.prototype.ceil = function () {
        this._x = core_1.default.ceil(this._x);
        this._y = core_1.default.ceil(this._y);
        this._z = core_1.default.ceil(this._z);
        this._w = core_1.default.ceil(this._w);
        return this;
    };
    Vector4.prototype.round = function () {
        this._x = core_1.default.round(this._x);
        this._y = core_1.default.round(this._y);
        this._z = core_1.default.round(this._z);
        this._w = core_1.default.round(this._w);
        return this;
    };
    Vector4.prototype.roundToZero = function () {
        this._x = (this._x < 0) ? core_1.default.ceil(this._x) : core_1.default.floor(this._x);
        this._y = (this._y < 0) ? core_1.default.ceil(this._y) : core_1.default.floor(this._y);
        this._z = (this._z < 0) ? core_1.default.ceil(this._z) : core_1.default.floor(this._z);
        this._w = (this._w < 0) ? core_1.default.ceil(this._w) : core_1.default.floor(this._w);
        return this;
    };
    Vector4.prototype.negate = function () {
        this._x = -this._x;
        this._y = -this._y;
        this._z = -this._z;
        this._w = -this._w;
        return this;
    };
    Vector4.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    };
    Vector4.prototype.lengthSq = function () {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    };
    Vector4.prototype.length = function () {
        return core_1.default.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    };
    Vector4.prototype.normalize = function () {
        return this.divideScalar(this.length());
    };
    Vector4.prototype.setLength = function (length) {
        return this.normalize().multiplyScalar(length);
    };
    Vector4.prototype.lerp = function (v, alpha) {
        this._x += (v.x - this._x) * alpha;
        this._y += (v.y - this._y) * alpha;
        this._z += (v.z - this._z) * alpha;
        this._w += (v.w - this._w) * alpha;
        return this;
    };
    Vector4.prototype.lerpVectors = function (v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    };
    Vector4.prototype.equals = function (v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));
    };
    Vector4.prototype.fromArray = function (array, offset) {
        if (offset === void 0) { offset = 0; }
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._w = array[offset + 3];
        return this;
    };
    Vector4.prototype.toArray = function (array, offset) {
        if (array === void 0) { array = []; }
        if (offset === void 0) { offset = 0; }
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    };
    return Vector4;
}());
exports.Vector4 = Vector4;
//# sourceMappingURL=vector4.js.map