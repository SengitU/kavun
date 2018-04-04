const beaver = require('../../lib');
const logMock = require('../../utils/log-mock');
const assert = require('assert');

const { spec } = beaver;

logMock.apply();

spec((unit) => {
  unit(() => assert.equal(1, 1));
  unit(() => assert.equal(2, 2));
});

spec((unit) => {
  unit(() => assert.equal(3, 3));
  unit(() => assert.equal(4, 4));
});

setTimeout(() => assert.equal(true, logMock.getMessages().indexOf('All tests passed') > -1), 1000);
