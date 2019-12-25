interface Math {
  /** The mathematical constant e. This is Euler's number, the base of natural logarithms. */
  readonly E: number;
  /** The natural logarithm of 10. */
  readonly LN10: number;
  /** The natural logarithm of 2. */
  readonly LN2: number;
  /** The base-2 logarithm of e. */
  readonly LOG2E: number;
  /** The base-10 logarithm of e. */
  readonly LOG10E: number;
  /** Pi. This is the ratio of the circumference of a circle to its diameter. */
  readonly PI: number;
  /** The square root of 0.5, or, equivalently, one divided by the square root of 2. */
  readonly SQRT1_2: number;
  /** The square root of 2. */
  readonly SQRT2: number;
  /**
    * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
    * For example, the absolute value of -5 is the same as the absolute value of 5.
    * @param x A numeric expression for which the absolute value is needed.
    */
  abs(x: number): number;
  /**
    * Returns the arc cosine (or inverse cosine) of a number.
    * @param x A numeric expression.
    */
  acos(x: number): number;
  /**
   * Returns the inverse hyperbolic cosine of a number.
   * @param x A numeric expression that contains an angle measured in radians.
   */
  acosh(x: number): number;
  /**
    * Returns the arcsine of a number.
    * @param x A numeric expression.
    */
  asin(x: number): number;
  /**
   * Returns the inverse hyperbolic sine of a number.
   * @param x A numeric expression that contains an angle measured in radians.
   */
  asinh(x: number): number;
  /**
    * Returns the arctangent of a number.
    * @param x A numeric expression for which the arctangent is needed.
    */
  atan(x: number): number;
  /**
    * Returns the angle (in radians) from the X axis to a point.
    * @param y A numeric expression representing the cartesian y-coordinate.
    * @param x A numeric expression representing the cartesian x-coordinate.
    */
  atan2(y: number, x: number): number;
  /**
   * Returns the inverse hyperbolic tangent of a number.
   * @param x A numeric expression that contains an angle measured in radians.
   */
  atanh(x: number): number;
  /**
   * Returns an implementation-dependent approximation to the cube root of number.
   * @param x A numeric expression.
   */
  cbrt(x: number): number;
  /**
    * Returns the smallest integer greater than or equal to its numeric argument.
    * @param x A numeric expression.
    */
  ceil(x: number): number;
  /**
   * Returns the number of leading zero bits in the 32-bit binary representation of a number.
   * @param x A numeric expression.
   */
  clz32(x: number): number;
  /**
    * Returns the cosine of a number.
    * @param x A numeric expression that contains an angle measured in radians.
    */
  cos(x: number): number;
  /**
   * Returns the hyperbolic cosine of a number.
   * @param x A numeric expression that contains an angle measured in radians.
   */
  cosh(x: number): number;
  /**
    * Returns e (the base of natural logarithms) raised to a power.
    * @param x A numeric expression representing the power of e.
    */
  exp(x: number): number;
  /**
   * Returns the result of (e^x - 1), which is an implementation-dependent approximation to
   * subtracting 1 from the exponential function of x (e raised to the power of x, where e
   * is the base of the natural logarithms).
   * @param x A numeric expression.
   */
  expm1(x: number): number;
  /**
    * Returns the greatest integer less than or equal to its numeric argument.
    * @param x A numeric expression.
    */
  floor(x: number): number;
  /**
   * Returns the nearest single precision float representation of a number.
   * @param x A numeric expression.
   */
  fround(x: number): number;
  /**
   * Returns the square root of the sum of squares of its arguments.
   * @param values Values to compute the square root for.
   *     If no arguments are passed, the result is +0.
   *     If there is only one argument, the result is the absolute value.
   *     If any argument is +Infinity or -Infinity, the result is +Infinity.
   *     If any argument is NaN, the result is NaN.
   *     If all arguments are either +0 or −0, the result is +0.
   */
  hypot(...values: number[]): number;
  /**
   * Returns the result of 32-bit multiplication of two numbers.
   * @param x First number
   * @param y Second number
   */
  imul(x: number, y: number): number;
  /**
    * Returns the natural logarithm (base e) of a number.
    * @param x A numeric expression.
    */
  log(x: number): number;
  /**
   * Returns the natural logarithm of 1 + x.
   * @param x A numeric expression.
   */
  log1p(x: number): number;
  /**
   * Returns the base 2 logarithm of a number.
   * @param x A numeric expression.
   */
  log2(x: number): number;
  /**
   * Returns the base 10 logarithm of a number.
   * @param x A numeric expression.
   */
  log10(x: number): number;
  /**
    * Returns the larger of a set of supplied numeric expressions.
    * @param values Numeric expressions to be evaluated.
    */
  max(...values: number[]): number;
  /**
    * Returns the smaller of a set of supplied numeric expressions.
    * @param values Numeric expressions to be evaluated.
    */
  min(...values: number[]): number;
  /**
    * Returns the value of a base expression taken to a specified power.
    * @param x The base value of the expression.
    * @param y The exponent value of the expression.
    */
  pow(x: number, y: number): number;
  /** Returns a pseudorandom number between 0 and 1. */
  random(): number;
  /**
    * Returns a supplied numeric expression rounded to the nearest number.
    * @param x The value to be rounded to the nearest number.
    */
  round(x: number): number;
  /**
   * Returns the sign of the x, indicating whether x is positive, negative or zero.
   * @param x The numeric expression to test
   */
  sign(x: number): number;
  /**
    * Returns the sine of a number.
    * @param x A numeric expression that contains an angle measured in radians.
    */
  sin(x: number): number;
  /**
   * Returns the hyperbolic sine of a number.
   * @param x A numeric expression that contains an angle measured in radians.
   */
  sinh(x: number): number;
  /**
    * Returns the square root of a number.
    * @param x A numeric expression.
    */
  sqrt(x: number): number;
  /**
    * Returns the tangent of a number.
    * @param x A numeric expression that contains an angle measured in radians.
    */
  tan(x: number): number;
  /**
   * Returns the hyperbolic tangent of a number.
   * @param x A numeric expression that contains an angle measured in radians.
   */
  tanh(x: number): number;
  /**
   * Returns the integral part of the a numeric expression, x, removing any fractional digits.
   * If x is already an integer, the result is x.
   * @param x A numeric expression.
   */
  trunc(x: number): number;
}

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
]

const _Math = mathProps.reduce((acc: Math, prop: string): Math => {
  (acc as any)[prop] = (Math as any)[prop];
  return acc;
}, {} as Math);

const core = {
  DEG2RAD: Math.PI / 180,
  RAD2DEG: 180 / Math.PI,
  PI2: 2 * Math.PI,

  clamp: function (value: number, min: number, max: number): number {
    return Math.max(min, _Math.min(max, value));
  },

  hypot: function (w: number, z: number): number {
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

  // compute Euclidean modulo of m % n
  // https://en.wikipedia.org/wiki/Modulo_operation

  euclideanModulo: function (n: number, m: number): number {
    return ((n % m) + m) % m;
  },

  // Linear mapping from range <a1, a2> to range <b1, b2>
  mapLinear: function (x: number, a1: number, a2: number, b1: number, b2: number): number {
    return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
  },

  // https://en.wikipedia.org/wiki/Linear_interpolation
  lerp: function (x: number, y: number, t: number): number {
    return (1.0 - t) * x + t * y;
  },

  // http://en.wikipedia.org/wiki/Smoothstep
  smoothstep: function (x: number, min: number, max: number): number {
    if (x <= min) {
      return 0;
    }
    if (x >= max) {
      return 1;
    }
    x = (x - min) / (max - min);
    return x * x * (3 - 2 * x);
  },

  smootherstep: function (x: number, min: number, max: number): number {
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
  randInt: function (low: number, high: number): number {
    return low + _Math.floor(_Math.random() * (high - low + 1));
  },

  // Random float from <low, high> interval

  randFloat: function (low: number, high: number): number {
    return low + _Math.random() * (high - low);
  },

  // Random float from <-range/2, range/2> interval
  randFloatSpread: function (range: number): number {
    return range * (0.5 - _Math.random());
  },

  degToRad: function (degrees: number): number {
    return degrees * core.DEG2RAD;
  },

  radToDeg: function (radians: number): number {
    return radians * core.RAD2DEG;
  },

  isPowerOfTwo: function (value: number): boolean {
    return (value & (value - 1)) === 0 && value !== 0;
  },

  nearestPowerOfTwo: function (value: number): number {
    return _Math.pow(2, _Math.round(_Math.log(value) / _Math.LN2));
  },

  nextPowerOfTwo: (value: number): number => {
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

export default Object.assign(_Math, core);