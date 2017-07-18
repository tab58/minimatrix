# mini-matrix

A linear algebra package for 2x2 and 3x3 matrices and 2D/3D vectors.

## Motivation

There are a lot of matrix libraries that deal with large n-dimensional matrices. Although they may work for small matrices as well, there are some optimizations that can be made if you know ahead of time what dimensions you're working with.

This library was primarily motivated by a 2D algebraic geometry library, curve2d, which uses projective geometry to calculate intersections with conics. The work is primarily 2x2 and 3x3 matrices. However, this library can be used in other applications, such as computer vision. 

4x4 matrices are very common and in the future, support can be extended for work with them.

## Author

Tim Bright, 2017.

This library has been influenced by the various authors of the THREE.js math functions. Attributions of their individual contributions are given in the various source files.

## License

MIT License.