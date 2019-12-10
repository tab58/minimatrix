"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mathProps = [
    "E",
    "LN10",
    "LN2",
    "LOG2E",
    "LOG10E",
    "PI",
    "SQRT1_2",
    "SQRT2",
    "abs",
    "acos",
    "acosh",
    "asin",
    "asinh",
    "atan",
    "atan2",
    "atanh",
    "cbrt",
    "ceil",
    "clz32",
    "cos",
    "cosh",
    "expm1",
    "floor",
    "fround",
    "hypot",
    "imul",
    "log",
    "log1p",
    "log2",
    "log10",
    "max",
    "min",
    "pow",
    "random",
    "round",
    "sin",
    "sinh",
    "sqrt",
    "tan",
    "tanh",
    "trunc"
];
const _Math = mathProps.reduce((acc, prop) => {
    acc[prop] = Math[prop];
    return acc;
}, {});
const core = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    PI2: 2 * Math.PI,
    clamp: function (value, min, max) {
        return Math.max(min, _Math.min(max, value));
    },
    hypot: function (w, z) {
        // rewritten to deal with overflow/underflow
        const a = w;
        const b = z;
        if (a === 0 && b === 0) {
            return 0;
        }
        const x = _Math.abs(a);
        const y = _Math.abs(b);
        const u = _Math.max(x, y);
        const t = _Math.min(x, y) / u;
        return u * _Math.sqrt(1 + t * t);
    },
    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation
    euclideanModulo: function (n, m) {
        return ((n % m) + m) % m;
    },
    // Linear mapping from range <a1, a2> to range <b1, b2>
    mapLinear: function (x, a1, a2, b1, b2) {
        return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
    },
    // https://en.wikipedia.org/wiki/Linear_interpolation
    lerp: function (x, y, t) {
        return (1.0 - t) * x + t * y;
    },
    // http://en.wikipedia.org/wiki/Smoothstep
    smoothstep: function (x, min, max) {
        if (x <= min) {
            return 0;
        }
        if (x >= max) {
            return 1;
        }
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x);
    },
    smootherstep: function (x, min, max) {
        if (x <= min) {
            return 0;
        }
        if (x >= max) {
            return 1;
        }
        x = (x - min) / (max - min);
        return x * x * x * (x * (x * 6 - 15) + 10);
    },
    // Random integer from <low, high> interval
    randInt: function (low, high) {
        return low + _Math.floor(_Math.random() * (high - low + 1));
    },
    // Random float from <low, high> interval
    randFloat: function (low, high) {
        return low + _Math.random() * (high - low);
    },
    // Random float from <-range/2, range/2> interval
    randFloatSpread: function (range) {
        return range * (0.5 - _Math.random());
    },
    degToRad: function (degrees) {
        return degrees * core.DEG2RAD;
    },
    radToDeg: function (radians) {
        return radians * core.RAD2DEG;
    },
    isPowerOfTwo: function (value) {
        return (value & (value - 1)) === 0 && value !== 0;
    },
    nearestPowerOfTwo: function (value) {
        return _Math.pow(2, _Math.round(_Math.log(value) / _Math.LN2));
    },
    nextPowerOfTwo: (value) => {
        value--;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value++;
        return value;
    }
};
exports.default = Object.assign(_Math, core);
//# sourceMappingURL=core.js.map