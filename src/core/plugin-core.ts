import { _Math } from './math';

interface Math {
  DEG2RAD: number;
  RAD2DEG: number;
  PI2: number;

  clamp: (value: number, min: number, max: number) => number;
  /**
   * Computes the hypot() function 
   */
  khypot: (w: number, z: number) => number;
  /** 
   * Computes the Euclidian modulo of m % n.
   * https://en.wikipedia.org/wiki/Modulo_operation
  */
  euclideanModulo: (n: number, m: number) => number;
  /**
   * Maps a value from an interval A to another interval B.
   */
  mapLinear: (x: number, a1: number, a2: number, b1: number, b2: number) => number;
  /**
   * Computes a linear interpolation between two values.
   * https://en.wikipedia.org/wiki/Linear_interpolation 
   */
  lerp: (x: number, y: number, t: number) => number;
  /**
   * http://en.wikipedia.org/wiki/Smoothstep
   */
  smoothstep: (x: number, min: number, max: number) => number;
  /**
   * http://en.wikipedia.org/wiki/Smoothstep
   */
  smootherstep: (x: number, min: number, max: number) => number;
  /**
   * Random integer from <low, high> interval.
   */
  randInt: (low: number, high: number) => number;
  /**
   * Random float from <low, high> interval.
   */
  randFloat: (low: number, high: number) => number;
  /**
   * Random float from <-range/2, range/2> interval.
   */ 
  randFloatSpread: (range: number) => number;
  /**
   * Converts degrees to radians.
   */
  degToRad: (degrees: number) => number;
  /**
   * Converts radians to degrees.
   */
  radToDeg: (radians: number) => number;
  /**
   * Determines if a number is a power of two.
   */
  isPowerOfTwo: (value: number) => number;
  /**
   * Rounds to the nearest power of two from a value.
   */
  nearestPowerOfTwo: (value: number) => number;
  /**
   * Rounds up to the next power of two.
   */
  nextPowerOfTwo: (value: number) => number;
}

export default {
  DEG2RAD: Math.PI / 180,
  RAD2DEG: 180 / Math.PI,
  PI2: 2 * Math.PI,

  clamp: function (value: number, min: number, max: number): number {
    return Math.max(min, _Math.min(max, value));
  },

  hypot: function (w: number, z: number) {
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

  euclideanModulo: function (n: number, m: number): number {
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
