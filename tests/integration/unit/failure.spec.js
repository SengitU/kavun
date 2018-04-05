const sinon = require('sinon');
const beaver = require('../../../lib/index');
const assert = require('assert');

const { unit } = beaver;

console.log = sinon.stub();

unit('0 should equal 1', () => assert.equal(0, 1));

setTimeout(() => {
  assert(console.log.calledWith('0 should equal 1 => x'));
  assert(console.log.calledWith('1 failed, 0 succeeded'));
}, 0);