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
const core_1 = __importDefault(require("./core"));
class Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.dimension = 4;
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    get x() { return this._x; }
    get y() { return this._y; }
    get z() { return this._z; }
    get w() { return this._w; }
    set(x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        return this;
    }
    setScalar(scalar) {
        this._x = scalar;
        this._y = scalar;
        this._z = scalar;
        this._w = scalar;
        return this;
    }
    setX(x) {
        this._x = x;
        return this;
    }
    setY(y) {
        this._y = y;
        return this;
    }
    setZ(z) {
        this._z = z;
        return this;
    }
    setW(w) {
        this._w = w;
        return this;
    }
    setComponent(index, value) {
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
            default: throw new Error(`index is out of range: ${index}`);
        }
        return this;
    }
    getComponent(index) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            case 3: return this.w;
            default: throw new Error(`index is out of range: ${index}`);
        }
    }
    clone() {
        return new Vector4(this._x, this._y, this._z, this._w);
    }
    copy(v) {
        this._x = v.x;
        this._y = v.y;
        this._z = v.z;
        this._w = v.w;
        return this;
    }
    add(v) {
        this._x += v.x;
        this._y += v.y;
        this._z += v.z;
        this._w += v.w;
        return this;
    }
    addScalar(s) {
        this._x += s;
        this._y += s;
        this._z += s;
        this._w += s;
        return this;
    }
    addVectors(a, b) {
        this._x = a.x + b.x;
        this._y = a.y + b.y;
        this._z = a.z + b.z;
        this._w = a.w + b.w;
        return this;
    }
    addScaledVector(v, s) {
        this._x += v.x * s;
        this._y += v.y * s;
        this._z += v.z * s;
        this._w += v.w * s;
        return this;
    }
    sub(v) {
        this._x -= v.x;
        this._y -= v.y;
        this._z -= v.z;
        this._w -= v.w;
        return this;
    }
    subScalar(s) {
        this._x -= s;
        this._y -= s;
        this._z -= s;
        this._w -= s;
        return this;
    }
    subVectors(a, b) {
        this._x = a.x - b.x;
        this._y = a.y - b.y;
        this._z = a.z - b.z;
        this._w = a.w - b.w;
        return this;
    }
    /**
     * Multiplies element-wise a vector with this one.
     * @param {Vector3} v The vector.
     * @returns {Vector3} This vector.
     */
    multiply(v) {
        this._x *= v.x;
        this._y *= v.y;
        this._z *= v.z;
        this._w *= v.w;
        return this;
    }
    multiplyScalar(scalar) {
        this._x *= scalar;
        this._y *= scalar;
        this._z *= scalar;
        this._w *= scalar;
        return this;
    }
    /**
     * Multiplies the vector components element-wise.
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @returns {Vector3} This vector.
     */
    multiplyVectors(a, b) {
        this._x = a.x * b.x;
        this._y = a.y * b.y;
        this._z = a.z * b.z;
        this._w = a.w * b.w;
        return this;
    }
    /**
     * Divides element-wise this vector by a vector.
     * @param {Vector4} v The vector to divide by.
     * @returns {Vector4} This vector.
     */
    divide(v) {
        this._x /= v.x;
        this._y /= v.y;
        this._z /= v.z;
        this._w /= v.w;
        return this;
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1.0 / scalar);
    }
    /**
     * Calculates the angle between this vector and the given vector.
     * @param {Vector4} v The given vector.
     * @returns {number} The angle.
     */
    angleTo(v) {
        const theta = this.dot(v) / (core_1.default.sqrt(this.lengthSq() * v.lengthSq()));
        // clamp, to handle numerical problems
        return core_1.default.acos(core_1.default.max(-1, core_1.default.min(theta, 1)));
    }
    /**
     * Computes the distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {number} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    distanceTo(v) {
        return core_1.default.sqrt(this.distanceToSquared(v));
    }
    /**
     * Computes the squared distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {number} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    distanceToSquared(v) {
        const dx = this._x - v.x;
        const dy = this._y - v.y;
        const dz = this._z - v.z;
        const dw = this._w - v.w;
        return dx * dx + dy * dy + dz * dz + dw * dw;
    }
    setAxisAngleFromRotationMatrix(m) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        var angle, x, y, z; // variables for result
        const epsilon = 0.01; // margin to allow for rounding errors
        const epsilon2 = 0.1; // margin to distinguish between 0 and 180 degrees
        const te = m.toArray();
        const m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
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
        let s = core_1.default.sqrt((m32 - m23) * (m32 - m23) +
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
    }
    min(v) {
        this._x = core_1.default.min(this.x, v.x);
        this._y = core_1.default.min(this.y, v.y);
        this._z = core_1.default.min(this.z, v.z);
        this._w = core_1.default.min(this.w, v.w);
        return this;
    }
    max(v) {
        this._x = core_1.default.max(this.x, v.x);
        this._y = core_1.default.max(this.y, v.y);
        this._z = core_1.default.max(this.z, v.z);
        this._w = core_1.default.max(this.w, v.w);
        return this;
    }
    clamp(min, max) {
        // assumes min < max, componentwise
        this._x = core_1.default.max(min.x, core_1.default.min(max.x, this.x));
        this._y = core_1.default.max(min.y, core_1.default.min(max.y, this.y));
        this._z = core_1.default.max(min.z, core_1.default.min(max.z, this.z));
        this._w = core_1.default.max(min.w, core_1.default.min(max.w, this.w));
        return this;
    }
    clampScalar(minVal, maxVal) {
        this._x = core_1.default.max(minVal, core_1.default.min(maxVal, this.x));
        this._y = core_1.default.max(minVal, core_1.default.min(maxVal, this.y));
        this._z = core_1.default.max(minVal, core_1.default.min(maxVal, this.z));
        this._w = core_1.default.max(minVal, core_1.default.min(maxVal, this.w));
        return this;
    }
    clampLength(min, max) {
        var length = this.length();
        return this.divideScalar(length).multiplyScalar(core_1.default.max(min, core_1.default.min(max, length)));
    }
    floor() {
        this._x = core_1.default.floor(this._x);
        this._y = core_1.default.floor(this._y);
        this._z = core_1.default.floor(this._z);
        this._w = core_1.default.floor(this._w);
        return this;
    }
    ceil() {
        this._x = core_1.default.ceil(this._x);
        this._y = core_1.default.ceil(this._y);
        this._z = core_1.default.ceil(this._z);
        this._w = core_1.default.ceil(this._w);
        return this;
    }
    round() {
        this._x = core_1.default.round(this._x);
        this._y = core_1.default.round(this._y);
        this._z = core_1.default.round(this._z);
        this._w = core_1.default.round(this._w);
        return this;
    }
    roundToZero() {
        this._x = (this._x < 0) ? core_1.default.ceil(this._x) : core_1.default.floor(this._x);
        this._y = (this._y < 0) ? core_1.default.ceil(this._y) : core_1.default.floor(this._y);
        this._z = (this._z < 0) ? core_1.default.ceil(this._z) : core_1.default.floor(this._z);
        this._w = (this._w < 0) ? core_1.default.ceil(this._w) : core_1.default.floor(this._w);
        return this;
    }
    negate() {
        this._x = -this._x;
        this._y = -this._y;
        this._z = -this._z;
        this._w = -this._w;
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
        return core_1.default.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    normalize() {
        return this.divideScalar(this.length());
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        this._x += (v.x - this._x) * alpha;
        this._y += (v.y - this._y) * alpha;
        this._z += (v.z - this._z) * alpha;
        this._w += (v.w - this._w) * alpha;
        return this;
    }
    lerpVectors(v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    }
    equals(v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));
    }
    fromArray(array, offset = 0) {
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._w = array[offset + 3];
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    }
}
exports.Vector4 = Vector4;
//# sourceMappingURL=vector4.js.map