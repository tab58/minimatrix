'use strict';

const minimatrix = require('../src/index.js');

const csr = [0, 0, 0];
minimatrix.Helpers.rotg(3, 4, csr);

console.log(csr);
