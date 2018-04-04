const beaver = require('../../lib');
const assert = require('assert');

const { unit } = beaver;

assert.equal(
  true,
  unit(() => assert.equal(1, 1))
);