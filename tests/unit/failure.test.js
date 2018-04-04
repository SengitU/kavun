const beaver = require('../../lib');
const logMock = require('../../utils/log-mock');
const assert = require('assert');

const { unit } = beaver;
logMock.apply();

unit(() => assert.equal(0, 1));

setTimeout(() => assert.equal(true, logMock.getMessages().indexOf('1 failure, 0 pass') > -1), 0);