const sinon = require('sinon');
const beaver = require('../../../lib/index');
const assert = require('assert');

const { unit } = beaver;

const consoleStub = sinon.stub(console, 'log').callThrough();

unit('1 should equal 1',() => assert.equal(1, 1));

setTimeout(() => {
  assert(consoleStub.calledWith('1 should equal 1 => ✓'));
  assert(consoleStub.calledWith('0 failed, 1 succeeded'));
}, 0);