/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// make native implementation the default
const _Math = {};
const mathProps = Object.getOwnPropertyNames(Math);
mathProps.forEach((prop) => { _Math[prop] = Math[prop]; });

// and allow for better implementations, like @stdlib-js
// Object.assign(_Math, { /* something with better math functions */});

Object.assign(_Math, {
  DEG2RAD: _Math.PI / 180,
  RAD2DEG: 180 / _Math.PI,

  clamp: function (value, min, max) {
    return _Math.max(min, _Math.min(max, value));
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
    return degrees * _Math.DEG2RAD;
  },

  radToDeg: function (radians) {
    return radians * _Math.RAD2DEG;
  },

  isPowerOfTwo: function (value) {
    return (value & (value - 1)) === 0 && value !== 0;
  },

  nearestPowerOfTwo: function (value) {
    return _Math.pow(2, _Math.round(_Math.log(value) / _Math.LN2));
  },

  nextPowerOfTwo: function (value) {
    value--;
    value |= value >> 1;
    value |= value >> 2;
    value |= value >> 4;
    value |= value >> 8;
    value |= value >> 16;
    value++;
    return value;
  }
});

module.exports = _Math;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

const CompareFunctions = {
  DEFAULT_TOLERANCE: 1e-14,
  isZero: function isZero (x, eps) {
    return (Math.abs(x) < eps);
  },
  isGTZero: function isGTZero (x, eps) {
    return (x >= eps);
  },
  isLTZero: function isGTZero (x, eps) {
    return (x <= -eps);
  },
  isEqual: function isEqual (x, y, eps) {
    return CompareFunctions.isZero(x - y, eps);
  },
  vectorLengthsAreEqual: function (x, y, eps) {
    return CompareFunctions.isZero(x.length() - y.length(), eps);
  },
  vector2AreEqual: function (x, y, eps) {
    return (CompareFunctions.isZero(x.x - y.x, eps) &&
      CompareFunctions.isZero(x.y - y.y, eps));
  },
  vector3AreEqual: function (x, y, eps) {
    return (CompareFunctions.isZero(x.x - y.x, eps) &&
      CompareFunctions.isZero(x.y - y.y, eps) &&
      CompareFunctions.isZero(x.z - y.z, eps));
  },
  selectDistinctValues: function selectDistinctValues (args, tol) {
    const uniqueValues = [];
    let i;
    let j;
    let n = args.length;
    for (i = 0; i < n; ++i) {
      const arg = args[i];
      let isNotUnique = false;
      for (j = 0; j < uniqueValues.length; ++j) {
        isNotUnique = isNotUnique || CompareFunctions.isEqual(arg, uniqueValues[j], tol);
      }
      if (!isNotUnique) {
        uniqueValues.push(arg);
      }
    }
    return uniqueValues;
  },
  selectDistinctVector2: function selectDistinctVector3 (args, tol) {
    const TOLERANCE = (tol === undefined ? CompareFunctions.DEFAULT_TOLERANCE : tol);
    const uniqueValues = [];
    let i;
    let n = args.length;
    for (i = 0; i < n; ++i) {
      const arg = args[i];
      if (arg.isVector2 === undefined) {
        throw new Error('selectDistinctVector2: argument not a Vector2.');
      }
      const vec2AreEqual = Utils.vector2AreEqual;
      if (!uniqueValues.reduce((acc, uniqueVal) => acc || vec2AreEqual(arg, uniqueVal, TOLERANCE), false)) {
        uniqueValues.push(arg);
      }
    }
    return uniqueValues;
  },
  selectDistinctVector3: function selectDistinctVector3 (args, tol) {
    const TOLERANCE = (tol === undefined ? CompareFunctions.DEFAULT_TOLERANCE : tol);
    const uniqueValues = [];
    let i;
    let n = args.length;
    for (i = 0; i < n; ++i) {
      const arg = args[i];
      if (arg.isVector3 === undefined) {
        throw new Error('selectDistinctVector2: argument not a Vector2.');
      }
      const vec3AreEqual = CompareFunctions.vector3AreEqual;
      if (!uniqueValues.reduce((acc, uniqueVal) => acc || vec3AreEqual(arg, uniqueVal, TOLERANCE), false)) {
        uniqueValues.push(arg);
      }
    }
    return uniqueValues;
  }
};

module.exports = CompareFunctions;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Utils = __webpack_require__(8);

/*
 *   Base code from THREE.js authors below.
 *   Additions by Tim Bright
 */

/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */

function Matrix2 () {
  this.elements = [
    1, 0,
    0, 1
  ];
}

Object.assign(Matrix2.prototype, {
  isMatrix2: true,

  // column-major
  set: function (n11, n12, n21, n22) {
    const te = this.elements;
    te[ 0 ] = n11; te[ 1 ] = n21;
    te[ 2 ] = n12; te[ 3 ] = n22;
    return this;
  },

  identity: function () {
    this.set(
      1, 0,
      0, 1
    );
    return this;
  },

  clone: function () {
    return new this.constructor().fromArray(this.elements);
  },

  copy: function (m) {
    const te = this.elements;
    const me = m.elements;
    te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ];
    te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
    return this;
  },

  multiply: function (m) {
    return this.multiplyMatrices(this, m);
  },

  premultiply: function (m) {
    return this.multiplyMatrices(m, this);
  },

  multiplyMatrices: function (a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;

    const a11 = ae[ 0 ];
    const a12 = ae[ 2 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 3 ];

    const b11 = be[ 0 ];
    const b12 = be[ 2 ];
    const b21 = be[ 1 ];
    const b22 = be[ 3 ];

    te[ 0 ] = a11 * b11 + a12 * b21;
    te[ 1 ] = a21 * b11 + a22 * b21;
    te[ 2 ] = a11 * b12 + a12 * b22;
    te[ 3 ] = a21 * b12 + a22 * b22;

    return this;
  },

  multiplyScalar: function (s) {
    const te = this.elements;
    te[ 0 ] *= s; te[ 2 ] *= s;
    te[ 1 ] *= s; te[ 3 ] *= s;
    return this;
  },

  determinant: function () {
    const te = this.elements;
    const a = te[ 0 ];
    const b = te[ 2 ];
    const c = te[ 1 ];
    const d = te[ 3 ];
    return a * d - b * c;
  },

  getInverse: function (matrix, throwOnDegenerate) {
    const me = matrix.elements;
    const te = this.elements;
    const a = me[ 0 ];
    const b = me[ 2 ];
    const c = me[ 1 ];
    const d = me[ 3 ];

    const det = a * d - b * c;

    if (det === 0) {
      const msg = 'Matrix2.getInverse(): cannot invert matrix, determinant is 0';
      if (throwOnDegenerate === true) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }
      return this.identity();
    }

    const detInv = 1.0 / det;
    te[ 0 ] = d * detInv;
    te[ 2 ] = -b * detInv;
    te[ 1 ] = -c * detInv;
    te[ 3 ] = a * detInv;

    return this;
  },

  invert: function (throwOnDegenerate) {
    return this.getInverse(this, throwOnDegenerate);
  },

  transpose: function () {
    const m = this.elements;

    let tmp = m[ 1 ];
    m[ 1 ] = m[ 2 ];
    m[ 2 ] = tmp;
    return this;
  },

  equals: function (matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 4; i++) {
      if (te[i] !== me[i]) {
        return false;
      }
    }
    return true;
  },

  fromArray: function (array, offset) {
    if (offset === undefined) {
      offset = 0;
    }
    for (let i = 0; i < 4; i++) {
      this.elements[ i ] = array[i + offset];
    }
    return this;
  },

  toArray: function (array, offset) {
    if (array === undefined) {
      array = [];
    }
    if (offset === undefined) {
      offset = 0;
    }

    const te = this.elements;

    array[ offset ] = te[ 0 ];
    array[ offset + 1 ] = te[ 1 ];
    array[ offset + 2 ] = te[ 2 ];
    array[ offset + 3 ] = te[ 3 ];

    return array;
  },

  getOuterProduct: function (a, b, scalar) {
    const alpha = (scalar === undefined ? 1 : scalar);
    const n11 = alpha * a.x * b.x;
    const n12 = alpha * a.x * b.y;
    const n21 = alpha * a.y * b.x;
    const n22 = alpha * a.y * b.y;
    return this.set(n11, n12, n21, n22);
  },

  addOuterProduct: function (a, b, scalar) {
    const te = this.elements;
    const alpha = (scalar === undefined ? 1 : scalar);
    const n11 = alpha * a.x * b.x;
    const n12 = alpha * a.x * b.y;
    const n21 = alpha * a.y * b.x;
    const n22 = alpha * a.y * b.y;
    te[ 0 ] += n11;
    te[ 2 ] += n12;
    te[ 1 ] += n21;
    te[ 3 ] += n22;
    return this;
  },

  addMatrices: function (a, b, scalar) {
    const alpha = (scalar === undefined ? 1 : scalar);
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;

    const a11 = ae[ 0 ];
    const a12 = ae[ 2 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 3 ];

    const b11 = be[ 0 ];
    const b12 = be[ 2 ];
    const b21 = be[ 1 ];
    const b22 = be[ 3 ];

    te[ 0 ] = a11 + (b11 * alpha);
    te[ 2 ] = a12 + (b12 * alpha);
    te[ 1 ] = a21 + (b21 * alpha);
    te[ 3 ] = a22 + (b22 * alpha);

    return this;
  },

  add: function (m) {
    return this.addMatrices(this, m);
  },

  prettyPrint: function () {
    return Utils.printMatrix2;
  }
});

module.exports = Matrix2;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const _Math = __webpack_require__(0);
const Compare = __webpack_require__(1);
const TOLERANCE = Compare.DEFAULT_TOLERANCE;

const helpers = {
  // Based on method from http://web.cs.iastate.edu/~cs577/handouts/polyroots.pdf
  getRootsOfMonicCubic: function (p, q, r) {
    // reduce to y^3 + ay + b = 0
    const a = (3 * q - p * p) / 3;
    const b = (2 * p * p * p - 9 * p * q + 27 * r) / 27;

    // check discriminant
    const disc = (b * b) / 4 + (a * a * a) / 27;
    if (Compare.isZero(disc, TOLERANCE)) {
      // three roots, one with multiplicity 2 or 3
      if (Compare.isZero(b, TOLERANCE)) {
        // roots are all 0
        return [
          -p / 3
        ];
      } else if (b > 0) {
        return [
          -2 * _Math.sqrt(-a / 3) - (p / 3),
          _Math.sqrt(-a / 3) - (p / 3)
        ];
      } else { // b < 0
        return [
          2 * _Math.sqrt(-a / 3) - (p / 3),
          -1 * _Math.sqrt(-a / 3) - (p / 3)
        ];
      }
    } else if (disc > 0) {
      // one real root and a complex conjugate pair
      let innerA = -b / 2 + _Math.sqrt(disc);
      let innerB = -b / 2 - _Math.sqrt(disc);
      const A = (innerA < 0 ? -_Math.pow(-innerA, 1 / 3) : _Math.pow(innerA, 1 / 3));
      const B = (innerB < 0 ? -_Math.pow(-innerB, 1 / 3) : _Math.pow(innerB, 1 / 3));
      return [
        (A + B) - (p / 3)
      ];
    } else { // disc < 0
      const J = ((b * b) / 4) / (-(a * a * a) / 27);
      const cosPhi = _Math.sqrt(J);
      const phi = -_Math.acos((b > 0 ? -cosPhi : cosPhi));
      const angles = [
        phi,
        phi + 2 * _Math.PI,
        phi + 4 * _Math.PI
      ];
      return angles.map(angle => 2 * _Math.sqrt(-a / 3) * _Math.cos(angle / 3) - (p / 3));
    }
  }
};

const Polynomial = {
  getRealQuadraticRoots: function (a, b, c) {
    const disc = b * b - 4 * a * c;
    const Q =  -b / (2 * a);
    if (Compare.isZero(disc, TOLERANCE)) {
      return [ Q ];
    } else if (Compare.isLTZero(disc, TOLERANCE)) {
      return [];
    } else {
      const S = _Math.sqrt(disc);
      return [
        Q + (S / (2 * a)),
        Q - (S / (2 * a))
      ];
    }
  },
  // solves for roots of ax^2 + bx^2 + cx + d
  getRealCubicRoots: function (a, b, c, d) {
    // reduce to x^3 + px^2 + qx + r = 0
    const p = b / a;
    const q = c / a;
    const r = d / a;
    return helpers.getRootsOfMonicCubic(p, q, r);
  }
};

module.exports = Polynomial;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 *   Base code from THREE.js authors below.
 *   Additions by Tim Bright
 */

const _Math = __webpack_require__(0);
const Compare = __webpack_require__(1);
// const Matrix3 = require('./matrix3.js');
// const Quaternion = require('./quaternion.js');

/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

function Vector3 (x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

Object.assign(Vector3.prototype, {
  isVector3: true,

  set: function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  },

  setScalar: function (scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    return this;
  },

  setX: function (x) {
    this.x = x;
    return this;
  },

  setY: function (y) {
    this.y = y;
    return this;
  },

  setZ: function (z) {
    this.z = z;
    return this;
  },

  setComponent: function (index, value) {
    switch (index) {
      case 0: this.x = value; break;
      case 1: this.y = value; break;
      case 2: this.z = value; break;
      default: throw new Error('index is out of range: ' + index);
    }
    return this;
  },

  getComponent: function (index) {
    switch (index) {
      case 0: return this.x;
      case 1: return this.y;
      case 2: return this.z;
      default: throw new Error('index is out of range: ' + index);
    }
  },

  clone: function () {
    return new this.constructor(this.x, this.y, this.z);
  },

  copy: function (v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  },

  add: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
      return this.addVectors(v, w);
    }
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  },

  addScalar: function (s) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  },

  addVectors: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
  },

  addScaledVector: function (v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    return this;
  },

  sub: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
      return this.subVectors(v, w);
    }
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  },

  subScalar: function (s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
  },

  subVectors: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  },

  multiply: function (v, w) {
    if (w !== undefined) {
      console.warn('Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
      return this.multiplyVectors(v, w);
    }
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  },

  multiplyMatrix3: function (a) {
    if (!a || !a.isMatrix3) {
      console.warn('Vector3: Matrix is not a Matrix3 in .multiplyMatrix3().');
    }
    const ae = a.elements;
    const x = this.x;
    const y = this.y;
    const z = this.z;

    let a1 = ae[ 0 ];
    let a2 = ae[ 3 ];
    let a3 = ae[ 6 ];
    this.x = a1 * x + a2 * y + a3 * z;

    a1 = ae[ 1 ];
    a2 = ae[ 4 ];
    a3 = ae[ 7 ];
    this.y = a1 * x + a2 * y + a3 * z;

    a1 = ae[ 2 ];
    a2 = ae[ 5 ];
    a3 = ae[ 8 ];
    this.z = a1 * x + a2 * y + a3 * z;
    return this;
  },

  multiplyScalar: function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  },

  multiplyVectors: function (a, b) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this;
  },

  applyMatrix3: function (m) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const e = m.elements;
    this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
    this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
    this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;
    return this;
  },

  divide: function (v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  },

  divideScalar: function (scalar) {
    return this.multiplyScalar(1.0 / scalar);
  },

  min: function (v) {
    this.x = _Math.min(this.x, v.x);
    this.y = _Math.min(this.y, v.y);
    this.z = _Math.min(this.z, v.z);
    return this;
  },

  max: function (v) {
    this.x = _Math.max(this.x, v.x);
    this.y = _Math.max(this.y, v.y);
    this.z = _Math.max(this.z, v.z);
    return this;
  },

  clamp: function (min, max) {
    // This function assumes min < max, if this assumption isn't true it will not operate correctly
    this.x = _Math.max(min.x, _Math.min(max.x, this.x));
    this.y = _Math.max(min.y, _Math.min(max.y, this.y));
    this.z = _Math.max(min.z, _Math.min(max.z, this.z));
    return this;
  },

  clampScalar: (function () {
    const min = new Vector3();
    const max = new Vector3();
    return function clampScalar (minVal, maxVal) {
      min.set(minVal, minVal, minVal);
      max.set(maxVal, maxVal, maxVal);
      return this.clamp(min, max);
    };
  }()),

  clampLength: function (min, max) {
    const length = this.length();
    return this.multiplyScalar(_Math.max(min, _Math.min(max, length)) / length);
  },

  floor: function () {
    this.x = _Math.floor(this.x);
    this.y = _Math.floor(this.y);
    this.z = _Math.floor(this.z);
    return this;
  },

  ceil: function () {
    this.x = _Math.ceil(this.x);
    this.y = _Math.ceil(this.y);
    this.z = _Math.ceil(this.z);
    return this;
  },

  round: function () {
    this.x = _Math.round(this.x);
    this.y = _Math.round(this.y);
    this.z = _Math.round(this.z);
    return this;
  },

  roundToZero: function () {
    this.x = (this.x < 0) ? _Math.ceil(this.x) : _Math.floor(this.x);
    this.y = (this.y < 0) ? _Math.ceil(this.y) : _Math.floor(this.y);
    this.z = (this.z < 0) ? _Math.ceil(this.z) : _Math.floor(this.z);
    return this;
  },

  negate: function () {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  },

  dot: function (v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },

  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },

  length: function () {
    return _Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },

  lengthManhattan: function () {
    return _Math.abs(this.x) + _Math.abs(this.y) + _Math.abs(this.z);
  },

  normalize: function () {
    return this.divideScalar(this.length());
  },

  setLength: function (length) {
    return this.multiplyScalar(length / this.length());
  },

  lerp: function (v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    return this;
  },

  lerpVectors: function (v1, v2, alpha) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  },

  cross: function (v) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    this.x = y * v.z - z * v.y;
    this.y = z * v.x - x * v.z;
    this.z = x * v.y - y * v.x;
    return this;
  },

  crossVectors: function (a, b) {
    const ax = a.x;
    const ay = a.y;
    const az = a.z;
    const bx = b.x;
    const by = b.y;
    const bz = b.z;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  },

  projectOnVector: function (vector) {
    const scalar = vector.dot(this) / vector.lengthSq();
    return this.copy(vector).multiplyScalar(scalar);
  },

  projectOnPlane: (function () {
    const v1 = new Vector3();
    return function projectOnPlane (planeNormal) {
      v1.copy(this).projectOnVector(planeNormal);
      return this.sub(v1);
    };
  }()),

  thresholdValuesToZero: function clampToZero(tol) {
    this.x = (_Math.abs(this.x) < tol ? 0 : this.x);
    this.y = (_Math.abs(this.y) < tol ? 0 : this.y);
    this.z = (_Math.abs(this.z) < tol ? 0 : this.z);
    return this;
  },

  reflect: (function () {
    // reflect incident vector off plane orthogonal to normal
    // normal is assumed to have unit length
    const v1 = new Vector3();
    return function reflect (normal) {
      return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
    };
  }()),

  angleTo: function (v) {
    const theta = this.dot(v) / (_Math.sqrt(this.lengthSq() * v.lengthSq()));
    // clamp, to handle numerical problems
    return _Math.acos(Compare.clamp(theta, -1, 1));
  },

  distanceTo: function (v) {
    return _Math.sqrt(this.distanceToSquared(v));
  },

  distanceToSquared: function (v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  },

  distanceToManhattan: function (v) {
    return _Math.abs(this.x - v.x) + _Math.abs(this.y - v.y) + _Math.abs(this.z - v.z);
  },

  equals: function (v) {
    return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
  },

  fromArray: function (array, offset) {
    if (offset === undefined) {
      offset = 0;
    }
    this.x = array[ offset ];
    this.y = array[ offset + 1 ];
    this.z = array[ offset + 2 ];
    return this;
  },

  toArray: function (array, offset) {
    if (array === undefined) {
      array = [];
    }
    if (offset === undefined) {
      offset = 0;
    }
    array[ offset ] = this.x;
    array[ offset + 1 ] = this.y;
    array[ offset + 2 ] = this.z;
    return array;
  },

  fromBufferAttribute: function (attribute, index, offset) {
    if (offset !== undefined) {
      console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');
    }
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    this.z = attribute.getZ(index);
    return this;
  }
});

module.exports = Vector3;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 *   Base code from THREE.js authors below.
 *   Additions by Tim Bright
 */

const _Math = __webpack_require__(0);

/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

function Vector2 (x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Object.assign(Vector2.prototype, {
  isVector2: true,
  set: function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  },

  setScalar: function (scalar) {
    this.x = scalar;
    this.y = scalar;
    return this;
  },

  setX: function (x) {
    this.x = x;
    return this;
  },

  setY: function (y) {
    this.y = y;
    return this;
  },

  clone: function () {
    return new this.constructor(this.x, this.y);
  },

  copy: function (v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  },

  add: function (v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  },

  addScalar: function (s) {
    this.x += s;
    this.y += s;
    return this;
  },

  addVectors: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  },

  addScaledVector: function (v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    return this;
  },

  sub: function (v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  },

  subScalar: function (s) {
    this.x -= s;
    this.y -= s;
    return this;
  },

  subVectors: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  },

  multiply: function (v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  },

  multiplyMatrix2: function (a) {
    const ae = a.elements;
    const a11 = ae[ 0 ];
    const a12 = ae[ 2 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 3 ];
    const x = this.x;
    const y = this.y;
    this.x = a11 * x + a12 * y;
    this.y = a21 * x + a22 * y;
    return this;
  },

  multiplyMatrix3: function (a) {
    const ae = a.elements;
    const a11 = ae[ 0 ];
    const a12 = ae[ 3 ];
    const a13 = ae[ 6 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 4 ];
    const a23 = ae[ 7 ];
    // const a31 = ae[ 2 ];
    // const a32 = ae[ 5 ];
    // const a33 = ae[ 8 ];
    const x = this.x;
    const y = this.y;
    this.x = a11 * x + a12 * y + a13;
    this.y = a21 * x + a22 * y + a23;
    return this;
  },

  multiplyScalar: function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  },

  divide: function (v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  },

  divideScalar: function (scalar) {
    return this.multiplyScalar(1.0 / scalar);
  },

  min: function (v) {
    this.x = _Math.min(this.x, v.x);
    this.y = _Math.min(this.y, v.y);
    return this;
  },

  max: function (v) {
    this.x = _Math.max(this.x, v.x);
    this.y = _Math.max(this.y, v.y);
    return this;
  },

  clamp: function (min, max) {
    // This function assumes min < max, if this assumption isn't true it will not operate correctly
    this.x = _Math.max(min.x, _Math.min(max.x, this.x));
    this.y = _Math.max(min.y, _Math.min(max.y, this.y));
    return this;
  },

  clampScalar: (function () {
    const min = new Vector2();
    const max = new Vector2();
    return function clampScalar (minVal, maxVal) {
      min.set(minVal, minVal);
      max.set(maxVal, maxVal);
      return this.clamp(min, max);
    };
  }()),

  clampLength: function (min, max) {
    const length = this.length();
    return this.multiplyScalar(_Math.max(min, _Math.min(max, length)) / length);
  },

  floor: function () {
    this.x = _Math.floor(this.x);
    this.y = _Math.floor(this.y);
    return this;
  },

  ceil: function () {
    this.x = _Math.ceil(this.x);
    this.y = _Math.ceil(this.y);
    return this;
  },

  round: function () {
    this.x = _Math.round(this.x);
    this.y = _Math.round(this.y);
    return this;
  },

  roundToZero: function () {
    this.x = (this.x < 0) ? _Math.ceil(this.x) : _Math.floor(this.x);
    this.y = (this.y < 0) ? _Math.ceil(this.y) : _Math.floor(this.y);
    return this;
  },

  negate: function () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  },

  dot: function (v) {
    return this.x * v.x + this.y * v.y;
  },

  lengthSq: function () {
    // rewritten to deal with overflow/underflow
    const a = this.x;
    const b = this.y;
    if (a === 0 && b === 0) {
      return 0;
    }
    const x = _Math.abs(a);
    const y = _Math.abs(b);
    const u = _Math.max(x, y);
    const t = _Math.min(x, y) / u;
    return u * u * (1 + t * t);
  },

  length: function () {
    // rewritten to deal with overflow/underflow
    const a = this.x;
    const b = this.y;
    if (a === 0 && b === 0) {
      return 0;
    }
    const x = _Math.abs(a);
    const y = _Math.abs(b);
    const u = _Math.max(x, y);
    const t = _Math.min(x, y) / u;
    return u * _Math.sqrt(1 + t * t);
  },

  lengthManhattan: function () {
    return _Math.abs(this.x) + _Math.abs(this.y);
  },

  normalize: function () {
    return this.divideScalar(this.length());
  },

  angle: function () {
    // computes the angle in radians with respect to the positive x-axis
    let angle = _Math.atan2(this.y, this.x);
    if (angle < 0) {
      angle += 2 * _Math.PI;
    }
    return angle;
  },

  distanceTo: function (v) {
    return _Math.sqrt(this.distanceToSquared(v));
  },

  distanceToSquared: function (v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  },

  distanceToManhattan: function (v) {
    return _Math.abs(this.x - v.x) + _Math.abs(this.y - v.y);
  },

  setLength: function (length) {
    return this.multiplyScalar(length / this.length());
  },

  lerp: function (v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    return this;
  },

  lerpVectors: function (v1, v2, alpha) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  },

  equals: function (v) {
    return ((v.x === this.x) && (v.y === this.y));
  },

  fromArray: function (array, offset) {
    if (offset === undefined) {
      offset = 0;
    }
    this.x = array[offset];
    this.y = array[offset + 1];
    return this;
  },

  toArray: function (array, offset) {
    if (array === undefined) {
      array = [];
    }
    if (offset === undefined) {
      offset = 0;
    }
    array[offset] = this.x;
    array[offset + 1] = this.y;
    return array;
  },

  rotate: function (angle) {
    const c = _Math.cos(angle);
    const s = _Math.sin(angle);
    const x = this.x;
    const y = this.y;
    this.x = x * c - y * s;
    this.y = x * s + y * c;
    return this;
  },

  fromBufferAttribute: function (attribute, index, offset) {
    if (offset !== undefined) {
      console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().');
    }
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    return this;
  },

  rotateAround: function (center, angle) {
    const c = _Math.cos(angle);
    const s = _Math.sin(angle);
    const x = this.x - center.x;
    const y = this.y - center.y;
    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;
    return this;
  }
});

module.exports = Vector2;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.Minimatrix = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AssembleMath = {
  Matrix2: __webpack_require__(2),
  Matrix3: __webpack_require__(9),
  Vector2: __webpack_require__(5),
  Vector3: __webpack_require__(4),
  Compare: __webpack_require__(1),
  Polynomial: __webpack_require__(3),
  RootFinders: __webpack_require__(10),
  Optimization: __webpack_require__(11)
};
Object.assign(AssembleMath, __webpack_require__(0));

module.exports = AssembleMath;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Utils = {
  formatPrintNumber: function () {

  },
  printMatrix2: function (m) {
    const te = this.elements;
    const t11 = te[ 0 ];
    const t12 = te[ 2 ];
    const t21 = te[ 1 ];
    const t22 = te[ 3 ];

    const matrixString = `
    +-                -+
    | ${t11} ${t12} |
    | ${t21} ${t22} |
    +-                -+`;
    return matrixString;
  }
};

module.exports = Utils;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 *   Base code from THREE.js authors below.
 *   Additions by Tim Bright
 */

const _Math = __webpack_require__(0);
const Polynomial = __webpack_require__(3);
const Vector3 = __webpack_require__(4);

const Compare = __webpack_require__(1);
const EPSILON = Compare.DEFAULT_TOLERANCE;

/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */

// function assumes row and column numbering from 0-2.
const helpers = {
  prettyPrint: function () {
    const formatNumber = function formatNumber (x) {
      const maxLen = 6;
      let rawStr = '' + x;
      let str = rawStr.substring(0, maxLen);
      //let str = Utils.isZero(x, Utils.DEFAULT_TOLERANCE) ? '  0   ' : rawStr.substring(0, maxLen);
      let padding1 = '';
      let padding2 = '';
      const initStrLen = str.length;
      for (let i = initStrLen; i <= maxLen; i += 2) {
        padding1 += ' ';
        padding2 += ' ';
      }
      const extra = ((maxLen > initStrLen) && ((maxLen - initStrLen) % 2 === 1) ? ' ' : '');
      // format string with sci-notation
      const eIdx = rawStr.indexOf('e');
      if (eIdx > -1) {
        const expStr = rawStr.substring(eIdx);
        const expStrLen = expStr.length;

        // if (str.trim() !== '0') {
        str = str.substring(0, maxLen - expStrLen) + expStr;
        // }
      }
      const formatted = padding1 + str + padding2 + extra;
      return formatted;
    };
    const te = this.elements;
    const cap = '+-                        -+';
    let matString = '\n' + cap + '\n';
    for (let i = 0; i < 3; ++i) {
      let rowString = '| ';
      for (let j = 0; j < 3; ++j) {
        const val = te[(j * 3) + i];
        const valStr = formatNumber(val);
        rowString += valStr;
      }
      matString += rowString + ' |\n';
    }
    return matString + cap;
  },
  findLargestInCol: function (m, i, startAtRow) {
    let me = m.elements;
    let offset = i * 3;
    let maxIdx = (startAtRow === undefined ? 0 : startAtRow);
    let maxVal = _Math.abs(me[offset + maxIdx]);
    for (let i = maxIdx + 1; i < 3; ++i) {
      let val = _Math.abs(me[offset + i]);
      if (val > maxVal) {
        maxIdx = i;
        maxVal = val;
      }
    }
    return maxIdx;
  },
  swapRowsInPlace: function swapRowsInPlace (m, i, j) {
    const me = m.elements;
    let a1 = me[i];
    let a2 = me[i + 3];
    let a3 = me[i + 6];

    me[i] = me[j];
    me[i + 3] = me[j + 3];
    me[i + 6] = me[j + 6];

    me[j] = a1;
    me[j + 3] = a2;
    me[j + 6] = a3;
  },
  scaleRow: function scaleAndAddRow (m, row, scale) {
    const me = m.elements;
    let i = row;
    let alpha = (scale === undefined ? 1.0 : scale);
    me[i] *= alpha;
    me[i + 3] *= alpha;
    me[i + 6] *= alpha;
  },
  scaleAndAddRow: function scaleAndAddRow (m, srcRow, destRow, scale) {
    const me = m.elements;
    let i = destRow;
    let j = srcRow;
    let alpha = (scale === undefined ? 1.0 : scale);
    me[i] += me[j] * alpha;
    me[i + 3] += me[j + 3] * alpha;
    me[i + 6] += me[j + 6] * alpha;
  },
  thresholdToZero: function thresholdToZero (m, TOL) {
    const me = m.elements;
    const TOLERANCE = TOL || EPSILON;
    for (let i = 0; i < 9; ++i) {
      if (Compare.isZero(me[i], TOLERANCE)) {
        me[i] = 0;
      }
    }
    return m;
  },
  modifiedGramSchmidt: function modifiedGramSchmidt (m) {
    const v0 = m.getColumn(0);
    const v1 = m.getColumn(1);
    const v2 = m.getColumn(2);
    function proj(u, v) {
      return u.clone().multiplyScalar(u.dot(v) / u.dot(u));
    }
    const u0 = v0;
    const u1 = v1.clone().sub(proj(u0, v1));
    const u2t = v2.clone().sub(proj(u0, v2));
    const u2 = u2t.sub(proj(u1, u2t));
    m.setColumns(u0, u1, u2);
  },
  rotg: function rotg (a, b, csr) {
    // Based on Algorithm 4 from "Discontinuous Plane
    // Rotations and the Symmetric Eigenvalue Problem"
    // by Anderson, 2000.
    let c = 0;
    let s = 0;
    let r = 0;
    let t = 0;
    let u = 0;

    if (b === 0) {
      c = _Math.sign(a);
      s = 0;
      r = _Math.abs(a);
    } else if (a === 0) {
      c = 0;
      s = _Math.sign(b);
      r = _Math.abs(b);
    } else if (_Math.abs(a) > _Math.abs(b)) {
      t = b / a;
      u = _Math.sign(a) * _Math.sqrt(1 + t * t);
      c = 1 / u;
      s = t * c;
      r = a * u;
    } else {
      t = a / b;
      u = _Math.sign(a) * _Math.sqrt(1 + t * t);
      s = 1 / u;
      c = t * s;
      r = b * u;
    }
    // try to save some unnecessary object creation
    if (csr !== undefined && csr.length > 2) {
      csr[0] = c;
      csr[1] = s;
      csr[2] = r;
    } else {
      return [c, s, r];
    }
  },
  qrDecomposition: function qrDecomposition (A) {
    const Q = new Matrix3();
    const R = (new Matrix3()).copy(A).thresholdEntriesToZero(EPSILON);
    const qe = Q.elements;
    const re = R.elements;

    const csr = [0, 0, 0];
    const m = 3;
    const n = 3;
    for (let j = 0; j < n; ++j) {
      for (let i = m - 1; i >= j + 1; --i) {
        const a = re[n * j + (i - 1)]; // R.get(i - 1, j);
        const b = re[n * j + i]; // R.get(i, j);
        if (a === 0 && b === 0) {
          continue;
        }
        helpers.rotg(a, b, csr);
        const c = csr[0];
        const s = csr[1];
        let tmp1 = 0;
        let tmp2 = 0;

        // R' = G * R
        for (let x = 0; x < n; ++x) {
          tmp1 = re[n * x + (i - 1)]; // R.get(i - 1, x);
          tmp2 = re[n * x + i]; // R.get(i, x);
          re[n * x + (i - 1)] = tmp1 * c + tmp2 * s; // R.set(i - 1, x, tmp1 * c + tmp2 * s);
          re[n * x + i] = -tmp1 * s + tmp2 * c; // R.set(i, x, -tmp1 * s + tmp2 * c);
        }
        re[n * j + (i - 1)] = csr[2]; // R.set(i - 1, j, csr[2]);
        re[n * j + i] = 0; // R.set(i, j, 0);

        // Q' = Q * G^T
        for (let x = 0; x < m; ++x) {
          tmp1 = qe[n * (i - 1) + x]; // Q.get(x, i - 1);
          tmp2 = qe[n * i + x]; // Q.get(x, i);
          qe[n * (i - 1) + x] = tmp1 * c + tmp2 * s; // Q.set(x, i - 1, tmp1 * c + tmp2 * s);
          qe[n * i + x] = -tmp1 * s + tmp2 * c; // Q.set(x, i, -tmp1 * s + tmp2 * c);
        }
      }
    }
    return { Q, R }
  },
  rrefInPlace: function (m) {
    const me = m.elements;
    // iterate through all rows to get to REF
    for (let i = 0; i < 3; ++i) {
      // search for largest in col and swap
      const k = helpers.findLargestInCol(m, i, i);
      if (k !== i) {
        helpers.swapRowsInPlace(m, i, k);
      }
      // scale and add current row to all rows underneath
      const largestElem = me[(i * 3) + i];
      if (!Compare.isZero(largestElem, EPSILON)) {
        helpers.scaleRow(m, i, 1.0 / largestElem);
        for (let j = i + 1; j < 3; ++j) {
          const scaleElem = me[(i * 3) + j];
          if (!Compare.isZero(scaleElem, EPSILON)) {
            helpers.scaleAndAddRow(m, i, j, -scaleElem);
          }
        }
      }
    }
    // iterate back through to get RREF since everything on diagonals should be 1 or 0
    for (let i = 2; i >= 0; --i) {
      const val = me[(i * 3) + i];
      if (!Compare.isZero(val, EPSILON)) {
        for (let j = i - 1; j >= 0; --j) {
          const scaleElem = me[(i * 3) + j];
          if (!Compare.isZero(scaleElem, EPSILON)) {
            helpers.scaleAndAddRow(m, i, j, -scaleElem);
          }
        }
      }
    }
    return m;
  },
  isRowNonzero: function isRowNonzero (m, i) {
    const me = m.elements;
    return !(Compare.isZero(me[i], EPSILON) &&
              Compare.isZero(me[i + 3], EPSILON) &&
              Compare.isZero(me[i + 6], EPSILON));
  }
};

function Matrix3 () {
  this.elements = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];
  if (arguments.length > 0) {
    console.error('THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.');
  }
}

Object.assign(Matrix3.prototype, {
  isMatrix3: true,

  set: function (n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    const te = this.elements;
    te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
    te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
    te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;
    return this;
  },

  setColumns: function (c0, c1, c2) {
    const te = this.elements;
    te[ 0 ] = c0.x; te[ 1 ] = c0.y; te[ 2 ] = c0.z;
    te[ 3 ] = c1.x; te[ 4 ] = c1.y; te[ 5 ] = c1.z;
    te[ 6 ] = c2.x; te[ 7 ] = c2.y; te[ 8 ] = c2.z;
    return this;
  },

  setRows: function (r0, r1, r2) {
    const te = this.elements;
    te[ 0 ] = r0.x; te[ 1 ] = r1.x; te[ 2 ] = r2.x;
    te[ 3 ] = r0.y; te[ 4 ] = r1.y; te[ 5 ] = r2.y;
    te[ 6 ] = r0.z; te[ 7 ] = r1.z; te[ 8 ] = r2.z;
    return this;
  },

  identity: function () {
    this.set(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    );
    return this;
  },

  setSkewSymmetric: function (v) {
    const te = this.elements;
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
  },

  clone: function () {
    return new this.constructor().fromArray(this.elements);
  },

  copy: function (m) {
    const te = this.elements;
    const me = m.elements;
    te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
    te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
    te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];
    return this;
  },

  addMatrices: function (a, b, scalar) {
    const alpha = (scalar === undefined ? 1 : scalar);
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;

    const a11 = ae[ 0 ];
    const a12 = ae[ 3 ];
    const a13 = ae[ 6 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 4 ];
    const a23 = ae[ 7 ];
    const a31 = ae[ 2 ];
    const a32 = ae[ 5 ];
    const a33 = ae[ 8 ];

    const b11 = be[ 0 ];
    const b12 = be[ 3 ];
    const b13 = be[ 6 ];
    const b21 = be[ 1 ];
    const b22 = be[ 4 ];
    const b23 = be[ 7 ];
    const b31 = be[ 2 ];
    const b32 = be[ 5 ];
    const b33 = be[ 8 ];

    te[ 0 ] = a11 + (b11 * alpha);
    te[ 3 ] = a12 + (b12 * alpha);
    te[ 6 ] = a13 + (b13 * alpha);
    te[ 1 ] = a21 + (b21 * alpha);
    te[ 4 ] = a22 + (b22 * alpha);
    te[ 7 ] = a23 + (b23 * alpha);
    te[ 2 ] = a31 + (b31 * alpha);
    te[ 5 ] = a32 + (b32 * alpha);
    te[ 8 ] = a33 + (b33 * alpha);

    return this;
  },

  add: function (m, scalar) {
    return this.addMatrices(this, m, scalar);
  },

  multiply: function (m) {
    return this.multiplyMatrices(this, m);
  },

  premultiply: function (m) {
    return this.multiplyMatrices(m, this);
  },

  multiplyMatrices: function (a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;

    const a11 = ae[ 0 ];
    const a12 = ae[ 3 ];
    const a13 = ae[ 6 ];
    const a21 = ae[ 1 ];
    const a22 = ae[ 4 ];
    const a23 = ae[ 7 ];
    const a31 = ae[ 2 ];
    const a32 = ae[ 5 ];
    const a33 = ae[ 8 ];

    const b11 = be[ 0 ];
    const b12 = be[ 3 ];
    const b13 = be[ 6 ];
    const b21 = be[ 1 ];
    const b22 = be[ 4 ];
    const b23 = be[ 7 ];
    const b31 = be[ 2 ];
    const b32 = be[ 5 ];
    const b33 = be[ 8 ];

    te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31;
    te[ 3 ] = a11 * b12 + a12 * b22 + a13 * b32;
    te[ 6 ] = a11 * b13 + a12 * b23 + a13 * b33;

    te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31;
    te[ 4 ] = a21 * b12 + a22 * b22 + a23 * b32;
    te[ 7 ] = a21 * b13 + a22 * b23 + a23 * b33;

    te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31;
    te[ 5 ] = a31 * b12 + a32 * b22 + a33 * b32;
    te[ 8 ] = a31 * b13 + a32 * b23 + a33 * b33;

    return this;
  },

  multiplyScalar: function (s) {
    const te = this.elements;
    te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
    te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
    te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;
    return this;
  },

  determinant: function () {
    const te = this.elements;
    const a = te[ 0 ];
    const b = te[ 1 ];
    const c = te[ 2 ];
    const d = te[ 3 ];
    const e = te[ 4 ];
    const f = te[ 5 ];
    const g = te[ 6 ];
    const h = te[ 7 ];
    const i = te[ 8 ];
    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
  },

  invert: function (throwOnDegenerate) {
    return this.getInverse(this, throwOnDegenerate);
  },

  adjugate: function () {
    return this.getAdjugate(this);
  },

  getAdjugate: function (matrix) {
    const me = matrix.elements;
    const a11 = me[ 0 ];
    const a21 = me[ 1 ];
    const a31 = me[ 2 ];
    const a12 = me[ 3 ];
    const a22 = me[ 4 ];
    const a32 = me[ 5 ];
    const a13 = me[ 6 ];
    const a23 = me[ 7 ];
    const a33 = me[ 8 ];

    const t11 = +(a22 * a33 - a23 * a32);
    const t12 = -(a12 * a33 - a13 * a32);
    const t13 = +(a12 * a23 - a13 * a22);
    const t21 = -(a21 * a33 - a23 * a31);
    const t22 = +(a11 * a33 - a13 * a31);
    const t23 = -(a11 * a23 - a13 * a21);
    const t31 = +(a21 * a32 - a22 * a31);
    const t32 = -(a11 * a32 - a12 * a31);
    const t33 = +(a11 * a22 - a12 * a21);

    const te = this.elements;
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
  },

  getInverse: function (matrix, throwOnDegenerate) {
    const me = matrix.elements;
    const te = this.elements;
    const n11 = me[ 0 ];
    const n21 = me[ 1 ];
    const n31 = me[ 2 ];
    const n12 = me[ 3 ];
    const n22 = me[ 4 ];
    const n32 = me[ 5 ];
    const n13 = me[ 6 ];
    const n23 = me[ 7 ];
    const n33 = me[ 8 ];

    const t11 = n33 * n22 - n32 * n23;
    const t12 = n32 * n13 - n33 * n12;
    const t13 = n23 * n12 - n22 * n13;

    const det = n11 * t11 + n21 * t12 + n31 * t13;

    if (det === 0) {
      const msg = 'Matrix3.getInverse(): cannot invert matrix, determinant is 0';

      if (throwOnDegenerate === true) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }
      return this.identity();
    }

    const detInv = 1.0 / det;
    te[ 0 ] = t11 * detInv;
    te[ 1 ] = (n31 * n23 - n33 * n21) * detInv;
    te[ 2 ] = (n32 * n21 - n31 * n22) * detInv;

    te[ 3 ] = t12 * detInv;
    te[ 4 ] = (n33 * n11 - n31 * n13) * detInv;
    te[ 5 ] = (n31 * n12 - n32 * n11) * detInv;

    te[ 6 ] = t13 * detInv;
    te[ 7 ] = (n21 * n13 - n23 * n11) * detInv;
    te[ 8 ] = (n22 * n11 - n21 * n12) * detInv;

    return this;
  },

  transpose: function () {
    let tmp;
    const m = this.elements;

    tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
    tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
    tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;
    return this;
  },

  trace: function () {
    const me = this.elements;
    const n11 = me[ 0 ];
    const n22 = me[ 4 ];
    const n33 = me[ 8 ];
    return n11 + n22 + n33;
  },

  transposeIntoArray: function (r) {
    const m = this.elements;
    r[ 0 ] = m[ 0 ];
    r[ 1 ] = m[ 3 ];
    r[ 2 ] = m[ 6 ];
    r[ 3 ] = m[ 1 ];
    r[ 4 ] = m[ 4 ];
    r[ 5 ] = m[ 7 ];
    r[ 6 ] = m[ 2 ];
    r[ 7 ] = m[ 5 ];
    r[ 8 ] = m[ 8 ];
    return this;
  },

  equals: function (matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 9; i++) {
      if (te[i] !== me[i]) {
        return false;
      }
    }
    return true;
  },

  fromArray: function (array, offset) {
    if (offset === undefined) {
      offset = 0;
    }
    for (let i = 0; i < 9; i++) {
      this.elements[ i ] = array[i + offset];
    }
    return this;
  },

  toArray: function (array, offset) {
    if (array === undefined) {
      array = [];
    }
    if (offset === undefined) {
      offset = 0;
    }

    const te = this.elements;

    array[ offset ] = te[ 0 ];
    array[ offset + 1 ] = te[ 1 ];
    array[ offset + 2 ] = te[ 2 ];

    array[ offset + 3 ] = te[ 3 ];
    array[ offset + 4 ] = te[ 4 ];
    array[ offset + 5 ] = te[ 5 ];

    array[ offset + 6 ] = te[ 6 ];
    array[ offset + 7 ] = te[ 7 ];
    array[ offset + 8 ] = te[ 8 ];

    return array;
  },

  getEigenvalues: function () {
    const je = this.elements;
    const a = je[ 0 ];
    const b = je[ 1 ];
    const c = je[ 2 ];
    const d = je[ 3 ];
    const e = je[ 4 ];
    const f = je[ 5 ];
    const g = je[ 6 ];
    const h = je[ 7 ];
    const i = je[ 8 ];

    const A = 1;
    const B = -(a + e + i);
    const C = a * e + a * i - d * b - g * c + e * i - h * f;
    const D = -(a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g);

    return Polynomial.getRealCubicRoots(A, B, C, D);
  },

  findLargestAbsElement: function () {
    const te = this.elements;
    let max = _Math.abs(te[0]);
    let rowCol = {
      row: 0,
      column: 0,
      value: te[0]
    };
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        const val = te[i * 3 + j];
        const ti = _Math.abs(val);
        if (ti > max) {
          max = ti;
          rowCol.row = j;
          rowCol.column = i;
          rowCol.value = val;
        }
      }
    }
    return rowCol;
  },

  getRow: function (i) {
    const te = this.elements;
    switch (i) {
      case 0:
        return new Vector3(te[0], te[3], te[6]);
      case 1:
        return new Vector3(te[1], te[4], te[7]);
      case 2:
        return new Vector3(te[2], te[5], te[8]);
      default:
        throw new Error('No row defined at ' + i + '.');
    }
  },

  getColumn: function (i) {
    const te = this.elements;
    switch (i) {
      case 0:
        return new Vector3(te[0], te[1], te[2]);
      case 1:
        return new Vector3(te[3], te[4], te[5]);
      case 2:
        return new Vector3(te[6], te[7], te[8]);
      default:
        throw new Error('No column defined at ' + i + '.');
    }
  },

  findFirstNonvanishing: function () {
    const te = this.elements;
    let rowCol = {
      row: 0,
      column: 0,
      value: te[0]
    };
    if (Compare.isZero(te[0], EPSILON)) {
      for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
          const val = te[i * 3 + j];
          if (!Compare.isZero(val, EPSILON)) {
            rowCol.row = j;
            rowCol.column = i;
            rowCol.value = val;
            return rowCol;
          }
        }
      }
    }
    return rowCol;
  },

  thresholdEntriesToZero: function (TOL) {
    return helpers.thresholdToZero(this, TOL);
  },

  prettyPrint: function () {
    return helpers.prettyPrint.call(this);
  },

  getRank: function () {
    const { Q, R } = helpers.qrDecomposition(this);
    R.thresholdEntriesToZero(100 * EPSILON);
    let rank = 0;
    const test = helpers.rrefInPlace(R);
    for (let i = 0; i < 3; ++i) {
      if (helpers.isRowNonzero(R, i)) {
        rank++;
      }
    }
    return rank;
  },

  decomposeQR: function () {
    return helpers.qrDecomposition(this);
  },

  thresholdToLowerRank: function () {
    // computes a QR decomposition and thresholds the R matrix values
    // so that the true rank will be reflected
    const { Q, R } = helpers.qrDecomposition(this);
    R.thresholdEntriesToZero(10 * EPSILON);
    this.copy(Q.multiply(R));
    return this;
  }
});

module.exports = Matrix3;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Compare = __webpack_require__(1);
const TOLERANCE = Compare.DEFAULT_TOLERANCE;

const RootFinders = {
  bisectionMethod: function bisectionMethod (f, options) {
    const imax = options.maxIterations;
    const es = options.rootTolerance || TOLERANCE;
    let xl = options.lowerBound;
    let xu = options.upperBound;
    let xr = options.initialValue;

    let iter = 0;
    let fl = f(xl);
    do {
      xr = (xl + xu) / 2;
      const fr = f(xr);
      iter++;
      const test = fl * fr;
      if (test < 0) {
        xu = xr;
      } else if (test > 0) {
        xl = xr;
        fl = fr;
      }
    } while (!Compare.isZero(f(xr), es) && iter < imax);
    if (iter >= imax) {
      console.warn('bisectionMethod(): Iteration max reached. Solution may not be accurate.');
    }
    return xr;
  }
};

module.exports = RootFinders;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Compare = __webpack_require__(1);
const TOLERANCE = Compare.DEFAULT_TOLERANCE;

const _Math = __webpack_require__(0);
const Matrix2 = __webpack_require__(2);
const Vector2 = __webpack_require__(5);

const helpers = {
  bfgsRankUpdate: function (N, y, dx) {
    // Hessian inverse update
    const t1 = y.clone().multiplyMatrix2(N);
    const a = dx.dot(y);
    const b = y.dot(t1);
    const c = 1.0 / a;
    const d = (1 + b / a) * c;
    N.addOuterProduct(dx, dx, d);
    N.addOuterProduct(dx, t1, -c);
    N.addOuterProduct(t1, dx, -c);
  },
  parabolicLineSearch: function (X0, s, F, X, alphaStart = 0.01) {
    const MAX_ITERATIONS = 1024;
    const x = X0.clone();
    const alphas = new Float64Array([0, 0, 0]);
    const fs = new Float64Array([0, 0, 0]);

    fs[0] = F(x);
    alphas[0] = 0;
    let alpha = alphaStart;
    x.copy(s).multiplyScalar(alpha).add(X0);
    fs[1] = F(x);
    alphas[1] = alpha;
    alpha *= 2;
    x.copy(s).multiplyScalar(alpha).add(X0);
    fs[2] = F(x);
    alphas[2] = alpha;

    let j = 2;
    let iter = 0;
    while (fs[(j - 1) % 3] - fs[j % 3] > 0 && iter <= MAX_ITERATIONS) {
      j++;
      alpha *= 2;
      x.copy(s).multiplyScalar(alpha).add(X0);
      fs[j % 3] = F(x);
      alphas[j % 3] = alpha;
      iter++;
    }
    if (iter > MAX_ITERATIONS) {
      return false;
    }
    const da = (alphas[j % 3] - alphas[(j - 1) % 3]) / 2;
    const aLast = alpha - da;
    x.copy(s).multiplyScalar(aLast).add(X0);
    const fLast = F(x);

    let a2;
    let f1;
    let f2;
    let f3;
    if (fs[(j - 1) % 3] < fLast) {
      a2 = alphas[(j - 1) % 3];
      f1 = fs[(j - 2) % 3];
      f2 = fs[(j - 1) % 3];
      f3 = fLast;
    } else {
      a2 = aLast;
      f1 = fs[(j - 1) % 3];
      f2 = fLast;
      f3 = fs[j % 3];
    }
    const aMin = a2 + (da * (f1 - f3)) / (2 * (f1 - 2 * f2 + f3));
    X.copy(s).multiplyScalar(aMin).add(X0);
    return true;
  }
};

const Optimization = {
  newton: function (options) {
    const objective = options.objective;
    const initialPos = objective.start;
    const delta = objective.delta;
    const F = objective.func;
    const G = objective.gradient;
    const H = objective.hessian;

    const solution = options.solution;
    const TOL = solution.tolerance || TOLERANCE;
    const MAX_ITERATIONS = solution.maxIterations;

    const N = new Matrix2();
    const xk = initialPos.clone();
    const xk1 = initialPos.clone();
    const dx = new Vector2();
    const gk = new Vector2();
    let fk = Number.POSITIVE_INFINITY;

    let fk1 = F(xk);
    let gradNorm = G(xk, gk);
    H(xk, N);

    let iter = 0;
    while (_Math.abs(fk1 - fk) > TOL && _Math.abs(gradNorm) > TOL && iter <= MAX_ITERATIONS) {
      xk.copy(xk1);
      N.invert().multiplyScalar(-1);
      dx.copy(gk).multiplyMatrix2(N);
      console.log(dx.length());

      // Reset for the next loop
      xk1.copy(xk).add(dx);
      fk = fk1;
      fk1 = F(xk1);
      gradNorm = G(xk, gk);
      H(xk, N);
    }
    const solutionValid = (_Math.abs(fk1 - fk) > TOL) || (_Math.abs(gradNorm) > TOL);
    return {
      'solution': xk1,
      'solutionValid': solutionValid,
      'iterations': iter,
      'initialObjective': F(initialPos),
      'finalObjective': fk1,
      'gradNorm': gradNorm
    };
  },
  quasiNewton: function (options) {
    const objective = options.objective;
    const initialPos = objective.start;
    const gradient = objective.gradient;
    const delta = objective.delta;
    const F = objective.func;

    const solution = options.solution;
    const TOL = solution.tolerance || TOLERANCE;
    const MAX_ITERATIONS = solution.maxIterations;

    // N starts out as the identity matrix
    const N = new Matrix2();
    const xk = initialPos.clone();
    const xk1 = initialPos.clone();
    const dx = new Vector2();
    const gk = new Vector2();
    const gk1 = new Vector2();
    let fk = Number.POSITIVE_INFINITY;
    let fk1 = F(xk);
    let gradNorm = gradient(xk, gk);
    const y = gk.clone().multiplyScalar(-1.0 / gradNorm);

    let iter = 0;
    while (_Math.abs(fk1 - fk) > TOL && _Math.abs(gradNorm) > TOL && iter <= MAX_ITERATIONS) {
      if (helpers.parabolicLineSearch(xk, y, F, xk1, delta)) {
        iter++;
        gradNorm = gradient(xk1, gk1);
        fk = fk1;
        fk1 = F(xk1);
        dx.subVectors(xk1, xk);
        y.subVectors(gk1, gk);
        helpers.bfgsRankUpdate(N, y, dx);
        gk.copy(gk1);
        xk.copy(xk1);
      } else {
        return {
          solutionValid: false,
          iterations: iter
        };
      }
    }
    const solutionValid = (_Math.abs(fk1 - fk) > TOL) || (_Math.abs(gradNorm) > TOL);
    return {
      'solution': xk1,
      'solutionValid': solutionValid,
      'iterations': iter,
      'initialObjective': F(initialPos),
      'finalObjective': fk1,
      'gradNorm': gradNorm
    };
  }
};

module.exports = Optimization;


/***/ })
/******/ ]);