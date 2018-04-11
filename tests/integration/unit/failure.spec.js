const sinon = require('sinon');
const beaver = require('../../../lib/index');
const assert = require('assert');

const { unit } = beaver;

const consoleStub = sinon.stub(console, 'log').callThrough();

unit('0 should equal 0', () => assert.equal(0, 1));

setTimeout(() => {
  assert(consoleStub.calledWith('0 should equal 0 => x'));
  assert(consoleStub.calledWith('\tActual: 0, Expected: 1'));
  assert(consoleStub.calledWith('1 failed, 0 succeeded'));
}, 1000);