'use strict';

// Makes the tests run in Node and in the browser
global.expect = require('chai').expect;
global.Minimatrix = require('../src/index.js');

const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

// Instantiate a Mocha instance.
var mocha = new Mocha({
  reporter: 'spec',
  ui: 'tdd'
});

var testDir = path.join(__dirname, '/specs');

// Add each .js file to the mocha instance
const jsFiles = fs.readdirSync(testDir).filter(file => file.substr(-3) === '.js');
jsFiles.forEach(file => {
  mocha.addFile(path.join(testDir, file));
});

// Run the tests.
mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures);  // exit with non-zero status if there were failures
  });
});

console.log('Run the Mocha tests.');
