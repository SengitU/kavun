const beaver = require('../../lib');
const logMock = require('../../utils/log-mock');
const assert = require('assert');

const { unit } = beaver;
logMock.apply();

unit('1 should equal 1',() => assert.equal(1, 1));

setTimeout(() => {
  assert.equal(true, logMock.getMessages().indexOf('1 should equal 1 => ✓') > -1);
  assert.equal(true, logMock.getMessages().indexOf('All tests passed') > -1);
}, 0);