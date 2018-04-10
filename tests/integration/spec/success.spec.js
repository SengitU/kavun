const sinon = require('sinon');
const beaver = require('../../../lib/index');
const assert = require('assert');

const { spec, unit } = beaver;

const consoleStub = sinon.stub(console, 'log').callThrough();

spec("equality spec", () => {
  unit("1 should equal 1", () => assert.equal(1, 1));
  unit("2 should equal 2", () => assert.equal(2, 2));
});

spec("yet another equality spec", () => {
  unit("3 should equal 3", () => assert.equal(3, 3));
  unit("4 should equal 4", () => assert.equal(4, 4));
});

setTimeout(() => {
  assert(consoleStub.calledWith("equality spec 1 should equal 1 => ✓"));
  assert(consoleStub.calledWith("equality spec 2 should equal 2 => ✓"));
  assert(consoleStub.calledWith("yet another equality spec 3 should equal 3 => ✓"));
  assert(consoleStub.calledWith("yet another equality spec 4 should equal 4 => ✓"));
  assert(consoleStub.calledWith("0 failed, 4 succeeded"));
}, 1000);
