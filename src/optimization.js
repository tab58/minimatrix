'use strict';

const Utils = require('./mathUtils.js');
const TOLERANCE = Utils.DEFAULT_TOLERANCE;

const _Math = require('./mathFunctions.js');
const Matrix2 = require('./matrix2.js');
const Vector2 = require('./vector2.js');

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
