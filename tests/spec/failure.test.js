const beaver = require('../../lib');
const logMock = require('../../utils/log-mock');
const assert = require('assert');

const { spec, unit } = beaver;
logMock.apply();

spec(() => {
  unit(() => assert.equal(0, 1));
  unit(() => assert.equal(2, 2));
  unit(() => assert.equal(1, 1));
  unit(() => assert.equal(0, 2));
  unit(() => assert.equal(1, 1));
  unit(() => assert.equal(2, 2));
  unit(() => assert.equal(0, 1));
  unit(() => assert.equal(2, 2));
});

setTimeout(() => assert.equal(true, logMock.getMessages().indexOf('3 failure, 5 pass') > -1), 0);