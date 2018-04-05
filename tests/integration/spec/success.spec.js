const sinon = require('sinon');
const beaver = require('../../../lib/index');
const assert = require('assert');

const { spec } = beaver;

const consoleStub = sinon.stub(console, 'log').callThrough();

spec("equality spec", (unit) => {
  unit("1 should equal 1", () => assert.equal(1, 1));
  unit("2 should equal 2", () => assert.equal(2, 2));
});

spec("yet another equality spec", (unit) => {
  unit("3 should equal 3", () => assert.equal(3, 3));
  unit("4 should equal 4", () => assert.equal(4, 4));
});

setTimeout(() => {
  assert(consoleStub.calledWith("equality spec"));
  assert(consoleStub.calledWith("1 should equal 1 => ✓"));
  assert(consoleStub.calledWith("2 should equal 2 => ✓"));
  assert(consoleStub.calledWith("yet another equality spec"));
  assert(consoleStub.calledWith("3 should equal 3 => ✓"));
  assert(consoleStub.calledWith("4 should equal 4 => ✓"));
  assert(consoleStub.calledWith("0 failed, 4 succeeded"));
}, 0);
