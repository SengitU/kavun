const sinon = require('sinon');
const beaver = require('../../../lib/index');
const assert = require('assert');

const { spec } = beaver;

console.log = sinon.stub();

spec("equality spec", (unit) => {
  unit("1 should equal 1", () => assert.equal(1, 1));
  unit("2 should equal 2", () => assert.equal(2, 2));
});

spec("yet another equality spec", (unit) => {
  unit("3 should equal 3", () => assert.equal(3, 3));
  unit("4 should equal 4", () => assert.equal(4, 4));
});

setTimeout(() => {
  assert(console.log.calledWith("equality spec"));
  assert(console.log.calledWith("1 should equal 1 => ✓"));
  assert(console.log.calledWith("2 should equal 2 => ✓"));
  assert(console.log.calledWith("yet another equality spec"));
  assert(console.log.calledWith("3 should equal 3 => ✓"));
  assert(console.log.calledWith("4 should equal 4 => ✓"));
  assert(console.log.calledWith("0 failed, 4 succeeded"));
}, 0);
