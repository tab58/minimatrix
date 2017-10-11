'use strict';

const AssembleMath = {
  Matrix2: require('./matrix2.js'),
  Matrix3: require('./matrix3.js'),
  Vector2: require('./vector2.js'),
  Vector3: require('./vector3.js'),
  Compare: require('./compare.js'),
  Helpers: require('./math-helpers.js'),
  Complex: require('./complex.js'),
  Utils: require('./utils.js')
};
Object.assign(AssembleMath, require('./stdMath.js'));

module.exports = AssembleMath;
