'use strict';

const path = require('path');

module.exports = [
  {
    entry: './test/mm-wrapper.js',
    output: {
      filename: 'minimatrix.js',
      path: path.join(__dirname)
    }
  }
];
