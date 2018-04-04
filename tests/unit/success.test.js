const beaver = require('../../lib');
const logMock = require('../../utils/log-mock');
const assert = require('assert');

const { unit } = beaver;
logMock.apply();

unit(() => assert.equal(1, 1));
