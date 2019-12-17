"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Base code from THREE.js authors below.
 * Additions by Tim Bright
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */
var vector2_1 = require("./vector2");
var utils_1 = require("./utils");
/**
 * A 2x2 matrix stored in column-major order.
 * @class Matrix2
 */
var Matrix2 = /** @class */ (function () {
    function Matrix2() {
        this.rowDimension = 2;
        this.colDimension = 2;
        this.E0 = new vector2_1.Vector2(1, 0);
        this.E1 = new vector2_1.Vector2(0, 1);
        var a = [
            1, 0,
            0, 1
        ];
        this._elements = a;
        this._tempElements = a.slice();
    }
    Matrix2.prototype.set = function (i, j, value) {
        var n = this.colDimension;
        this._elements[i + j * n] = value;
        return this;
    };
    Matrix2.prototype.get = function (i, j) {
        var n = this.colDimension;
        return this._elements[i + j * n];
    };
    /**
     * Sets the matrix values in a row-major ordered fashion.
     * @param {number} n11 Element a11.
     * @param {number} n12 Element a12.
     * @param {number} n21 Element a21.
     * @param {number} n22 Element a22.
     */
    Matrix2.prototype.setElements = function (n11, n12, n21, n22) {
        var te = this._elements;
        te[0] = n11;
        te[1] = n21;
        te[2] = n12;
        te[3] = n22;
        return this;
    };
    /**
     * Sets a row of the matrix.
     * @param {number} i The row index (0-1).
     * @param {Vector2} row The vector holding the values.
     */
    Matrix2.prototype.setRow = function (i, row) {
        var te = this._elements;
        te[i + 0] = row.x;
        te[i + 2] = row.y;
        return this;
    };
    /**
     * Sets a column of the matrix.
     * @param {number} i The row index (0-1).
     * @param {Vector2} col The vector holding the values.
     */
    Matrix2.prototype.setColumn = function (i, col) {
        var te = this._elements;
        var to = i * 2;
        te[to + 0] = col.x;
        te[to + 1] = col.y;
        return this;
    };
    /**
     * Sets the columns of the matrix.
     * @param {Vector2} c0 The first column.
     * @param {Vector2} c1 The second column.
     */
    Matrix2.prototype.setColumns = function (c0, c1) {
        var te = this._elements;
        te[0] = c0.x;
        te[1] = c0.y;
        te[2] = c1.x;
        te[3] = c1.y;
        return this;
    };
    /**
     * Sets the rows of the matrix.
     * @param {Vector2} r0 The first row.
     * @param {Vector2} r1 The second row.
     */
    Matrix2.prototype.setRows = function (r0, r1) {
        var te = this._elements;
        te[0] = r0.x;
        te[1] = r1.x;
        te[2] = r0.y;
        te[3] = r1.y;
        return this;
    };
    /**
     * Gets the row at the specified index of the matrix.
     * @param {number} i The index of the row (0-1).
     * @returns {Vector2} The vector with the row values.
     */
    Matrix2.prototype.getRow = function (i) {
        var te = this._elements;
        switch (i) {
            case 0:
                return new vector2_1.Vector2(te[0], te[2]);
            case 1:
                return new vector2_1.Vector2(te[1], te[3]);
            default:
                throw new Error('getRow(): no row defined at ' + i + '.');
        }
    };
    /**
     * Gets the column at the specified index of the matrix.
     * @param {number} i The index of the column (0-1).
     * @returns {Vector2} The vector with the column values.
     */
    Matrix2.prototype.getColumn = function (i) {
        var te = this._elements;
        switch (i) {
            case 0:
                return new vector2_1.Vector2(te[0], te[1]);
            case 1:
                return new vector2_1.Vector2(te[2], te[3]);
            default:
                throw new Error('getColumn(): no column defined at ' + i + '.');
        }
    };
    /**
     * Swaps rows in-place in the matrix. Zero is the first row.
     */
    Matrix2.prototype.swapRows = function (i, j) {
        var A = this._elements;
        if (i > 1 || j > 1) {
            throw new Error("swapRows(): row index out of bounds.");
        }
        if (i !== j) {
            var tmp = A[1];
            A[1] = A[0];
            A[0] = tmp;
            tmp = A[3];
            A[3] = A[2];
            A[2] = tmp;
        }
        return this;
    };
    /**
     * Swaps columns in-place in the matrix. Zero is the first column.
     */
    Matrix2.prototype.swapColumns = function (i, j) {
        var A = this._elements;
        if (i > 1 || j > 1) {
            throw new Error("swapRows(): row index out of bounds.");
        }
        if (i !== j) {
            var tmp = A[2];
            A[2] = A[0];
            A[0] = tmp;
            tmp = A[3];
            A[3] = A[1];
            A[1] = tmp;
        }
        return this;
    };
    /**
     * Sets the matrix as the identity matrix.
     */
    Matrix2.prototype.identity = function () {
        this.setElements(1, 0, 0, 1);
        return this;
    };
    /**
     * Clones the matrix.
     */
    Matrix2.prototype.clone = function () {
        var m = new Matrix2();
        return m.fromArray(this._elements);
    };
    /**
     * Copies the element values of the given matrix.
     * @param {Matrix2} m The given matrix.
     */
    Matrix2.prototype.copy = function (m) {
        var te = this._elements;
        var me = m._elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        return this;
    };
    /**
     * Multiplies a vector by a 2x2 matrix.
     * @param {Vector2} a The vector to transform.
     * @returns {Vector2} This vector.
     */
    Matrix2.prototype.transformVector2 = function (v) {
        var ae = this._elements;
        var a11 = ae[0];
        var a12 = ae[2];
        var a21 = ae[1];
        var a22 = ae[3];
        var x = v.x;
        var y = v.y;
        var _x = a11 * x + a12 * y;
        var _y = a21 * x + a22 * y;
        return v.set(_x, _y);
    };
    /**
     * Right-multiplies the given matrix with this one (this * m).
     * @param {Matrix2} m The given matrix.
     */
    Matrix2.prototype.multiply = function (m) {
        return this.multiplyMatrices(this, m);
    };
    /**
     * Left-multiplies the given matrix with this one (m * this).
     * @param {Matrix2} m The given matrix.
     */
    Matrix2.prototype.premultiply = function (m) {
        return this.multiplyMatrices(m, this);
    };
    /**
     * Multiplies two 2x2 matrices (A * B).
     * @param {Matrix2} a The A matrix.
     * @param {Matrix2} b The B matrix.
     */
    Matrix2.prototype.multiplyMatrices = function (a, b) {
        var ae = a._elements;
        var be = b._elements;
        var te = this._elements;
        var a11 = ae[0];
        var a12 = ae[2];
        var a21 = ae[1];
        var a22 = ae[3];
        var b11 = be[0];
        var b12 = be[2];
        var b21 = be[1];
        var b22 = be[3];
        te[0] = a11 * b11 + a12 * b21;
        te[1] = a21 * b11 + a22 * b21;
        te[2] = a11 * b12 + a12 * b22;
        te[3] = a21 * b12 + a22 * b22;
        return this;
    };
    /**
     * Scales a matrix.
     * @param {number} s The number to scale by.
     */
    Matrix2.prototype.multiplyScalar = function (s) {
        var te = this._elements;
        te[0] *= s;
        te[2] *= s;
        te[1] *= s;
        te[3] *= s;
        return this;
    };
    /**
     * Computes the determinant of the matrix.
     * @returns {number} The determinant.
     */
    Matrix2.prototype.determinant = function () {
        var te = this._elements;
        var a = te[0];
        var b = te[2];
        var c = te[1];
        var d = te[3];
        return a * d - b * c;
    };
    /**
     * Computes the inverse of the given matrix and assigns it to this matrix.
     * @param {Matrix2} matrix The given matrix.
     * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
     */
    Matrix2.prototype.getInverse = function (matrix, throwOnDegenerate) {
        var me = matrix._elements;
        var te = this._elements;
        var a = me[0];
        var b = me[2];
        var c = me[1];
        var d = me[3];
        var det = a * d - b * c;
        if (det === 0) {
            var msg = 'Matrix2.getInverse(): cannot invert matrix, determinant is 0';
            if (throwOnDegenerate === true) {
                throw new Error(msg);
            }
            else {
                console.warn(msg);
            }
            return this.identity();
        }
        var detInv = 1.0 / det;
        te[0] = d * detInv;
        te[2] = -b * detInv;
        te[1] = -c * detInv;
        te[3] = a * detInv;
        return this;
    };
    /**
     * Inverts this matrix.
     * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
     */
    Matrix2.prototype.invert = function (throwOnDegenerate) {
        if (throwOnDegenerate === void 0) { throwOnDegenerate = false; }
        return this.getInverse(this, throwOnDegenerate);
    };
    /**
     * Transposes this matrix in-place.
     */
    Matrix2.prototype.transpose = function () {
        var m = this._elements;
        var tmp = m[1];
        m[1] = m[2];
        m[2] = tmp;
        return this;
    };
    /**
     * Computes the adjugates of this matrix in-place.
     */
    Matrix2.prototype.adjugate = function () {
        return this.getAdjugate(this);
    };
    /**
     * Computes the adjugate of the given matrix and assigns it to this matrix.
     * @param {Matrix2} matrix The given matrix.
     */
    Matrix2.prototype.getAdjugate = function (matrix) {
        var me = matrix._elements;
        var a = me[0];
        var c = me[1];
        var b = me[2];
        var d = me[3];
        var te = this._elements;
        te[0] = d;
        te[1] = -c;
        te[2] = -b;
        te[3] = a;
        return this;
    };
    /**
     * Computes the trace of this matrix.
     * @returns {number} The matrix trace.
     */
    Matrix2.prototype.trace = function () {
        var te = this._elements;
        return te[0] + te[3];
    };
    /**
     * Compares the equality with a given matrix (strict).
     * @param {Matrix2} matrix The given matrix.
     */
    Matrix2.prototype.equals = function (matrix) {
        var te = this._elements;
        var me = matrix._elements;
        for (var i = 0; i < 4; i++) {
            if (te[i] !== me[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Loads values from an array into a matrix.
     * @param array The array to populate the matrix from.
     * @param offset The numeric array offset.
     */
    Matrix2.prototype.fromArray = function (array, offset) {
        if (offset === void 0) { offset = 0; }
        for (var i = 0; i < 4; i++) {
            this._elements[i] = array[i + offset];
        }
        return this;
    };
    /**
     * Loads values into an array into a matrix.
     * @param {number[]} array The array to populate the matrix values into.
     * @param {number} offset The numeric array offset.
     */
    Matrix2.prototype.toArray = function (array, offset) {
        if (array === void 0) { array = []; }
        if (offset === void 0) { offset = 0; }
        var te = this._elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        return array;
    };
    /**
     * Computes the outer product of two vectors (a*b^T).
     * @param {Vector2} a The first vector.
     * @param {Vector2} b The second vector.
     * @param {number} scalar The number to scale the matrix by (defaults to 1).
     */
    Matrix2.prototype.getOuterProduct = function (a, b, scalar) {
        var alpha = (scalar === undefined ? 1 : scalar);
        var n11 = alpha * a.x * b.x;
        var n12 = alpha * a.x * b.y;
        var n21 = alpha * a.y * b.x;
        var n22 = alpha * a.y * b.y;
        return this.setElements(n11, n12, n21, n22);
    };
    /**
     * Adds the outer product of two vectors (a*b^T) to this matrix.
     * @param {Vector2} a The first vector.
     * @param {Vector2} b The second vector.
     * @param {number} scalar The number to scale the matrix by (defaults to 1).
     */
    Matrix2.prototype.addOuterProduct = function (a, b, scalar) {
        var te = this._elements;
        var alpha = (scalar === undefined ? 1 : scalar);
        var n11 = alpha * a.x * b.x;
        var n12 = alpha * a.x * b.y;
        var n21 = alpha * a.y * b.x;
        var n22 = alpha * a.y * b.y;
        te[0] += n11;
        te[2] += n12;
        te[1] += n21;
        te[3] += n22;
        return this;
    };
    /**
     * Adds 2 matrices together and optionally scales the result.
     * @param {Matrix2} a The first matrix.
     * @param {Matrix2} b The second matrix.
     * @param {number} scalar The number to scale the result by.
     */
    Matrix2.prototype.addMatrices = function (a, b, scalar) {
        if (scalar === void 0) { scalar = 1; }
        var alpha = scalar;
        var ae = a._elements;
        var be = b._elements;
        var te = this._elements;
        var a11 = ae[0];
        var a12 = ae[2];
        var a21 = ae[1];
        var a22 = ae[3];
        var b11 = be[0];
        var b12 = be[2];
        var b21 = be[1];
        var b22 = be[3];
        te[0] = a11 + (b11 * alpha);
        te[2] = a12 + (b12 * alpha);
        te[1] = a21 + (b21 * alpha);
        te[3] = a22 + (b22 * alpha);
        return this;
    };
    /**
     * Adds a given matrix to this matrix.
     * @param {Matrix2} m The given matrix.
     */
    Matrix2.prototype.add = function (m) {
        return this.addMatrices(this, m);
    };
    /**
     * Pretty prints this matrix.
     */
    Matrix2.prototype.prettyPrint = function () {
        var tStr = this._elements.map(utils_1.formatPrintNumber);
        var matrixString = "\n    +-                -+\n    | " + tStr[0] + "  " + tStr[2] + " |\n    | " + tStr[1] + "  " + tStr[3] + " |\n    +-                -+";
        return matrixString;
    };
    Matrix2.prototype.applyFunction = function (fn) {
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
    return Matrix2;
}());
exports.Matrix2 = Matrix2;
//# sourceMappingURL=matrix2.js.map