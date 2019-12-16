"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector2_1 = require("./vector2");
var vector3_1 = require("./vector3");
var vector4_1 = require("./vector4");
/** Helpers for common linear algebra functions. */
var LinAlgHelpers = /** @class */ (function () {
    function LinAlgHelpers() {
    }
    LinAlgHelpers.getOuterProduct = function (v) {
        var d = v.dimension;
        switch (d) {
            case 2:
                return v.getOuterProduct();
            case 3:
                return v.getOuterProduct();
            case 4:
                return v.getOuterProduct();
            default:
                throw new Error("LinAlgHelpers.getOuterProduct(): vector is not Vector2, Vector3, or Vector4.");
        }
    };
    LinAlgHelpers.getRow = function (m, i) {
        var d = m.rowDimension;
        switch (d) {
            case 2:
                return m.getRow(i);
            case 3:
                return m.getRow(i);
            case 4:
                return m.getRow(i);
            default:
                throw new Error("LinAlgHelpers.getRow(): row is not Vector2, Vector3, or Vector4.");
        }
    };
    LinAlgHelpers.getColumn = function (m, i) {
        var d = m.colDimension;
        switch (d) {
            case 2:
                return m.getColumn(i);
            case 3:
                return m.getColumn(i);
            case 4:
                return m.getColumn(i);
            default:
                throw new Error("LinAlgHelpers.getColumn(): column is not Vector2, Vector3, or Vector4.");
        }
    };
    LinAlgHelpers.vectorFromValues = function (a, n, offset) {
        if (offset === void 0) { offset = 0; }
        if (n === 2) {
            var v0 = a[offset];
            var v1 = a[offset + 1];
            return new vector2_1.Vector2(v0, v1);
        }
        else if (n === 3) {
            var v0 = a[offset];
            var v1 = a[offset + 1];
            var v2 = a[offset + 2];
            return new vector3_1.Vector3(v0, v1, v2);
        }
        else if (n === 4) {
            var v0 = a[offset];
            var v1 = a[offset + 1];
            var v2 = a[offset + 2];
            var v3 = a[offset + 3];
            return new vector4_1.Vector4(v0, v1, v2, v3);
        }
        else {
            throw new Error("LinAlgHelpers.vectorFromValues(): vector size is not Vector2, Vector3, or Vector4.");
        }
    };
    return LinAlgHelpers;
}());
exports.LinAlgHelpers = LinAlgHelpers;
//# sourceMappingURL=helpers.js.map