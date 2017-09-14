'use strict';

const _Math = require('./stdMath.js');
const Compare = require('./compare.js');

const helpers = {
  rrefInPlace: function (M, TOL = 1e-14) {
    const me = M.elements;
    // iterate through all rows to get to REF
    for (let i = 0; i < 3; ++i) {
      // search for largest in col and swap
      const k = helpers.findLargestInCol(M, i, i);
      if (k !== i) {
        helpers.swapRowsInPlace(M, i, k);
      }
      // scale and add current row to all rows underneath
      const largestElem = me[(i * 3) + i];
      if (!Compare.isZero(largestElem, TOL)) {
        helpers.scaleRow(M, i, 1.0 / largestElem);
        for (let j = i + 1; j < 3; ++j) {
          const scaleElem = me[(i * 3) + j];
          if (!Compare.isZero(scaleElem, TOL)) {
            helpers.scaleAndAddRow(M, i, j, -scaleElem);
          }
        }
      }
    }
    // iterate back through to get RREF since everything on diagonals should be 1 or 0
    for (let i = 2; i >= 0; --i) {
      const val = me[(i * 3) + i];
      if (!Compare.isZero(val, TOL)) {
        for (let j = i - 1; j >= 0; --j) {
          const scaleElem = me[(i * 3) + j];
          if (!Compare.isZero(scaleElem, TOL)) {
            helpers.scaleAndAddRow(M, i, j, -scaleElem);
          }
        }
      }
    }
    return M;
  },
  isRowNonzero: function (M, i, TOL = 1e-14) {
    const me = M.elements;
    return !(Compare.isZero(me[i], TOL) &&
              Compare.isZero(me[i + 3], TOL) &&
              Compare.isZero(me[i + 6], TOL));
  },
  findLargestAbsElement: function (M) {
    const te = M.elements;
    const n = M.dimension;
    let max = _Math.abs(te[0]);
    let rowCol = {
      row: 0,
      column: 0,
      value: te[0]
    };
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        const val = te[i * n + j];
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
  findLargestInRow: (M, i) => {
    // get the row:
    const m = M.elements;
    const n = M.dimension;
    const offset = i;

    let j = 0;
    let lrgElem = _Math.abs(m[offset]);
    let lrgCol = j;
    for (j = 1; j < n; ++j) {
      const val = _Math.abs(m[offset + j * n]);
      if (val > lrgElem) {
        lrgCol = j;
        lrgElem = val;
      }
    }
    return lrgCol;
  },
  findLargestInCol: function (M, i, startAtRow = 0) {
    let me = M.elements;
    let n = M.dimension;
    let offset = i * n;
    let maxIdx = startAtRow;
    let maxVal = _Math.abs(me[offset + maxIdx]);
    for (let i = maxIdx + 1; i < n; ++i) {
      let val = _Math.abs(me[offset + i]);
      if (val > maxVal) {
        maxIdx = i;
        maxVal = val;
      }
    }
    return maxIdx;
  },
  findFirstNonvanishing: function (M, TOL) {
    const te = M.elements;
    const n = M.dimension;
    let rowCol = {
      row: 0,
      column: 0,
      value: te[0]
    };
    if (Compare.isZero(te[0], TOL)) {
      for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
          const val = te[i * n + j];
          if (!Compare.isZero(val, TOL)) {
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
  swapValuesInArray: (A, i, j) => {
    if (i !== j) {
      const tmp = A[i];
      A[i] = A[j];
      A[j] = tmp;
    }
    return A;
  },
  swapRowsInPlace: function (M, i, j) {
    const me = M.elements;
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
  scaleRow: function (M, row, scale) {
    const me = M.elements;
    let i = row;
    let alpha = (scale === undefined ? 1.0 : scale);
    me[i] *= alpha;
    me[i + 3] *= alpha;
    me[i + 6] *= alpha;
  },
  scaleAndAddRow: function (m, srcRow, destRow, scale) {
    const me = m.elements;
    let i = destRow;
    let j = srcRow;
    let alpha = (scale === undefined ? 1.0 : scale);
    me[i] += me[j] * alpha;
    me[i + 3] += me[j + 3] * alpha;
    me[i + 6] += me[j + 6] * alpha;
  },
  thresholdToZero: function (m, TOL) {
    const me = m.elements;
    for (let i = 0; i < 9; ++i) {
      if (Compare.isZero(me[i], TOL)) {
        me[i] = 0;
      }
    }
    return m;
  },
  luSolve: function (A, P, b, X) {
    // Since PA = LU, then L(U x) = Pb
    const a = A.elements;
    const n = A.dimension;
    // L * y  = P * b, solve for y.
    // Implicit 1's on the diagonal.
    for (let i = 0; i < n; ++i) {
      let sum = 0;
      for (let j = 0; j < i; ++j) {
        sum += a[i + j * n] * X.getComponent(j);
      }
      const xi = b.getComponent(P[i]) - sum;
      X.setComponent(i, xi);
    }

    // U * x = y  ==> i = n-1 -> 0, j = 0
    for (let i = n - 1; i >= 0; --i) {
      let sum = 0;
      for (let j = i + 1; j < n; ++j) {
        sum += a[i + j * n] * X.getComponent(j);
      }
      const scale = a[i + i * n];
      // if (scale === 0) {
      //   consoleWarning(`luSolve(): x[${i}] is free.`);
      // }
      X.setComponent(i, (X.getComponent(i) - sum) / scale);
    }
    return X;
  },
  luDecomposition: function (A, inPlace) {
    const n = A.dimension;
    const AA = inPlace ? A : A.clone();
    const a = AA.elements; // indexed via a_ij = a[i + j * n]
    const P = [];

    const rowScalers = [];
    for (let i = 0; i < n; ++i) {
      P.push(i);
      const col = helpers.findLargestInRow(A, i);
      const scaler = a[col * n + i]; // row scaling
      if (scaler === 0) {
        throw new Error('luDecomposition(): matrix is singular and cannot be LU factorized.');
      }
      rowScalers[i] = scaler; // don't actually want to scale the matrix or else (PA != LU).
    }
    // iterate over columns to reduce the matrix
    // implicitly reduce the matrix
    for (let j = 0; j < n; ++j) {
      for (let i = 0; i < j; ++i) {
        // compute upper tri, computes values across the row
        let sum = 0;
        for (let k = 0; k < i; ++k) {
          sum += a[i + k * n] * a[k + j * n]; // avoid big + small roundoffs
        }
        a[i + j * n] = a[i + j * n] - sum;
      }
      let pivotLrgElem = 0;
      let pivotIndex = j;
      for (let i = j; i < n; ++i) {
        // compute lower tri and diagonal, computes values down the column
        let sum = 0;
        for (let k = 0; k < j; ++k) {
          sum += a[i + k * n] * a[k + j * n]; // avoid big + small roundoffs
        }
        a[i + j * n] = a[i + j * n] - sum;

        // find the pivot element
        const pivotTest = rowScalers[i] * Math.abs(a[i + j * n]);
        if (pivotTest > pivotLrgElem) {
          pivotLrgElem = pivotTest;
          pivotIndex = i;
        }
      }
      helpers.swapRowsInPlace(A, j, pivotIndex);
      helpers.swapValuesInArray(P, j, pivotIndex);
      helpers.swapValuesInArray(rowScalers, j, pivotIndex);
      if (j < n - 1) {
        const pivotScale = a[j + j * n];
        for (let i = j + 1; i < n; ++i) {
          a[i + j * n] /= pivotScale;
        }
      }
    }
    return {
      P,
      A
    };
  },
  proj: function (u, v) {
    return u.clone().multiplyScalar(u.dot(v) / u.dot(u));
  },
  modifiedGramSchmidt: function (m) {
    const n = m.dimension;

    const v0 = m.getColumn(0);
    const u0 = v0;
    const v1 = m.getColumn(1);
    const u1 = v1.clone().sub(helpers.proj(u0, v1));
    if (n === 2) {
      m.setColumns(v0, v1);
      return;
    }
    const v2 = m.getColumn(2);
    const u2t = v2.clone().sub(helpers.proj(u0, v2));
    const u2 = u2t.sub(helpers.proj(u1, u2t));
    if (n === 3) {
      m.setColumns(u0, u1, u2);
      // return;
    }
  },
  rotg: function (a, b, csr) {
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
  qrDecomposition: function (A, inPlace) {
    const Q = A.clone().identity();
    const R = inPlace ? A : A.clone();
    const qe = Q.elements;
    const re = R.elements;

    const csr = [0, 0, 0];
    const DIM = Q.dimension;
    const m = DIM;
    const n = DIM;
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
    return { Q, R };
  },
  getRank: function (M, EPS) {
    const n = M.dimension;
    const { R } = helpers.qrDecomposition(M);
    R.thresholdEntriesToZero(100 * EPS);
    let rank = 0;
    helpers.rrefInPlace(R);
    for (let i = 0; i < n; ++i) {
      if (helpers.isRowNonzero(R, i)) {
        rank++;
      }
    }
    return rank;
  }
};

module.exports = helpers;
