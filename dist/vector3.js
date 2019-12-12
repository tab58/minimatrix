"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Base code from THREE.js authors below.
 * Additions by Tim Bright
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */
const core_1 = __importDefault(require("./core"));
const vec3HelperFunctions = {
    clampScalar: (..._) => { },
    projectOnPlane: (..._) => { },
    reflect: (..._) => { }
};
/**
 * A 2-dimensional vector.
 */
class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.dimension = 3;
        this._x = x;
        this._y = y;
        this._z = z;
    }
    get x() { return this._x; }
    get y() { return this._y; }
    get z() { return this._z; }
    /**
     * Sets the components of the vector.
     * @param {number} x The x-component.
     * @param {number} y The y-component.
     * @param {number} z The z-component.
     * @returns {Vector3} This vector.
     */
    set(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
        return this;
    }
    /**
     * Sets the vector components to a scalar.
     * @param {number} scalar The scalar.
     * @returns {Vector3} This vector.
     */
    setScalar(scalar) {
        this._x = scalar;
        this._y = scalar;
        this._z = scalar;
        return this;
    }
    /**
     * Sets the X component of the vector.
     * @param {number} x The x-component.
     * @returns {Vector3} This vector.
     */
    setX(x) {
        this._x = x;
        return this;
    }
    /**
     * Sets the Y component of the vector.
     * @param {number} y The y-component.
     * @returns {Vector3} This vector.
     */
    setY(y) {
        this._y = y;
        return this;
    }
    /**
     * Sets the Z component of the vector.
     * @param {number} z The z-component.
     * @returns {Vector3} This vector.
     */
    setZ(z) {
        this._z = z;
        return this;
    }
    /**
     * Sets the vector component by index: [X, Y, Z]
     * @param {number} idx The index of the component (0-1).
     * @param {number} val The value to set the component to.
     * @returns {Vector3} This vector.
     */
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
            default: throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    /**
     * Gets the vector component by index: [X, Y, Z]
     * @param {number} index The index of the component (0-1).
     * @returns {number} The component value.
     */
    getComponent(index) {
        switch (index) {
            case 0: return this._x;
            case 1: return this._y;
            case 2: return this._z;
            default: throw new Error('index is out of range: ' + index);
        }
    }
    /**
     * Clamps the components of this vector between the minimum and maximum values.
     * @param {number} minVal The minimum value.
     * @param {number} maxVal The maximum value.
     */
    clampScalar(minVal, maxVal) {
        return vec3HelperFunctions.clampScalar(minVal, maxVal, this);
    }
    /**
     * Clones the vector.
     * @returns {Vector3} A new vector with the same components.
     */
    clone() {
        return new Vector3(this._x, this._y, this._z);
    }
    /**
     * Copies the component values of a vector to this vector.
     * @param {Vector3} v The vector to copy.
     * @returns {Vector3} This vector.
     */
    copy(v) {
        this._x = v.x;
        this._y = v.y;
        this._z = v.z;
        return this;
    }
    /**
     * Adds a vector to this vector.
     * @param {Vector3} v The vector to add.
     * @returns {Vector3} This vector.
     */
    add(v) {
        this._x += v.x;
        this._y += v.y;
        this._z += v.z;
        return this;
    }
    /**
     * Adds a scalar to every component of this vector.
     * @param {number} s The scalar to add.
     * @returns {Vector3} This vector.
     */
    addScalar(s) {
        this._x += s;
        this._y += s;
        this._z += s;
        return this;
    }
    /**
     * Adds 2 vectors and assigns the result to this vector.
     * @param {Vector3} a The first addend.
     * @param {Vector3} b The second addend.
     * @returns {Vector3} This vector.
     */
    addVectors(a, b) {
        this._x = a.x + b.x;
        this._y = a.y + b.y;
        this._z = a.z + b.z;
        return this;
    }
    /**
     * Scales a vector by a scalar and adds the result to this vector.
     * @param {Vector3} v The vector.
     * @param {number} s The scalar to scale by.
     * @returns {Vector3} This vector.
     */
    addScaledVector(v, s) {
        this._x += v.x * s;
        this._y += v.y * s;
        this._z += v.z * s;
        return this;
    }
    /**
     * Subtracts a vector from this vector.
     * @param {Vector3} v The vector to subtract.
     * @returns {Vector3} This vector.
     */
    sub(v) {
        this._x -= v.x;
        this._y -= v.y;
        this._z -= v.z;
        return this;
    }
    /**
     * Subtracts a scalar from each component of this vector.
     * @param {number} s The scalar to subtract.
     * @returns {Vector3} This vector.
     */
    subScalar(s) {
        this._x -= s;
        this._y -= s;
        this._z -= s;
        return this;
    }
    /**
     * Subtracts 2 vectors and assigns the value to this vector.
     * @param {Vector3} a The minuend.
     * @param {Vector3} b The subtrahend.
     * @returns {Vector3} This vector.
     */
    subVectors(a, b) {
        this._x = a.x - b.x;
        this._y = a.y - b.y;
        this._z = a.z - b.z;
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
        return this;
    }
    /**
     * Multiplies this vector by a Matrix3.
     * @param {Matrix3} m The matrix to scale this vector by.
     * @return {Vector3} This vector.
     */
    multiplyMatrix(m) {
        return this.multiplyMatrix3(m);
    }
    /**
     * Multiplies this vector by a 3x3 matrix.
     * @param {Matrix3} a The matrix to scale by.
     * @returns {Vector3} This vector.
     */
    multiplyMatrix3(a) {
        const ae = a.elements;
        const x = this._x;
        const y = this._y;
        const z = this._z;
        let a1 = ae[0];
        let a2 = ae[3];
        let a3 = ae[6];
        this._x = a1 * x + a2 * y + a3 * z;
        a1 = ae[1];
        a2 = ae[4];
        a3 = ae[7];
        this._y = a1 * x + a2 * y + a3 * z;
        a1 = ae[2];
        a2 = ae[5];
        a3 = ae[8];
        this._z = a1 * x + a2 * y + a3 * z;
        return this;
    }
    /**
     * Scales this vector by a number.
     * @param {number} scalar The number to scale by.
     * @returns {Vector3} This vector.
     */
    multiplyScalar(scalar) {
        this._x *= scalar;
        this._y *= scalar;
        this._z *= scalar;
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
        return this;
    }
    /**
     * Divides element-wise this vector by a vector.
     * @param {Vector3} v The vector to divide by.
     * @returns {Vector3} This vector.
     */
    divide(v) {
        this._x /= v.x;
        this._y /= v.y;
        this._z /= v.z;
        return this;
    }
    /**
     * Scales this vector by the inverse of the given scalar.
     * Doesn't check for divide by zero.
     * @param {number} scalar The scalar to divide by.
     * @returns {Vector3} This vector.
     */
    divideScalar(scalar) {
        return this.multiplyScalar(1.0 / scalar);
    }
    /**
     * Takes the minimum of each component of this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {Vector3} This vector.
     */
    min(v) {
        this._x = core_1.default.min(this._x, v.x);
        this._y = core_1.default.min(this._y, v.y);
        this._z = core_1.default.min(this._z, v.z);
        return this;
    }
    /**
     * Takes the maximum of each component of this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {Vector3} This vector.
     */
    max(v) {
        this._x = core_1.default.max(this._x, v.x);
        this._y = core_1.default.max(this._y, v.y);
        this._z = core_1.default.max(this._z, v.z);
        return this;
    }
    /**
     * Clamps this vector between the values of the minimum and maximum vectors.
     * This function assumes min < max, if this assumption isn't true it will not operate correctly.
     * @param {Vector3} min The minimum value vector.
     * @param {Vector3} max The maximum value vector.
     * @returns {Vector3} This vector.
     */
    clamp(min, max) {
        this._x = core_1.default.max(min.x, core_1.default.min(max.x, this._x));
        this._y = core_1.default.max(min.y, core_1.default.min(max.y, this._y));
        this._z = core_1.default.max(min.z, core_1.default.min(max.z, this._z));
        return this;
    }
    /**
     * Clamps this vector's length between the minimum and maximum values.
     * @param {number} min The minimum length.
     * @param {number} max The maximum length.
     * @returns {Vector3} This vector.
     */
    clampLength(min, max) {
        const length = this.length();
        return this.multiplyScalar(core_1.default.max(min, core_1.default.min(max, length)) / length);
    }
    /**
     * Rounds each component of the vector to the lowest integer.
     * @returns {Vector3} This vector.
     */
    floor() {
        this._x = core_1.default.floor(this._x);
        this._y = core_1.default.floor(this._y);
        this._z = core_1.default.floor(this._z);
        return this;
    }
    /**
     * Rounds each component of the vector to the highest integer.
     * @returns {Vector3} This vector.
     */
    ceil() {
        this._x = core_1.default.ceil(this._x);
        this._y = core_1.default.ceil(this._y);
        this._z = core_1.default.ceil(this._z);
        return this;
    }
    /**
     * Rounds each component of the vector via _Math.round().
     * @returns {Vector3} This vector.
     */
    round() {
        this._x = core_1.default.round(this._x);
        this._y = core_1.default.round(this._y);
        this._z = core_1.default.round(this._z);
        return this;
    }
    /**
     * Rounds each component of the vector toward zero (down if positive, up if negative).
     * @returns {Vector3} This vector.
     */
    roundToZero() {
        this._x = (this._x < 0) ? core_1.default.ceil(this._x) : core_1.default.floor(this._x);
        this._y = (this._y < 0) ? core_1.default.ceil(this._y) : core_1.default.floor(this._y);
        this._z = (this._z < 0) ? core_1.default.ceil(this._z) : core_1.default.floor(this._z);
        return this;
    }
    /**
     * Negates each component of the vector.
     * @returns {Vector3} This vector.
     */
    negate() {
        this._x = -this._x;
        this._y = -this._y;
        this._z = -this._z;
        return this;
    }
    /**
     * Computes the dot product between this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {number} The dot product.
     */
    dot(v) {
        return this._x * v.x + this._y * v.y + this._z * v.z;
    }
    /**
     * Computes the square of the length of the vector,
     * i.e. the dot product of this vector with itself.
     * @returns {number} The squared length of the vector.
     */
    lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z;
    }
    /**
     * Computes the length of the vector. Compensates for over/underflow.
     * @returns {number} The length of the vector.
     */
    length() {
        return core_1.default.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    }
    /**
     * Normalizes the vector, i.e. makes it unit length.
     * @returns {Vector3} This vector.
     */
    normalize() {
        return this.divideScalar(this.length());
    }
    /**
     * Sets the length of this vector/
     * @param {number} length The new length of the vector.
     * @returns {Vector3} This vector.
     */
    setLength(length) {
        return this.multiplyScalar(length / this.length());
    }
    /**
     * Computes a linear interpolation between this vector and the given vector.
     * @param {Vector3} v The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector3} This vector.
     */
    lerp(v, alpha) {
        this._x += (v.x - this._x) * alpha;
        this._y += (v.y - this._y) * alpha;
        this._z += (v.z - this._z) * alpha;
        return this;
    }
    /**
     * Computes the linear interpolation between two vectors.
     * @param {Vector3} v1 The vector at alpha = 0.
     * @param {Vector3} v2 The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector3} This vector.
     */
    lerpVectors(v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    }
    /**
     * Computes the cross product between this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {Vector3} This vector.
     */
    cross(v) {
        const x = this._x;
        const y = this._y;
        const z = this._z;
        this._x = y * v.z - z * v.y;
        this._y = z * v.x - x * v.z;
        this._z = x * v.y - y * v.x;
        return this;
    }
    /**
     * Computes the cross product (a x b).
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @returns {Vector3} This vector.
     */
    crossVectors(a, b) {
        const ax = a.x;
        const ay = a.y;
        const az = a.z;
        const bx = b.x;
        const by = b.y;
        const bz = b.z;
        this._x = ay * bz - az * by;
        this._y = az * bx - ax * bz;
        this._z = ax * by - ay * bx;
        return this;
    }
    /**
     * Calculates the projection of this vector onto the given vector.
     * @param {Vector3} vector The given vector.
     * @returns {Vector3} This vector.
     */
    projectOnVector(vector) {
        const scalar = vector.dot(this) / vector.lengthSq();
        return this.copy(vector).multiplyScalar(scalar);
    }
    /**
     * Projects this vector onto a plane defined by the normal to the plane.
     * @param {Vector3} planeNormal The plane normal.
     * @returns {Vector3} This vector.
     */
    projectOnPlane(planeNormal) {
        return vec3HelperFunctions.projectOnPlane(planeNormal, this);
    }
    /**
     * Reflects this vector through a plane defined by its normal.
     * @param {Vector3} normal The plane normal.
     * @param {Vector3} vector This vector.
     */
    reflect(normal) {
        return vec3HelperFunctions.reflect(normal, this);
    }
    /**
     * Assigns zero to component values below the numerical tolerance.
     * @param {number} tol The numerical tolerance.
     * @returns {Vector3} This vector.
     */
    thresholdValuesToZero(tol) {
        this._x = (core_1.default.abs(this._x) < tol ? 0 : this._x);
        this._y = (core_1.default.abs(this._y) < tol ? 0 : this._y);
        this._z = (core_1.default.abs(this._z) < tol ? 0 : this._z);
        return this;
    }
    /**
     * Calculates the angle between this vector and the given vector.
     * @param {Vector3} v The given vector.
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
        return dx * dx + dy * dy + dz * dz;
    }
    /**
     * Determines equality between this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @param {number} tol The numerical tolerance.
     * @returns {boolean} True if all the component value differences are below the numeric tolerance, false if not.
     */
    equals(v, tol = 0) {
        return (core_1.default.abs(v.x - this._x) < tol &&
            core_1.default.abs(v.y - this._y) < tol &&
            core_1.default.abs(v.z - this._z) < tol);
    }
    /**
     * Loads a vector from an array.
     * @param {number} array The array with values.
     * @param {number} offset The offset to start from in the array. Default is zero.
     * @returns {Vector3} This vector.
     */
    fromArray(array, offset = 0) {
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        return this;
    }
    /**
     * Loads an array from this vector.
     * @param {number[]} array The array to put the values in.
     * @param {number} offset The offset to start from in the array. Default is zero.
     * @returns {number[]} The array argument.
     */
    toArray(array = [], offset = 0) {
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        return array;
    }
    /**
     * Rotates a vector by an angle about another vector.
     * @param {Vector} center The center of rotation.
     * @param {number} angle The angle in radians to rotate the vector by.
     * @returns {Vector} This vector.
     */
    rotateAround(axis, angle) {
        // Rodrigues formula: v' = v * cos(t) + (k X v) * sin(t) + k * (k . v) * (1 - cos(t))
        const v = this;
        const c = core_1.default.cos(angle);
        const s = core_1.default.sin(angle);
        const k = axis.clone().normalize();
        const kxv = k.clone().cross(v).multiplyScalar(s);
        const kdv = k.dot(v) * (1 - c);
        const kkv = k.multiplyScalar(kdv);
        return this.multiplyScalar(c) // v * cos(t)
            .add(kxv) // (k X v) * sin(t)
            .add(kkv); // k * (k . v) * (1 - cos(t))
    }
}
exports.Vector3 = Vector3;
/**
 * Clamps the components of this vector between the minimum and maximum values.
 * @param {number} minVal The minimum value.
 * @param {number} maxVal The maximum value.
 * @returns {Vector3} This vector.
 */
vec3HelperFunctions.clampScalar = (function () {
    const min = new Vector3();
    const max = new Vector3();
    return function clampScalar(minVal, maxVal, vector) {
        min.set(minVal, minVal, minVal);
        max.set(maxVal, maxVal, maxVal);
        return vector.clamp(min, max);
    };
}());
/**
 * Projects this vector onto a plane defined by the normal to the plane.
 * @param {Vector3} planeNormal The plane normal.
 * @param {Vector3} vector The vector to project.
 * @returns {Vector3} This vector.
 */
vec3HelperFunctions.projectOnPlane = (function () {
    const v = new Vector3();
    const n = new Vector3();
    return function projectOnPlane(planeNormal, vector) {
        n.copy(planeNormal).normalize();
        v.copy(vector);
        return vector.sub(v.projectOnVector(n));
    };
}());
/**
 * Reflects this vector through a plane defined by its normal.
 * @param {Vector3} normal The plane normal.
 * @param {Vector3} vector This vector.
 */
vec3HelperFunctions.reflect = (function () {
    // reflect incident vector off plane orthogonal to normal
    const n = new Vector3();
    return function reflect(normal, vector) {
        n.copy(normal).normalize();
        const d = 2 * vector.dot(n);
        n.multiplyScalar(d);
        return vector.sub(n);
    };
}());
//# sourceMappingURL=vector3.js.map