const assert = require('assert');
const execute = require('../lib/execute');

// spec('execute', () => {
//   unit('should return true for succeeding executable', () => {
    const succeedingExecutable = () => assert.equal(1, 1);
    assert.equal(true, execute(succeedingExecutable));
//   });
// });

// spec('execute', () => {
//   unit('should return false for failing executable', () => {
    const failingExecutable = () => assert.equal(0, 1);
    assert.equal(false, execute(failingExecutable));
//   });
// });
