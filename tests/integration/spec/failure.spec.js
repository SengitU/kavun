const sinon = require('sinon');
const beaver = require('../../../lib/index');
const assert = require('assert');

const { spec } = beaver;

console.log = sinon.stub();

spec('Inequality spec', (unit) => {
  unit('0 should equal 1', () => assert.equal(0, 1));
  unit('2 should equal 2', () => assert.equal(2, 2));
  unit('1 should equal 1', () => assert.equal(1, 1));
  unit('0 should equal 2', () => assert.equal(0, 2));
  unit('4 should equal 4', () => assert.equal(4, 4));
});

setTimeout(() => {
  assert(console.log.calledWith("Inequality spec"));
  assert(console.log.calledWith("0 should equal 1 => x"));
  assert(console.log.calledWith("2 should equal 2 => ✓"));
  assert(console.log.calledWith("1 should equal 1 => ✓"));
  assert(console.log.calledWith("0 should equal 2 => x"));
  assert(console.log.calledWith("4 should equal 4 => ✓"));
  assert(console.log.calledWith("2 failed, 3 succeeded"));
}, 0);
