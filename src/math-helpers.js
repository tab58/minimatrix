'use strict';

/**
 * @namespace Helpers
 */

const _Math = require('./stdMath.js');
const Compare = require('./compare.js');

/**
 * Reduces a matrix to reduced row echelon form.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} M The matrix.
 * @param {number} TOL The numerical tolerance for zero comparison.
 */
function rrefInPlace (M, TOL = 1e-14) {
  const me = M.elements;
  // iterate through all rows to get to REF
  for (let i = 0; i < 3; ++i) {
    // search for largest in col and swap
    const k = findLargestInCol(M, i, i);
    if (k !== i) {
      swapRowsInPlace(M, i, k);
    }
    // scale and add current row to all rows underneath
    const largestElem = me[(i * 3) + i];
    if (!Compare.isZero(largestElem, TOL)) {
      scaleRow(M, i, 1.0 / largestElem);
      for (let j = i + 1; j < 3; ++j) {
        const scaleElem = me[(i * 3) + j];
        if (!Compare.isZero(scaleElem, TOL)) {
          scaleAndAddRow(M, i, j, -scaleElem);
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
          scaleAndAddRow(M, i, j, -scaleElem);
        }
      }
    }
  }
  return M;
}

/**
 * Tests if a row in a matrix is nonzero.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} M The matrix.
 * @param {number} i The row index.
 * @param {number} TOL The numerical tolerance.
 */
function isRowNonzero (M, i, TOL = 1e-14) {
  const me = M.elements;
  return !(Compare.isZero(me[i], TOL) &&
            Compare.isZero(me[i + 3], TOL) &&
            Compare.isZero(me[i + 6], TOL));
}

/**
 * Finds the largest absolute valued element in a matrix.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} M The matrix.
 */
function findLargestAbsElement (M) {
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
}

/**
 * Finds the largest element in the matrix row.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} M The matrix.
 * @param {number} i The row index.
 * @returns {number} The column index of the row's largest element.
 */
function findLargestInRow (M, i) {
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
}

/**
 * Finds the largest element in the matrix column.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} M The matrix.
 * @param {number} i The column index.
 * @returns {number} The row index of the column's largest element.
 */
function findLargestInCol (M, i, startAtRow = 0) {
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
}

/**
 * Finds the first nonvanishing element.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} M The matrix.
 * @param {number} TOL The numerical tolerance.
 * @returns {Object} The information for the nonvanishing element.
 */
function findFirstNonvanishing (M, TOL) {
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
}

/**
 * Swaps the values in the array.
 * @memberof Helpers
 * @param {number[]} A The array.
 * @param {number} i The index of the first value.
 * @param {number} j The index of the second value.
 */
function swapValuesInArray (A, i, j) {
  if (i !== j) {
    const tmp = A[i];
    A[i] = A[j];
    A[j] = tmp;
  }
  return A;
}

/**
 * Swaps two rows in the matrix.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} M The matrix.
 * @param {number} i The first row index.
 * @param {number} j The second row index.
 */
function swapRowsInPlace (M, i, j) {
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
}

/**
 * Scales the row in the matrix given by the index.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} M The matrix.
 * @param {number} row The row index.
 * @param {number} scale The number to scale by.
 */
function scaleRow (M, row, scale) {
  const me = M.elements;
  let i = row;
  let alpha = (scale === undefined ? 1.0 : scale);
  me[i] *= alpha;
  me[i + 3] *= alpha;
  me[i + 6] *= alpha;
}

/**
 * Scales and adds the source row to the destination row.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} m The matrix.
 * @param {number} srcRow The original row index.
 * @param {number} destRow The destination row index for the sum to be in.
 * @param {number} scale The number to scale the source row by.
 */
function scaleAndAddRow (m, srcRow, destRow, scale) {
  const me = m.elements;
  let i = destRow;
  let j = srcRow;
  let alpha = (scale === undefined ? 1.0 : scale);
  me[i] += me[j] * alpha;
  me[i + 3] += me[j + 3] * alpha;
  me[i + 6] += me[j + 6] * alpha;
}

/**
 * Thresholds all values of a matrix whose magnitude is less than the numerical tolerance.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} m The matrix.
 * @param {number} TOL The numerical tolerance.
 */
function thresholdToZero (m, TOL) {
  const me = m.elements;
  for (let i = 0; i < 9; ++i) {
    if (Compare.isZero(me[i], TOL)) {
      me[i] = 0;
    }
  }
  return m;
}

/**
 * Solves the Ax=b problem with an LU decomposition.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} A The LU decomposed matrix.
 * @param {number[]} P The permutation array.
 * @param {Vector2|Vector3|Vector4} b The right side vector in the Ax=b problem.
 * @param {Vector2|Vector3|Vector4} X The solution to the problem.
 */
function luSolve (A, P, b, X) {
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
}

/**
 * Computes the LU decomposition.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} A The matrix to decompose.
 * @param {boolean} inPlace Overwrites the A matrix with the LU decomposition if true, creates a new matrix if false.
 */
function luDecomposition (A, inPlace) {
  const n = A.dimension;
  const AA = inPlace ? A : A.clone();
  const a = AA.elements; // indexed via a_ij = a[i + j * n]
  const P = [];

  const rowScalers = [];
  for (let i = 0; i < n; ++i) {
    P.push(i);
    const col = findLargestInRow(A, i);
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
    swapRowsInPlace(A, j, pivotIndex);
    swapValuesInArray(P, j, pivotIndex);
    swapValuesInArray(rowScalers, j, pivotIndex);
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
}

/**
 * Computes the projection of one vector against another.
 * @memberof Helpers
 * @param {Vector2|Vector3|Vector4} u The vector to project.
 * @param {Vector2|Vector3|Vector4} v The vector to be projected against.
 */
function proj (u, v) {
  return u.clone().multiplyScalar(u.dot(v) / u.dot(u));
}

/**
 * Orthogonalizes a matrix using the modified Gram-Schmidt algorithm.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} m The matrix.
 */
function modifiedGramSchmidt (m) {
  const n = m.dimension;

  const v0 = m.getColumn(0);
  const u0 = v0;
  const v1 = m.getColumn(1);
  const u1 = v1.clone().sub(proj(u0, v1));
  if (n === 2) {
    m.setColumns(v0, v1);
    return;
  }
  const v2 = m.getColumn(2);
  const u2t = v2.clone().sub(proj(u0, v2));
  const u2 = u2t.sub(proj(u1, u2t));
  if (n === 3) {
    m.setColumns(u0, u1, u2);
    // return;
  }
}

/**
 * Computes the Givens rotation values for a vector.
 * @memberof Helpers
 * @param {number} a The x-component of a vector rotated back to a vector on the X-axis.
 * @param {number} b The y-component of a vector rotated back to a vector on the X-axis.
 * @param {array} csr (Optional) An array for the values to saved into, if provided. If not, a new array is created.
 */
function rotg (a, b, csr) {
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
}

/**
 * Computes the QR decomposition of a matrix.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} A The matrix to decompose.
 * @param {boolean} inPlace Overwrites the A matrix with the R matrix.
 */
function qrDecomposition (A, inPlace) {
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
      rotg(a, b, csr);
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
}

/**
 * Computes the rank of a matrix.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} M The matrix to get the rank of.
 * @param {number} EPS The numerical tolerance for an element to be zero.
 */
function getRank (M, EPS) {
  const n = M.dimension;
  const { R } = qrDecomposition(M);
  // TODO: this is a bad way of doing this probably
  R.thresholdEntriesToZero(100 * EPS);
  let rank = 0;
  rrefInPlace(R);
  for (let i = 0; i < n; ++i) {
    if (isRowNonzero(R, i)) {
      rank++;
    }
  }
  return rank;
}

/**
 * Computes the Householder transform vector and scale.
 * @memberof Helpers
 * @param {Vector2|Vector3|Vector4} x The vector to rotate.
 */
function householderTransform (x) {
  // Based on "Matrix Computations" by Golub, Van Loan
  const n = x.dimension;
  const v = x.clone();
  v.x = 1;
  let sigma = 0;
  for (let i = 1; i < n; ++i) {
    const vi = v.getComponent(i);
    sigma += vi * vi;
  }
  let beta = 0;
  if (sigma !== 0) {
    const x1 = x.x;
    const mu = _Math.sqrt(x1 * x1 + sigma);
    const v1 = (x1 <= 0 ? x1 - mu : -sigma / (x1 + mu));
    v.x = v1;
    beta = 2 * v1 * v1 / (sigma + v1 * v1);
    v.multiplyScalar(1.0 / v1);
  }
  return {
    v,
    beta
  };
}

/**
 * Computes a Hessenberg step of the QR algorithm.
 * @memberof Helpers
 * @param {Matrix2|Matrix3|Matrix4} M The matrix to step.
 */
function hessenbergQRStep (M) {
  const n = M.dimension;
  const me = M.elements;
  const csr = [0, 0, 0];
  const cs = [];
  for (let k = 0; k < n - 1; ++k) {
    const row1 = k;
    const row2 = k + 1;
    const colK = k * n;
    const a = me[row1 + colK];
    const b = me[row2 + colK];
    rotg(a, b, csr);
    const c = csr[0];
    const s = csr[1];
    const r = csr[2];
    cs[k] = [c, s];
    for (let x = k; x < n; ++x) {
      const colX = x * n;
      const tmp1 = me[row1 + colX];
      const tmp2 = me[row2 + colX];
      me[row1 + colX] = c * tmp1 + s * tmp2;
      me[row2 + colX] = -s * tmp1 + c * tmp2;
    }
    me[row1 + colK] = r;
    me[row2 + colK] = 0;
  }
  for (let k = 0; k < n - 1; ++k) {
    const col1 = k * n;
    const col2 = (k + 1) * n;
    const [c, s] = cs[k];
    for (let x = 0; x <= k + 1; ++x) {
      const rowX = x;
      const tmp1 = me[rowX + col1];
      const tmp2 = me[rowX + col2];
      me[rowX + col1] = tmp1 * c + tmp2 * s;
      me[rowX + col2] = -tmp1 * s + tmp2 * c;
    }
  }
  return M;
}

module.exports = {
  rrefInPlace,
  isRowNonzero,
  findLargestAbsElement,
  findLargestInRow,
  findLargestInCol,
  findFirstNonvanishing,
  swapValuesInArray,
  swapRowsInPlace,
  scaleRow,
  scaleAndAddRow,
  thresholdToZero,
  luSolve,
  luDecomposition,
  proj,
  modifiedGramSchmidt,
  rotg,
  qrDecomposition,
  getRank,
  householderTransform,
  hessenbergQRStep
};
