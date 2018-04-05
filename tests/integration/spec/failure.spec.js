const sinon = require('sinon');
const beaver = require('../../../lib/index');
const assert = require('assert');

const { spec } = beaver;

const consoleStub = sinon.stub(console, 'log').callThrough();

spec('Inequality spec', (unit) => {
  unit('0 should equal 1', () => assert.equal(0, 1));
  unit('2 should equal 2', () => assert.equal(2, 2));
  unit('1 should equal 1', () => assert.equal(1, 1));
  unit('0 should equal 2', () => assert.equal(0, 2));
  unit('4 should equal 4', () => assert.equal(4, 4));
});

setTimeout(() => {
  assert(consoleStub.calledWith("Inequality spec"));
  assert(consoleStub.calledWith("0 should equal 1 => x"));
  assert(consoleStub.calledWith("2 should equal 2 => ✓"));
  assert(consoleStub.calledWith("1 should equal 1 => ✓"));
  assert(consoleStub.calledWith("0 should equal 2 => x"));
  assert(consoleStub.calledWith("4 should equal 4 => ✓"));
  assert(consoleStub.calledWith("2 failed, 3 succeeded"));
}, 0);
