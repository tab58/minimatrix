"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Base code from THREE.js authors below.
 * Additions by Tim Bright
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */
var core_1 = __importDefault(require("./core"));
var matrix2_1 = require("./matrix2");
/**
 * A 2-dimensional vector.
 */
var Vector2 = /** @class */ (function () {
    /**
     * @constructor
     * @param {number} x The x-component value.
     * @param {number} y The y-component value.
     */
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.dimension = 2;
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the components of the vector.
     * @param {number} x The x-component.
     * @param {number} y The y-component.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.set = function (x, y) {
        this._x = x;
        this._y = y;
        return this;
    };
    /**
     * Sets the vector components to a scalar.
     * @param {number} scalar The scalar.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.setScalar = function (scalar) {
        this._x = scalar;
        this._y = scalar;
        return this;
    };
    /**
     * Sets the X component of the vector.
     * @param {number} X The x-component.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.setX = function (x) {
        this._x = x;
        return this;
    };
    /**
     * Sets the Y component of the vector.
     * @param {number} Y The y-component.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.setY = function (y) {
        this._y = y;
        return this;
    };
    /**
     * Sets the vector component by index: [X, Y, Z]
     * @param {number} idx The index of the component (0-1).
     * @param {number} val The value to set the component to.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.setComponent = function (idx, val) {
        switch (idx) {
            case 0:
                this._x = val;
                break;
            case 1:
                this._y = val;
                break;
            default: throw new Error('index is out of range: ' + idx);
        }
        return this;
    };
    /**
     * Gets the vector component by index: [X, Y, Z]
     * @param {number} index The index of the component (0-1).
     * @returns {number} The component value.
     */
    Vector2.prototype.getComponent = function (index) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error('index is out of range: ' + index);
        }
    };
    /**
     * Clones the vector.
     * @returns {Vector2} A new vector with the same components.
     */
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    /**
     * Copies the component values of a vector to this vector.
     * @param {Vector2} v The vector to copy.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.copy = function (v) {
        this._x = v.x;
        this._y = v.y;
        return this;
    };
    /**
     * Adds a vector to this vector.
     * @param {Vector2} v The vector to add.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.add = function (v) {
        this._x += v.x;
        this._y += v.y;
        return this;
    };
    /**
     * Adds a scalar to every component of this vector.
     * @param {number} s The scalar to add.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.addScalar = function (s) {
        this._x += s;
        this._y += s;
        return this;
    };
    /**
     * Adds 2 vectors and assigns the result to this vector.
     * @param {Vector2} a The first addend.
     * @param {Vector2} b The second addend.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.addVectors = function (a, b) {
        this._x = a.x + b.x;
        this._y = a.y + b.y;
        return this;
    };
    /**
     * Scales a vector by a scalar and adds the result to this vector.
     * @param {Vector2} v The vector.
     * @param {number} s The scalar to scale by.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.addScaledVector = function (v, s) {
        this._x += v.x * s;
        this._y += v.y * s;
        return this;
    };
    /**
     * Subtracts a vector from this vector.
     * @param {Vector2} v The vector to subtract.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.sub = function (v) {
        this._x -= v.x;
        this._y -= v.y;
        return this;
    };
    /**
     * Subtracts a scalar from each component of this vector.
     * @param {number} s The scalar to subtract.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.subScalar = function (s) {
        this._x -= s;
        this._y -= s;
        return this;
    };
    /**
     * Subtracts 2 vectors and assigns the value to this vector.
     * @param {Vector2} a The minuend.
     * @param {Vector2} b The subtrahend.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.subVectors = function (a, b) {
        this._x = a.x - b.x;
        this._y = a.y - b.y;
        return this;
    };
    /**
     * Multiplies element-wise a vector with this one.
     * @param {Vector2} v The vector.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.multiply = function (v) {
        this._x *= v.x;
        this._y *= v.y;
        return this;
    };
    /**
     * Scales this vector by a number.
     * @param {number} scalar The number to scale by.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.multiplyScalar = function (scalar) {
        this._x *= scalar;
        this._y *= scalar;
        return this;
    };
    /**
     * Multiplies the vector components element-wise.
     * @param {Vector2} a The first vector.
     * @param {Vector2} b The second vector.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.multiplyVectors = function (a, b) {
        this._x = a.x * b.x;
        this._y = a.y * b.y;
        return this;
    };
    /**
     * Multiplies the vector by a 2x2 matrix.
     * @param {Vector2} m The matrix to scale by.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.multiplyMatrix2 = function (m) {
        return m.transformVector2(this);
    };
    /**
     * Scales this vector as a projected vector (x, y, 1) by a 3x3 matrix.
     * @param m The 3x3 matrix.
     */
    Vector2.prototype.multiplyMatrix3 = function (m) {
        return m.transformVector2(this);
    };
    /**
     * Divides element-wise this vector by a vector.
     * @param {Vector2} v The vector to divide by.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.divide = function (v) {
        this._x /= v.x;
        this._y /= v.y;
        return this;
    };
    /**
     * Scales this vector by the inverse of the given scalar.
     * Doesn't check for divide by zero.
     * @param {number} scalar The scalar to divide by.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.divideScalar = function (scalar) {
        return this.multiplyScalar(1.0 / scalar);
    };
    /**
     * Calculates the outer product of the matrix.
     * @param scalar A scalar to multiply the outer product by.
     */
    Vector2.prototype.getOuterProduct = function (scalar) {
        if (scalar === void 0) { scalar = 1; }
        var u1 = this._x;
        var u2 = this._y;
        return new matrix2_1.Matrix2()
            .setElements(u1 * u1, u1 * u2, u2 * u1, u2 * u2)
            .multiplyScalar(scalar);
    };
    /**
     * Takes the minimum of each component of this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.min = function (v) {
        this._x = core_1.default.min(this.x, v.x);
        this._y = core_1.default.min(this.y, v.y);
        return this;
    };
    /**
     * Takes the maximum of each component of this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.max = function (v) {
        this._x = core_1.default.max(this.x, v.x);
        this._y = core_1.default.max(this.y, v.y);
        return this;
    };
    /**
     * Clamps this vector between the values of the minimum and maximum vectors.
     * This function assumes min < max, if this assumption isn't true it will not operate correctly.
     * @param {Vector2} min The minimum value vector.
     * @param {Vector2} max The maximum value vector.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.clamp = function (min, max) {
        this._x = core_1.default.max(min.x, core_1.default.min(max.x, this.x));
        this._y = core_1.default.max(min.y, core_1.default.min(max.y, this.y));
        return this;
    };
    /**
     * Rounds each component of the vector to the lowest integer.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.floor = function () {
        this._x = core_1.default.floor(this.x);
        this._y = core_1.default.floor(this.y);
        return this;
    };
    /**
     * Rounds each component of the vector to the highest integer.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.ceil = function () {
        this._x = core_1.default.ceil(this.x);
        this._y = core_1.default.ceil(this.y);
        return this;
    };
    /**
     * Rounds each component of the vector via _Math.round().
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.round = function () {
        this._x = core_1.default.round(this.x);
        this._y = core_1.default.round(this.y);
        return this;
    };
    /**
     * Rounds each component of the vector toward zero (down if positive, up if negative).
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.roundToZero = function () {
        this._x = (this.x < 0) ? core_1.default.ceil(this.x) : core_1.default.floor(this.x);
        this._y = (this.y < 0) ? core_1.default.ceil(this.y) : core_1.default.floor(this.y);
        return this;
    };
    /**
     * Negates each component of the vector.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.negate = function () {
        this._x = -this.x;
        this._y = -this.y;
        return this;
    };
    /**
     * Computes the dot product between this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @returns {number} The dot product.
     */
    Vector2.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    /**
     * Computes the z-component of the cross product between this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @returns {number} The z-component of the cross product.
     */
    Vector2.prototype.cross = function (v) {
        return this.x * v.y - this.y * v.x;
    };
    /**
     * Computes the square of the length of the vector,
     * i.e. the dot product of this vector with itself.
     * @returns {number} The squared length of the vector.
     */
    Vector2.prototype.lengthSq = function () {
        // rewritten to deal with overflow/underflow
        var a = this.x;
        var b = this.y;
        if (a === 0 && b === 0) {
            return 0;
        }
        var x = core_1.default.abs(a);
        var y = core_1.default.abs(b);
        var u = core_1.default.max(x, y);
        var t = core_1.default.min(x, y) / u;
        return u * u * (1 + t * t);
    };
    /**
     * Computes the length of the vector. Compensates for over/underflow.
     * @returns {number} The length of the vector.
     */
    Vector2.prototype.length = function () {
        var a = this.x;
        var b = this.y;
        if (a === 0 && b === 0) {
            return 0;
        }
        var x = core_1.default.abs(a);
        var y = core_1.default.abs(b);
        var u = core_1.default.max(x, y);
        var t = core_1.default.min(x, y) / u;
        return u * core_1.default.sqrt(1 + t * t);
    };
    /**
     * Normalizes the vector, i.e. makes it unit length.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.normalize = function () {
        return this.divideScalar(this.length());
    };
    /**
     * Computes the angle in radians with respect to the positive x-axis.
     * @returns {number} The angle between 0-2*PI.
     */
    Vector2.prototype.angle = function () {
        var angle = core_1.default.atan2(this.y, this.x);
        if (angle < 0) {
            angle += 2 * core_1.default.PI;
        }
        return angle;
    };
    /**
     * Computes the angle between this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @returns {number} The angle between the vectors.
     */
    Vector2.prototype.angleTo = function (v) {
        var theta = this.dot(v) / (core_1.default.sqrt(this.lengthSq() * v.lengthSq()));
        // clamp, to handle numerical problems
        return core_1.default.acos(core_1.default.max(-1, core_1.default.min(theta, 1)));
    };
    /**
     * Computes the distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {Vector2} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    Vector2.prototype.distanceTo = function (v) {
        return core_1.default.sqrt(this.distanceToSquared(v));
    };
    /**
     * Computes the squared distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {Vector2} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    Vector2.prototype.distanceToSquared = function (v) {
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        return dx * dx + dy * dy;
    };
    /**
     * Determines equality between this vector and the given vector.
     * @param {Vector2} v The given vector.
     * @param {number} tol The numerical tolerance.
     * @returns {boolean} True if all the component value differences are below the numeric tolerance, false if not.
     */
    Vector2.prototype.equals = function (v, tol) {
        if (tol === void 0) { tol = 0; }
        return (core_1.default.abs(v.x - this.x) < tol &&
            core_1.default.abs(v.y - this.y) < tol);
    };
    /**
     * Sets the length of this vector/
     * @param {number} length The new length of the vector.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.setLength = function (length) {
        return this.multiplyScalar(length / this.length());
    };
    /**
     * Computes a linear interpolation between this vector and the given vector.
     * @param {Vector2} v The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.lerp = function (v, alpha) {
        this._x += (v.x - this.x) * alpha;
        this._y += (v.y - this.y) * alpha;
        return this;
    };
    /**
     * Linearly interpolates vectors.
     * @param {Vector2} v1 The vector at alpha = 0.
     * @param {Vector2} v2 The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.lerpVectors = function (v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    };
    /**
     * Loads a vector from an array.
     * @param {number[]} array The array with values.
     * @param {number} offset The offset to start from in the array. Default is zero.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.fromArray = function (array, offset) {
        if (offset === undefined) {
            offset = 0;
        }
        this._x = array[offset];
        this._y = array[offset + 1];
        return this;
    };
    /**
     * Loads an array from this vector.
     * @param {number[]} array The array to put the values in.
     * @param {number} offset The offset to start from in the array. Default is zero.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.toArray = function (array, offset) {
        if (array === void 0) { array = []; }
        if (offset === void 0) { offset = 0; }
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    };
    /**
     * Rotates a vector by an angle.
     * @param {number} angle The angle to rotate the vector by.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.rotate = function (angle) {
        var c = core_1.default.cos(angle);
        var s = core_1.default.sin(angle);
        var x = this.x;
        var y = this.y;
        this._x = x * c - y * s;
        this._y = x * s + y * c;
        return this;
    };
    /**
     * Rotates a vector around a point by an angle.
     * @param {Vector2} center The center of rotation.
     * @param {number} angle The angle to rotate the vector by.
     * @returns {Vector2} This vector.
     */
    Vector2.prototype.rotateAround = function (center, angle) {
        var c = core_1.default.cos(angle);
        var s = core_1.default.sin(angle);
        var x = this.x - center.x;
        var y = this.y - center.y;
        this._x = x * c - y * s + center.x;
        this._y = x * s + y * c + center.y;
        return this;
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
//# sourceMappingURL=vector2.js.map