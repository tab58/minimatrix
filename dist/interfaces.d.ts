export interface Matrix {
    /**
     * The number of rows in the matrix.
     */
    rowDimension: number;
    /**
     * The number of columns in the matrix.
     */
    colDimension: number;
    /**
     * Sets the matrix as the identity matrix.
     */
    identity(): this;
    /**
     * Clones the matrix.
     * @returns {Matrix} A new matrix with the same element values.
     */
    clone(): this;
    /**
     * Copies the element values of the given matrix.
     * @param {Matrix} m The given matrix.
     */
    copy(m: this): this;
    /**
     * Right-multiplies the given matrix with this one (this * m).
     * @param {Matrix} m The given matrix.
     */
    multiply(m: this): this;
    /**
     * Left-multiplies the given matrix with this one (m * this).
     * @param {Matrix} m The given matrix.
     */
    premultiply(m: this): this;
    /**
     * Multiplies two 2x2 matrices (A * B).
     * @param {Matrix} a The A matrix.
     * @param {Matrix} b The B matrix.
     */
    multiplyMatrices(a: this, b: this): this;
    /**
     * Scales a matrix.
     * @param {number} s The number to scale by.
     */
    multiplyScalar(s: number): this;
    /**
     * Computes the determinant of the matrix.
     * @returns {number} The determinant.
     */
    determinant(): number;
    /**
     * Computes the inverse of the given matrix and assigns it to this matrix.
     * @param {Matrix} matrix The given matrix.
     * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
     */
    getInverse(matrix: this, throwOnDegenerate: boolean): this;
    /**
     * Inverts this matrix.
     * @param {boolean} throwOnDegenerate Throws an Error() if true, prints console warning if not.
     */
    invert(throwOnDegenerate: boolean): this;
    /**
     * Transposes this matrix in-place.
     */
    transpose(): this;
    /**
     * Computes the adjugates of this matrix in-place.
     */
    adjugate(): this;
    /**
     * Computes the adjugate of the given matrix and assigns it to this matrix.
     * @param {Matrix} m The given matrix.
     */
    getAdjugate(m: this): this;
    /**
     * Computes the trace of this matrix.
     * @returns {number} The matrix trace.
     */
    trace(): number;
    /**
     * Compares the equality with a given matrix (strict).
     * @param {Matrix} m The given matrix.
     */
    equals(m: this): boolean;
    /**
     * Loads values from an array into a matrix.
     * @param {number[]} array The array to populate the matrix from.
     * @param {number} offset The numeric array offset.
     */
    fromArray(array: number[], offset: number): this;
    /**
     * Loads values into an array into a matrix.
     * @param {number[]} array The array to populate the matrix values into.
     * @param {number} offset The numeric array offset.
     */
    toArray(array: number[], offset: number): number[];
    /**
     * Adds 2 matrices together and optionally scales the result.
     * @param {Matrix} a The first matrix.
     * @param {Matrix} b The second matrix.
     * @param {number} scalar The number to scale the result by.
     */
    addMatrices(a: this, b: this, scalar: number): this;
    /**
     * Adds a given matrix to this matrix.
     * @param {Matrix} m The given matrix.
     */
    add(m: this): this;
    /**
     * Swaps rows in-place in the matrix. Zero is the first row.
     */
    swapRows(i: number, j: number): this;
    /**
     * Swaps columns in-place in the matrix. Zero is the first column.
     */
    swapColumns(i: number, j: number): this;
    /**
     * Sets the value of the matrix in (row, col) = (i, j) position.
     */
    set(i: number, j: number, value: number): this;
    /**
     * Gets the value of the matrix in (row, col) = (i, j) position.
     */
    get(i: number, j: number): number;
    /**
     * Prints out the matrix in a more human-readable format.
     */
    prettyPrint(): string;
    /**
     * Apply a function directly to the matrix elements.
     */
    applyFunction(fn: (elements: number[]) => void): void;
}
export interface Vector {
    dimension: number;
    /** Clones the vector. */
    clone(): this;
    /**
     * Sets the vector components to a scalar.
     * @param {number} scalar The scalar.
     * @returns {Vector} This vector.
     */
    setScalar(scalar: number): this;
    /**
     * Sets the vector component by index: [X, Y, Z]
     * @param {number} idx The index of the component (0-1).
     * @param {number} val The value to set the component to.
     * @returns {Vector} This vector.
     */
    setComponent(idx: number, val: number): this;
    /**
     * Gets the vector component by index: [X, Y, Z]
     * @param {number} index The index of the component (0-1).
     * @returns {number} The component value.
     */
    getComponent(index: number): number;
    /**
     * Adds a vector to this vector.
     * @param {Vector} v The vector to add.
     * @returns {Vector} This vector.
     */
    add(v: this): this;
    /**
     * Adds a scalar to every component of this vector.
     * @param {number} s The scalar to add.
     * @returns {Vector} This vector.
     */
    addScalar(s: number): this;
    /**
     * Adds 2 vectors and assigns the result to this vector.
     * @param {Vector} a The first addend.
     * @param {Vector} b The second addend.
     * @returns {Vector} This vector.
     */
    addVectors(a: this, b: this): this;
    /**
     * Scales a vector by a scalar and adds the result to this vector.
     * @param {Vector} v The vector.
     * @param {number} s The scalar to scale by.
     * @returns {Vector} This vector.
     */
    addScaledVector(v: this, s: number): this;
    /**
     * Subtracts a vector from this vector.
     * @param {Vector} v The vector to subtract.
     * @returns {Vector} This vector.
     */
    sub(v: this): this;
    /**
     * Subtracts a scalar from each component of this vector.
     * @param {number} s The scalar to subtract.
     * @returns {Vector} This vector.
     */
    subScalar(s: number): this;
    /**
     * Subtracts 2 vectors and assigns the value to this vector.
     * @param {Vector} a The minuend.
     * @param {Vector} b The subtrahend.
     * @returns {Vector} This vector.
     */
    subVectors(a: this, b: this): this;
    /**
     * Multiplies element-wise a vector with this one.
     * @param {Vector} v The vector.
     * @returns {Vector} This vector.
     */
    multiply(v: this): this;
    /**
     * Scales this vector by a number.
     * @param {number} scalar The number to scale by.
     * @returns {Vector} This vector.
     */
    multiplyScalar(scalar: number): this;
    /**
     * Multiplies the vector components element-wise.
     * @param {Vector} a The first vector.
     * @param {Vector} b The second vector.
     * @returns {Vector} This vector.
     */
    multiplyVectors(a: this, b: this): this;
    /**
     * Divides element-wise this vector by a vector.
     * @param {Vector} v The vector to divide by.
     * @returns {Vector} This vector.
     */
    divide(v: this): this;
    /**
     * Scales this vector by the inverse of the given scalar.
     * Doesn't check for divide by zero.
     * @param {number} scalar The scalar to divide by.
     * @returns {Vector} This vector.
     */
    divideScalar(scalar: number): this;
    /**
     * Takes the minimum of each component of this vector and the given vector.
     * @param {Vector} v The given vector.
     * @returns {Vector} This vector.
     */
    min(v: this): this;
    /**
     * Takes the maximum of each component of this vector and the given vector.
     * @param {Vector} v The given vector.
     * @returns {Vector} This vector.
     */
    max(v: this): this;
    /**
     * Clamps this vector between the values of the minimum and maximum vectors.
     * This function assumes min < max, if this assumption isn't true it will not operate correctly.
     * @param {Vector} min The minimum value vector.
     * @param {Vector} max The maximum value vector.
     * @returns {Vector} This vector.
     */
    clamp(min: this, max: this): this;
    /**
     * Rounds each component of the vector to the lowest integer.
     * @returns {Vector} This vector.
     */
    floor(): this;
    /**
     * Rounds each component of the vector to the highest integer.
     * @returns {Vector} This vector.
     */
    ceil(): this;
    /**
     * Rounds each component of the vector via Math.round().
     * @returns {Vector} This vector.
     */
    round(): this;
    /**
     * Rounds each component of the vector toward zero (down if positive, up if negative).
     * @returns {Vector} This vector.
     */
    roundToZero(): this;
    /**
     * Negates each component of the vector.
     * @returns {Vector} This vector.
     */
    negate(): this;
    /**
     * Computes the dot product between this vector and the given vector.
     * @param {Vector} v The given vector.
     * @returns {number} The dot product.
     */
    dot(v: this): number;
    /**
     * Computes the square of the length of the vector,
     * i.e. the dot product of this vector with itself.
     * @returns {number} The squared length of the vector.
     */
    lengthSq(): number;
    /**
     * Computes the length of the vector. Compensates for over/underflow.
     * @returns {number} The length of the vector.
     */
    length(): number;
    /**
     * Normalizes the vector, i.e. makes it unit length.
     * @returns {Vector} This vector.
     */
    normalize(): this;
    /**
     * Computes the angle between this vector and the given vector.
     * @param {Vector} v The given vector.
     * @returns {number} The angle between the vectors.
     */
    angleTo(v: this): number;
    /**
     * Computes the distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {Vector} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    distanceTo(v: this): number;
    /**
     * Computes the squared distance from a point measured from the origin to the point
     * this vector points to when the base translated to the origin.
     * @param {Vector} v The point as measured from the origin.
     * @returns {number} The distance from point to point.
     */
    distanceToSquared(v: this): number;
    /**
     * Determines equality between this vector and the given vector.
     * @param {Vector} v The given vector.
     * @param {number} tol The numerical tolerance.
     * @returns {boolean} True if all the component value differences are below the numeric tolerance, false if not.
     */
    equals(v: this, tol?: number): boolean;
    /**
     * Sets the length of this vector/
     * @param {number} length The new length of the vector.
     * @returns {Vector} This vector.
     */
    setLength(length: number): this;
    /**
     * Computes a linear interpolation between this vector and the given vector.
     * @param {Vector} v The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector} This vector.
     */
    lerp(v: this, alpha: number): this;
    /**
     * Linearly interpolates vectors.
     * @param {Vector} v1 The vector at alpha = 0.
     * @param {Vector} v2 The vector at alpha = 1.
     * @param {number} alpha The linear interpolation factor.
     * @returns {Vector} This vector.
     */
    lerpVectors(v1: this, v2: this, alpha: number): this;
    /**
     * Loads a vector from an array.
     * @param {number[]} array The array with values.
     * @param {number} offset The offset to start from in the array. Default is zero.
     * @returns {Vector} This vector.
     */
    fromArray(array: number[], offset: number): this;
    /**
     * Loads an array from this vector.
     * @param {number} array The array to put the values in.
     * @param {number} offset The offset to start from in the array. Default is zero.
     * @returns {Vector} This vector.
     */
    toArray(array: number[], offset: number): number[];
}
