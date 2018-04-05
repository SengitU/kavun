const sinon = require('sinon');
const beaver = require('../../../lib/index');
const assert = require('assert');

const { unit } = beaver;

console.log = sinon.stub();

unit('1 should equal 1',() => assert.equal(1, 1));

setTimeout(() => {
  assert(console.log.calledWith('1 should equal 1 => ✓'));
  assert(console.log.calledWith('0 failed, 1 succeeded'));
}, 0);