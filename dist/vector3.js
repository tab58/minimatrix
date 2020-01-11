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
var core_1 = __importDefault(require("./core"));
var matrix3_1 = require("./matrix3");
var vec3HelperFunctions = {
    clampScalar: 0,
    projectOnPlane: 0,
    reflect: 0
};
/**
 * A 2-dimensional vector.
 */
var Vector3 = /** @class */ (function () {
    function Vector3(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.dimension = 3;
        this._components = [x, y, z];
    }
    Object.defineProperty(Vector3.prototype, "_x", {
        get: function () { return this._components[0]; },
        set: function (value) { this._components[0] = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "_y", {
        get: function () { return this._components[1]; },
        set: function (value) { this._components[1] = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "_z", {
        get: function () { return this._components[2]; },
        set: function (value) { this._components[2] = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "x", {
        get: function () { return this._components[0]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "y", {
        get: function () { return this._components[1]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "z", {
        get: function () { return this._components[2]; },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the components of the vector.
     * @param {number} x The x-component.
     * @param {number} y The y-component.
     * @param {number} z The z-component.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.set = function (x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
        return this;
    };
    /**
     * Sets the vector components to a scalar.
     * @param {number} scalar The scalar.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.setScalar = function (scalar) {
        this._x = scalar;
        this._y = scalar;
        this._z = scalar;
        return this;
    };
    /**
     * Sets the X component of the vector.
     * @param {number} x The x-component.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.setX = function (x) {
        this._x = x;
        return this;
    };
    /**
     * Sets the Y component of the vector.
     * @param {number} y The y-component.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.setY = function (y) {
        this._y = y;
        return this;
    };
    /**
     * Sets the Z component of the vector.
     * @param {number} z The z-component.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.setZ = function (z) {
        this._z = z;
        return this;
    };
    /**
     * Sets the vector component by index: [X, Y, Z]
     * @param {number} idx The index of the component (0-1).
     * @param {number} val The value to set the component to.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.setComponent = function (index, value) {
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
    };
    /**
     * Gets the vector component by index: [X, Y, Z]
     * @param {number} index The index of the component (0-1).
     * @returns {number} The component value.
     */
    Vector3.prototype.getComponent = function (index) {
        switch (index) {
            case 0: return this._x;
            case 1: return this._y;
            case 2: return this._z;
            default: throw new Error('index is out of range: ' + index);
        }
    };
    /**
     * Clamps the components of this vector between the minimum and maximum values.
     * @param {number} minVal The minimum value.
     * @param {number} maxVal The maximum value.
     */
    Vector3.prototype.clampScalar = function (minVal, maxVal) {
        return vec3HelperFunctions.clampScalar(minVal, maxVal, this);
    };
    /**
     * Clones the vector.
     * @returns {Vector3} A new vector with the same components.
     */
    Vector3.prototype.clone = function () {
        return new Vector3(this._x, this._y, this._z);
    };
    /**
     * Copies the component values of a vector to this vector.
     * @param {Vector3} v The vector to copy.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.copy = function (v) {
        this._x = v.x;
        this._y = v.y;
        this._z = v.z;
        return this;
    };
    /**
     * Adds a vector to this vector.
     * @param {Vector3} v The vector to add.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.add = function (v) {
        this._x += v.x;
        this._y += v.y;
        this._z += v.z;
        return this;
    };
    /**
     * Adds a scalar to every component of this vector.
     * @param {number} s The scalar to add.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.addScalar = function (s) {
        this._x += s;
        this._y += s;
        this._z += s;
        return this;
    };
    /**
     * Adds 2 vectors and assigns the result to this vector.
     * @param {Vector3} a The first addend.
     * @param {Vector3} b The second addend.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.addVectors = function (a, b) {
        this._x = a.x + b.x;
        this._y = a.y + b.y;
        this._z = a.z + b.z;
        return this;
    };
    /**
     * Scales a vector by a scalar and adds the result to this vector.
     * @param {Vector3} v The vector.
     * @param {number} s The scalar to scale by.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.addScaledVector = function (v, s) {
        this._x += v.x * s;
        this._y += v.y * s;
        this._z += v.z * s;
        return this;
    };
    /**
     * Subtracts a vector from this vector.
     * @param {Vector3} v The vector to subtract.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.sub = function (v) {
        this._x -= v.x;
        this._y -= v.y;
        this._z -= v.z;
        return this;
    };
    /**
     * Subtracts a scalar from each component of this vector.
     * @param {number} s The scalar to subtract.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.subScalar = function (s) {
        this._x -= s;
        this._y -= s;
        this._z -= s;
        return this;
    };
    /**
     * Subtracts 2 vectors and assigns the value to this vector.
     * @param {Vector3} a The minuend.
     * @param {Vector3} b The subtrahend.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.subVectors = function (a, b) {
        this._x = a.x - b.x;
        this._y = a.y - b.y;
        this._z = a.z - b.z;
        return this;
    };
    /**
     * Multiplies element-wise a vector with this one.
     * @param {Vector3} v The vector.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.multiply = function (v) {
        return this.multiplyVectors(this, v);
    };
    /**
     * Multiplies this vector by a Matrix3.
     * @param {Matrix3} m The matrix to scale this vector by.
     * @return {Vector3} This vector.
     */
    Vector3.prototype.multiplyMatrix3 = function (m) {
        return m.transformVector(this);
    };
    /**
     * Scales this vector by a number.
     * @param {number} scalar The number to scale by.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.multiplyScalar = function (scalar) {
        this._x *= scalar;
        this._y *= scalar;
        this._z *= scalar;
        return this;
    };
    /**
     * Multiplies the vector components element-wise.
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.multiplyVectors = function (a, b) {
        this._x = a.x * b.x;
        this._y = a.y * b.y;
        this._z = a.z * b.z;
        return this;
    };
    /**
     * Divides element-wise this vector by a vector.
     * @param {Vector3} v The vector to divide by.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.divide = function (v) {
        this._x /= v.x;
        this._y /= v.y;
        this._z /= v.z;
        return this;
    };
    /**
     * Scales this vector by the inverse of the given scalar.
     * Doesn't check for divide by zero.
     * @param {number} scalar The scalar to divide by.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.divideScalar = function (scalar) {
        return this.multiplyScalar(1.0 / scalar);
    };
    /**
     * Calculates the outer product of the matrix.
     * @param scalar A scalar to multiply the outer product by.
     */
    Vector3.prototype.getOuterProduct = function (scalar) {
        if (scalar === void 0) { scalar = 1; }
        var u1 = this._x;
        var u2 = this._y;
        var u3 = this._z;
        return new matrix3_1.Matrix3()
            .setElements(u1 * u1, u1 * u2, u1 * u3, u2 * u1, u2 * u2, u2 * u3, u3 * u1, u3 * u2, u3 * u3)
            .multiplyScalar(scalar);
    };
    /**
     * Takes the minimum of each component of this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.min = function (v) {
        this._x = core_1.default.min(this._x, v.x);
        this._y = core_1.default.min(this._y, v.y);
        this._z = core_1.default.min(this._z, v.z);
        return this;
    };
    /**
     * Takes the maximum of each component of this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.max = function (v) {
        this._x = core_1.default.max(this._x, v.x);
        this._y = core_1.default.max(this._y, v.y);
        this._z = core_1.default.max(this._z, v.z);
        return this;
    };
    /**
     * Clamps this vector between the values of the minimum and maximum vectors.
     * This function assumes min < max, if this assumption isn't true it will not operate correctly.
     * @param {Vector3} min The minimum value vector.
     * @param {Vector3} max The maximum value vector.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.clamp = function (min, max) {
        this._x = core_1.default.max(min.x, core_1.default.min(max.x, this._x));
        this._y = core_1.default.max(min.y, core_1.default.min(max.y, this._y));
        this._z = core_1.default.max(min.z, core_1.default.min(max.z, this._z));
        return this;
    };
    /**
     * Clamps this vector's length between the minimum and maximum values.
     * @param {number} min The minimum length.
     * @param {number} max The maximum length.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.clampLength = function (min, max) {
        var length = this.length();
        return this.multiplyScalar(core_1.default.max(min, core_1.default.min(max, length)) / length);
    };
    /**
     * Rounds each component of the vector to the lowest integer.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.floor = function () {
        this._x = core_1.default.floor(this._x);
        this._y = core_1.default.floor(this._y);
        this._z = core_1.default.floor(this._z);
        return this;
    };
    /**
     * Rounds each component of the vector to the highest integer.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.ceil = function () {
        this._x = core_1.default.ceil(this._x);
        this._y = core_1.default.ceil(this._y);
        this._z = core_1.default.ceil(this._z);
        return this;
    };
    /**
     * Rounds each component of the vector via _Math.round().
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.round = function () {
        this._x = core_1.default.round(this._x);
        this._y = core_1.default.round(this._y);
        this._z = core_1.default.round(this._z);
        return this;
    };
    /**
     * Rounds each component of the vector toward zero (down if positive, up if negative).
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.roundToZero = function () {
        this._x = (this._x < 0) ? core_1.default.ceil(this._x) : core_1.default.floor(this._x);
        this._y = (this._y < 0) ? core_1.default.ceil(this._y) : core_1.default.floor(this._y);
        this._z = (this._z < 0) ? core_1.default.ceil(this._z) : core_1.default.floor(this._z);
        return this;
    };
    /**
     * Negates each component of the vector.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.negate = function () {
        this._x = -this._x;
        this._y = -this._y;
        this._z = -this._z;
        return this;
    };
    /**
     * Computes the dot product between this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {number} The dot product.
     */
    Vector3.prototype.dot = function (v) {
        return this._x * v.x + this._y * v.y + this._z * v.z;
    };
    /**
     * Computes the square of the length of the vector,
     * i.e. the dot product of this vector with itself.
     * @returns {number} The squared length of the vector.
     */
    Vector3.prototype.lengthSq = function () {
        return this._x * this._x + this._y * this._y + this._z * this._z;
    };
    /**
     * Computes the length of the vector. Compensates for over/underflow.
     * @returns {number} The length of the vector.
     */
    Vector3.prototype.length = function () {
        return core_1.default.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    };
    /**
     * Normalizes the vector, i.e. makes it unit length.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.normalize = function () {
        return this.divideScalar(this.length());
    };
    /**
     * Sets the length of this vector/
     * @param {number} length The new length of the vector.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.setLength = function (length) {
        return this.multiplyScalar(length / this.length());
    };
    /**
     * Computes a linear interpolation between this vector and the given vector.
     * @param {Vector3} v The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.lerp = function (v, alpha) {
        this._x += (v.x - this._x) * alpha;
        this._y += (v.y - this._y) * alpha;
        this._z += (v.z - this._z) * alpha;
        return this;
    };
    /**
     * Computes the linear interpolation between two vectors.
     * @param {Vector3} v1 The vector at alpha = 0.
     * @param {Vector3} v2 The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.lerpVectors = function (v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    };
    /**
     * Computes the cross product between this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.cross = function (v) {
        var x = this._x;
        var y = this._y;
        var z = this._z;
        this._x = y * v.z - z * v.y;
        this._y = z * v.x - x * v.z;
        this._z = x * v.y - y * v.x;
        return this;
    };
    /**
     * Computes the cross product (a x b).
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.crossVectors = function (a, b) {
        var ax = a.x;
        var ay = a.y;
        var az = a.z;
        var bx = b.x;
        var by = b.y;
        var bz = b.z;
        this._x = ay * bz - az * by;
        this._y = az * bx - ax * bz;
        this._z = ax * by - ay * bx;
        return this;
    };
    /**
     * Calculates the projection of this vector onto the given vector.
     * @param {Vector3} vector The given vector.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.projectOnVector = function (vector) {
        var scalar = vector.dot(this) / vector.lengthSq();
        return this.copy(vector).multiplyScalar(scalar);
    };
    /**
     * Projects this vector onto a plane defined by the normal to the plane.
     * @param {Vector3} planeNormal The plane normal.
     * @returns {Vector3} This vector.
     */
    Vector3.prototype.projectOnPlane = function (planeNormal) {
        return vec3HelperFunctions.projectOnPlane(planeNormal, this);
    };
    /**
     * Reflects this vector through a plane defined by its normal.
     * @param {Vector3} normal The plane normal.
     * @param {Vector3} vector This vector.
     */
    Vector3.prototype.reflect = function (normal) {
        return vec3HelperFunctions.reflect(normal, this);
    };
    /**
     * Calculates the angle between this vector and the given vector.
     * @param {Vector3} v The given vector.
     * @returns {number} The angle.
     */
    Vector3.prototype.angleTo = function (v) {
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
    Vector3.prototype.distanceTo = function (v) {
        return core_1.default.sqrt(this.distanceToSquared(v));
    };
    /**
     * Computes the squared distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {number} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    Vector3.prototype.distanceToSquared = function (v) {
        var dx = this._x - v.x;
        var dy = this._y - v.y;
        var dz = this._z - v.z;
        return dx * dx + dy * dy + dz * dz;
    };
    /**
     * Loads a vector from an array.
     * @param array The array with values.
     * @param offset The offset to start from in the array. Default is zero.
     * @returns This vector.
     */
    Vector3.prototype.fromArray = function (array, offset) {
        if (offset === void 0) { offset = 0; }
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        return this;
    };
    /**
     * Loads an array from this vector.
     * @param array The array to put the values in.
     * @param offset The offset to start from in the array. Default is zero.
     * @returns The array argument.
     */
    Vector3.prototype.toArray = function (array, offset) {
        if (array === void 0) { array = []; }
        if (offset === void 0) { offset = 0; }
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        return array;
    };
    /**
     * Rotates a vector by an angle about another vector.
     * @param {MathVector} center The center of rotation.
     * @param {number} angle The angle in radians to rotate the vector by.
     * @returns {MathVector} This vector.
     */
    Vector3.prototype.rotateAround = function (axis, angle) {
        // Rodrigues formula: v' = v * cos(t) + (k X v) * sin(t) + k * (k . v) * (1 - cos(t))
        var c = core_1.default.cos(angle);
        var s = core_1.default.sin(angle);
        var k = axis.clone().normalize();
        var kxv = k.clone().cross(this).multiplyScalar(s);
        var kdv = k.dot(this) * (1 - c);
        var kkv = k.multiplyScalar(kdv);
        return this.multiplyScalar(c) // v * cos(t)
            .add(kxv) // (k X v) * sin(t)
            .add(kkv); // k * (k . v) * (1 - cos(t))
    };
    return Vector3;
}());
exports.Vector3 = Vector3;
/**
 * Clamps the components of this vector between the minimum and maximum values.
 * @param {number} minVal The minimum value.
 * @param {number} maxVal The maximum value.
 * @returns {Vector3} This vector.
 */
vec3HelperFunctions.clampScalar = (function () {
    var min = new Vector3();
    var max = new Vector3();
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
    var v = new Vector3();
    var n = new Vector3();
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
    var n = new Vector3();
    return function reflect(normal, vector) {
        n.copy(normal).normalize();
        var d = 2 * vector.dot(n);
        n.multiplyScalar(d);
        return vector.sub(n);
    };
}());
//# sourceMappingURL=vector3.js.map