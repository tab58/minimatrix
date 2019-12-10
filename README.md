# minimatrix

A linear algebra package for small matrices and vectors.

## Motivation

There are a lot of matrix libraries that deal with large n-dimensional matrices. Although they may work for small matrices as well, there are some optimizations that can be made if you know ahead of time what dimensions you're working with.

This library was primarily motivated by a 2D algebraic geometry library, curve2d, which uses projective geometry to calculate intersections with conics. The work is primarily 2x2 and 3x3 matrices. However, this library can be used in other applications, such as computer vision. 

# Tests

The tests are runnable documentation.

Tests can be run in the terminal:

- Enter `npm test`. 

The npm browser script builds the project and wraps it so that the tests can run. For the changes in the project to be reflected in the tests, the browser script must be re-run.

## Author

(c) Tim Bright, 2017.

This library has been influenced by the various authors of the THREE.js math functions. Attributions of their individual contributions are given in the various source files.

## License

MIT License

Copyright (c) 2017 Tim Bright

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.