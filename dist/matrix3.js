'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Base code from THREE.js authors below.
 * Additions by Tim Bright
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */
var core_1 = __importDefault(require("./core"));
var vector3_1 = require("./vector3");
var utils_1 = require("./utils");
var minimatrix_polyroots_1 = require("minimatrix-polyroots");
var complex_1 = require("./complex");
/**
 * A 3x3 matrix stored in column-major order.
 * @class Matrix3
 */
var Matrix3 = /** @class */ (function () {
    function Matrix3() {
        this.rowDimension = 3;
        this.colDimension = 3;
        this.E0 = new vector3_1.Vector3(1, 0, 0);
        this.E1 = new vector3_1.Vector3(0, 1, 0);
        this.E2 = new vector3_1.Vector3(0, 0, 1);
        var a = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
        this._elements = a;
        this._tempElements = a.slice();
    }
    Matrix3.prototype.set = function (i, j, value) {
        var n = this.colDimension;
        this._elements[i + j * n] = value;
        return this;
    };
    Matrix3.prototype.get = function (i, j) {
        var n = this.colDimension;
        return this._elements[i + j * n];
    };
    /**
     * Sets the matrix values in a row-major ordered fashion.
     * @param {number} n11 Element a11.
     * @param {number} n12 Element a12.
     * @param {number} n13 Element a13.
     * @param {number} n21 Element a21.
     * @param {number} n22 Element a22.
     * @param {number} n23 Element a23.
     * @param {number} n31 Element a31.
     * @param {number} n32 Element a32.
     * @param {number} n33 Element a33.
     */
    Matrix3.prototype.setElements = function (n11, n12, n13, n21, n22, n23, n31, n32, n33) {
        var te = this._elements;
        te[0] = n11;
        te[1] = n21;
        te[2] = n31;
        te[3] = n12;
        te[4] = n22;
        te[5] = n32;
        te[6] = n13;
        te[7] = n23;
        te[8] = n33;
        return this;
    };
    /**
     * Sets a row of the matrix.
     * @param {number} i The row index (0-2).
     * @param {Vector3} row The vector holding the values.
     */
    Matrix3.prototype.setRow = function (i, row) {
        var te = this._elements;
        te[i + 0] = row.x;
        te[i + 3] = row.y;
        te[i + 6] = row.z;
        return this;
    };
    /**
     * Sets a column of the matrix.
     * @param {number} i The row index (0-2).
     * @param {Vector3} col The vector holding the values.
     */
    Matrix3.prototype.setColumn = function (i, col) {
        var te = this._elements;
        var to = i * 3;
        te[to + 0] = col.x;
        te[to + 1] = col.y;
        te[to + 2] = col.z;
        return this;
    };
    /**
     * Sets the columns of the matrix.
     * @param {Vector3} c0 The first column.
     * @param {Vector3} c1 The second column.
     * @param {Vector3} c2 The third column.
     */
    Matrix3.prototype.setColumns = function (c0, c1, c2) {
        var te = this._elements;
        te[0] = c0.x;
        te[1] = c0.y;
        te[2] = c0.z;
        te[3] = c1.x;
        te[4] = c1.y;
        te[5] = c1.z;
        te[6] = c2.x;
        te[7] = c2.y;
        te[8] = c2.z;
        return this;
    };
    /**
     * Sets the rows of the matrix.
     * @param {Vector3} r0 The first row.
     * @param {Vector3} r1 The second row.
     * @param {Vector3} r2 The third row.
     */
    Matrix3.prototype.setRows = function (r0, r1, r2) {
        var te = this._elements;
        te[0] = r0.x;
        te[1] = r1.x;
        te[2] = r2.x;
        te[3] = r0.y;
        te[4] = r1.y;
        te[5] = r2.y;
        te[6] = r0.z;
        te[7] = r1.z;
        te[8] = r2.z;
        return this;
    };
    /**
     * Swaps rows in-place in the matrix. Zero is the first row.
     */
    Matrix3.prototype.swapRows = function (i, j) {
        var A = this._elements;
        var n = 3;
        if (i > n - 1 || j > n - 1) {
            throw new Error("swapRows(): row index out of bounds.");
        }
        if (i !== j) {
            for (var k = 0; k < n; ++k) {
                var offset = k * n;
                var tmp = A[i + offset];
                A[i + offset] = A[j + offset];
                A[j + offset] = tmp;
            }
        }
        return this;
    };
    /**
     * Swaps columns in-place in the matrix. Zero is the first column.
     */
    Matrix3.prototype.swapColumns = function (i, j) {
        var A = this._elements;
        var n = 3;
        if (i > n - 1 || j > n - 1) {
            throw new Error("swapColumns(): column index out of bounds.");
        }
        if (i !== j) {
            var iOffset = i * n;
            var jOffset = j * n;
            for (var k = 0; k < n; ++k) {
                var tmp = A[iOffset + k];
                A[iOffset + k] = A[jOffset + k];
                A[jOffset + k] = tmp;
            }
        }
        return this;
    };
    /**
     * Sets the matrix as the identity matrix.
     */
    Matrix3.prototype.identity = function () {
        this.setElements(1, 0, 0, 0, 1, 0, 0, 0, 1);
        return this;
    };
    /**
     * Sets this matrix as skew-symmetric based on a given vector.
     * @param {Vector3} v The given vector.
     */
    Matrix3.prototype.setSkewSymmetric = function (v) {
        var te = this._elements;
        te[0] = 0;
        te[3] = -v.z;
        te[6] = v.y;
        te[1] = v.z;
        te[4] = 0;
        te[7] = -v.x;
        te[2] = -v.y;
        te[5] = v.x;
        te[8] = 0;
        return this;
    };
    /**
     * Clones the matrix.
     * @returns {Matrix3} A new matrix with the same element values.
     */
    Matrix3.prototype.clone = function () {
        return new Matrix3().fromArray(this._elements);
    };
    /**
     * Copies the element values of the given matrix.
     * @param {Matrix3} m The given matrix.
     */
    Matrix3.prototype.copy = function (m) {
        var te = this._elements;
        var me = m._elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        te[4] = me[4];
        te[5] = me[5];
        te[6] = me[6];
        te[7] = me[7];
        te[8] = me[8];
        return this;
    };
    /**
     * Adds 2 matrices together and optionally scales the result: a + alpha * b.
     * @param {Matrix3} a The first matrix.
     * @param {Matrix3} b The second matrix.
     * @param {number} scalar The number to scale the result by.
     */
    Matrix3.prototype.addMatrices = function (a, b, scalar) {
        if (scalar === void 0) { scalar = 1; }
        var alpha = scalar;
        var ae = a._elements;
        var be = b._elements;
        var te = this._elements;
        var a11 = ae[0];
        var a12 = ae[3];
        var a13 = ae[6];
        var a21 = ae[1];
        var a22 = ae[4];
        var a23 = ae[7];
        var a31 = ae[2];
        var a32 = ae[5];
        var a33 = ae[8];
        var b11 = be[0];
        var b12 = be[3];
        var b13 = be[6];
        var b21 = be[1];
        var b22 = be[4];
        var b23 = be[7];
        var b31 = be[2];
        var b32 = be[5];
        var b33 = be[8];
        te[0] = a11 + (b11 * alpha);
        te[3] = a12 + (b12 * alpha);
        te[6] = a13 + (b13 * alpha);
        te[1] = a21 + (b21 * alpha);
        te[4] = a22 + (b22 * alpha);
        te[7] = a23 + (b23 * alpha);
        te[2] = a31 + (b31 * alpha);
        te[5] = a32 + (b32 * alpha);
        te[8] = a33 + (b33 * alpha);
        return this;
    };
    /**
     * Adds a given matrix to this matrix.
     * @param {Matrix3} m The given matrix.
     */
    Matrix3.prototype.add = function (m) {
        return this.addMatrices(this, m, 1);
    };
    /**
     * Scales a vector as a projected vector (x, y, 1) by a 3x3 matrix
     * @param {Vector2} a The vector to transform.
     * @returns {Vector2} The original vector, transformed.
     */
    Matrix3.prototype.transformVector2 = function (a) {
        var ae = this._elements;
        var a11 = ae[0];
        var a12 = ae[3];
        var a13 = ae[6];
        var a21 = ae[1];
        var a22 = ae[4];
        var a23 = ae[7];
        // const a31 = ae[ 2 ];
        // const a32 = ae[ 5 ];
        // const a33 = ae[ 8 ];
        var x = a.x;
        var y = a.y;
        var _x = a11 * x + a12 * y + a13;
        var _y = a21 * x + a22 * y + a23;
        return a.set(_x, _y);
    };
    /**
     * Multiplies a vector by a 3x3 matrix.
     * @param {Vector3} a The vector to transform.
     * @returns {Vector3} The original vector, transformed.
     */
    Matrix3.prototype.transformVector3 = function (a) {
        var ae = this._elements;
        var x = a.x;
        var y = a.y;
        var z = a.z;
        var a1 = ae[0];
        var a2 = ae[3];
        var a3 = ae[6];
        var _x = a1 * x + a2 * y + a3 * z;
        a1 = ae[1];
        a2 = ae[4];
        a3 = ae[7];
        var _y = a1 * x + a2 * y + a3 * z;
        a1 = ae[2];
        a2 = ae[5];
        a3 = ae[8];
        var _z = a1 * x + a2 * y + a3 * z;
        return a.set(_x, _y, _z);
    };
    /**
     * Right-multiplies the given matrix with this one (this * m).
     * @param {Matrix3} m The given matrix.
     */
    Matrix3.prototype.multiply = function (m) {
        return this.multiplyMatrices(this, m);
    };
    /**
     * Left-multiplies the given matrix with this one (m * this).
     * @param {Matrix3} m The given matrix.
     */
    Matrix3.prototype.premultiply = function (m) {
        return this.multiplyMatrices(m, this);
    };
    /**
     * Multiplies two 3x3 matrices (A * B).
     * @param {Matrix3} a The A matrix.
     * @param {Matrix3} b The B matrix.
     */
    Matrix3.prototype.multiplyMatrices = function (a, b) {
        var ae = a._elements;
        var be = b._elements;
        var te = this._elements;
        var a11 = ae[0];
        var a12 = ae[3];
        var a13 = ae[6];
        var a21 = ae[1];
        var a22 = ae[4];
        var a23 = ae[7];
        var a31 = ae[2];
        var a32 = ae[5];
        var a33 = ae[8];
        var b11 = be[0];
        var b12 = be[3];
        var b13 = be[6];
        var b21 = be[1];
        var b22 = be[4];
        var b23 = be[7];
        var b31 = be[2];
        var b32 = be[5];
        var b33 = be[8];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31;
        te[3] = a11 * b12 + a12 * b22 + a13 * b32;
        te[6] = a11 * b13 + a12 * b23 + a13 * b33;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31;
        te[4] = a21 * b12 + a22 * b22 + a23 * b32;
        te[7] = a21 * b13 + a22 * b23 + a23 * b33;
        te[2] = a31 * b11 + a32 * b21 + a33 * b31;
        te[5] = a31 * b12 + a32 * b22 + a33 * b32;
        te[8] = a31 * b13 + a32 * b23 + a33 * b33;
        return this;
    };
    /**
     * Scales a matrix.
     * @param {number} s The number to scale by.
     */
    Matrix3.prototype.multiplyScalar = function (s) {
        var te = this._elements;
        te[0] *= s;
        te[3] *= s;
        te[6] *= s;
        te[1] *= s;
        te[4] *= s;
        te[7] *= s;
        te[2] *= s;
        te[5] *= s;
        te[8] *= s;
        return this;
    };
    /**
     * Computes the determinant of the matrix.
     * @returns {number} The determinant.
     */
    Matrix3.prototype.determinant = function () {
        var te = this._elements;
        var a = te[0];
        var b = te[1];
        var c = te[2];
        var d = te[3];
        var e = te[4];
        var f = te[5];
        var g = te[6];
        var h = te[7];
        var i = te[8];
        return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
    };
    /**
     * Inverts this matrix.
     * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
     */
    Matrix3.prototype.invert = function (throwOnDegenerate) {
        if (throwOnDegenerate === void 0) { throwOnDegenerate = false; }
        return this.getInverse(this, throwOnDegenerate);
    };
    /**
     * Computes the adjugates of this matrix in-place.
     */
    Matrix3.prototype.adjugate = function () {
        return this.getAdjugate(this);
    };
    /**
     * Computes the adjugate of the given matrix and assigns it to this matrix.
     * @param {Matrix3} matrix The given matrix.
     */
    Matrix3.prototype.getAdjugate = function (matrix) {
        var me = matrix._elements;
        var a11 = me[0];
        var a21 = me[1];
        var a31 = me[2];
        var a12 = me[3];
        var a22 = me[4];
        var a32 = me[5];
        var a13 = me[6];
        var a23 = me[7];
        var a33 = me[8];
        var t11 = +(a22 * a33 - a23 * a32);
        var t12 = -(a12 * a33 - a13 * a32);
        var t13 = +(a12 * a23 - a13 * a22);
        var t21 = -(a21 * a33 - a23 * a31);
        var t22 = +(a11 * a33 - a13 * a31);
        var t23 = -(a11 * a23 - a13 * a21);
        var t31 = +(a21 * a32 - a22 * a31);
        var t32 = -(a11 * a32 - a12 * a31);
        var t33 = +(a11 * a22 - a12 * a21);
        var te = this._elements;
        te[0] = t11;
        te[1] = t21;
        te[2] = t31;
        te[3] = t12;
        te[4] = t22;
        te[5] = t32;
        te[6] = t13;
        te[7] = t23;
        te[8] = t33;
        return this;
    };
    /**
     * Computes the inverse of the given matrix and assigns it to this matrix.
     * @param {Matrix3} matrix The given matrix.
     * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
     */
    Matrix3.prototype.getInverse = function (matrix, throwOnDegenerate, singularTol) {
        if (singularTol === void 0) { singularTol = 1e-14; }
        var det = matrix.determinant();
        if (core_1.default.abs(det) <= singularTol) {
            var msg = "Matrix3.getInverse(): matrix is degenerate.";
            if (throwOnDegenerate) {
                throw new Error(msg);
            }
            else {
                console.warn(msg);
            }
        }
        return matrix.adjugate().multiplyScalar(1.0 / det);
    };
    /**
     * Transposes this matrix in-place.
     */
    Matrix3.prototype.transpose = function () {
        var tmp;
        var m = this._elements;
        tmp = m[1];
        m[1] = m[3];
        m[3] = tmp;
        tmp = m[2];
        m[2] = m[6];
        m[6] = tmp;
        tmp = m[5];
        m[5] = m[7];
        m[7] = tmp;
        return this;
    };
    /**
     * Computes the trace of this matrix.
     * @returns {number} The matrix trace.
     */
    Matrix3.prototype.trace = function () {
        var me = this._elements;
        var n11 = me[0];
        var n22 = me[4];
        var n33 = me[8];
        return n11 + n22 + n33;
    };
    /**
     * Compares the equality with a given matrix (strict).
     * @param {Matrix3} matrix The given matrix.
     */
    Matrix3.prototype.equals = function (matrix) {
        var te = this._elements;
        var me = matrix._elements;
        for (var i = 0; i < 9; i++) {
            if (te[i] !== me[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Loads values from an array into a matrix.
     * @param {number[]} array The array to populate the matrix from.
     * @param {number} offset The numeric array offset.
     */
    Matrix3.prototype.fromArray = function (array, offset) {
        if (offset === void 0) { offset = 0; }
        for (var i = 0; i < 9; i++) {
            this._elements[i] = array[i + offset];
        }
        return this;
    };
    /**
     * Loads values into an array into a matrix.
     * @param {number[]} array The array to populate the matrix values into.
     * @param {number} offset The numeric array offset.
     */
    Matrix3.prototype.toArray = function (array, offset) {
        if (array === void 0) { array = []; }
        if (offset === void 0) { offset = 0; }
        var te = this._elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];
        return array;
    };
    /**
     * Gets the eigenvalues of the matrix.
     * @returns {Object} A0 is the real eigenvalue, A1 and A2 are real coefficients, B1 and B2 are complex coefficients.
     */
    Matrix3.prototype.getEigenvalues = function () {
        // Bad way of doing this!
        // TODO: Find better way
        var je = this._elements;
        var a = je[0];
        var b = je[1];
        var c = je[2];
        var d = je[3];
        var e = je[4];
        var f = je[5];
        var g = je[6];
        var h = je[7];
        var i = je[8];
        var A = 1;
        var B = -(a + e + i);
        var C = a * e + a * i - d * b - g * c + e * i - h * f;
        var D = -(a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g);
        var roots = minimatrix_polyroots_1.getCubicRoots(A, B, C, D);
        return roots.map(function (v) { return new complex_1.Complex(v.real, v.imag); });
    };
    /**
     * Computes the outer product of two vectors (a*b^T).
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @param {number} scalar The number to scale the matrix by (defaults to 1).
     */
    Matrix3.prototype.getOuterProduct = function (a, b, scalar) {
        // computes alpha * (ab^T)
        var alpha = (scalar === undefined ? 1 : scalar);
        var n11 = alpha * a.x * b.x;
        var n12 = alpha * a.x * b.y;
        var n13 = alpha * a.x * b.z;
        var n21 = alpha * a.y * b.x;
        var n22 = alpha * a.y * b.y;
        var n23 = alpha * a.y * b.z;
        var n31 = alpha * a.z * b.x;
        var n32 = alpha * a.z * b.y;
        var n33 = alpha * a.z * b.z;
        return this.setElements(n11, n12, n13, n21, n22, n23, n31, n32, n33);
    };
    /**
     * Adds the outer product of two vectors (a*b^T) to this matrix.
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @param {number} scalar The number to scale the matrix by (defaults to 1).
     */
    Matrix3.prototype.addOuterProduct = function (a, b, scalar) {
        // computes [this + alpha * (ab^T)]
        var te = this._elements;
        var alpha = (scalar === undefined ? 1 : scalar);
        var n11 = alpha * a.x * b.x;
        var n12 = alpha * a.x * b.y;
        var n13 = alpha * a.x * b.z;
        var n21 = alpha * a.y * b.x;
        var n22 = alpha * a.y * b.y;
        var n23 = alpha * a.y * b.z;
        var n31 = alpha * a.z * b.x;
        var n32 = alpha * a.z * b.y;
        var n33 = alpha * a.z * b.z;
        te[0] += n11;
        te[1] += n21;
        te[2] += n31;
        te[3] += n12;
        te[4] += n22;
        te[5] += n32;
        te[6] += n13;
        te[7] += n23;
        te[8] += n33;
        return this;
    };
    /**
     * Gets the row at the specified index of the matrix.
     * @param {number} i The index of the row (0-2).
     * @returns {Vector3} The vector with the row values.
     */
    Matrix3.prototype.getRow = function (i) {
        var te = this._elements;
        switch (i) {
            case 0:
                return new vector3_1.Vector3(te[0], te[3], te[6]);
            case 1:
                return new vector3_1.Vector3(te[1], te[4], te[7]);
            case 2:
                return new vector3_1.Vector3(te[2], te[5], te[8]);
            default:
                throw new Error('getRow(): no row defined at ' + i + '.');
        }
    };
    /**
     * Gets the column at the specified index of the matrix.
     * @param {number} i The index of the column (0-2).
     * @returns {Vector3} The vector with the column values.
     */
    Matrix3.prototype.getColumn = function (i) {
        var te = this._elements;
        switch (i) {
            case 0:
                return new vector3_1.Vector3(te[0], te[1], te[2]);
            case 1:
                return new vector3_1.Vector3(te[3], te[4], te[5]);
            case 2:
                return new vector3_1.Vector3(te[6], te[7], te[8]);
            default:
                throw new Error('getColumn(): no column defined at ' + i + '.');
        }
    };
    /**
     * Pretty prints this matrix.
     */
    Matrix3.prototype.prettyPrint = function () {
        var tStr = this._elements.map(utils_1.formatPrintNumber);
        var matrixString = "\n    +-                         -+\n    | " + tStr[0] + "  " + tStr[3] + "  " + tStr[6] + " |\n    | " + tStr[1] + "  " + tStr[4] + "  " + tStr[7] + " |\n    | " + tStr[2] + "  " + tStr[5] + "  " + tStr[8] + " |\n    +-                         -+";
        return matrixString;
    };
    Matrix3.prototype.applyFunction = function (fn) {
        var ee = this._elements;
        var te = this._tempElements;
        var n = ee.length;
        for (var i = 0; i < n; ++i) {
            te[i] = ee[i];
        }
        fn.call(null, te);
        for (var i = 0; i < n; ++i) {
            ee[i] = te[i];
        }
    };
    return Matrix3;
}());
exports.Matrix3 = Matrix3;
//# sourceMappingURL=matrix3.js.map