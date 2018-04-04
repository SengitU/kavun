const beaver = require('../../lib');
const logMock = require('../../utils/log-mock');
const assert = require('assert');

const { unit } = beaver;
logMock.apply();

unit('0 should equal 0', () => assert.equal(0, 1));

setTimeout(() => {
  assert.equal(true, logMock.toHaveBeenCalledWith('0 should equal 0 => X'));
  assert.equal(true, logMock.toHaveBeenCalledWith('1 failure, 0 pass'));
}, 0);