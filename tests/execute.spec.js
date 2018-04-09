const assert = require('assert');
const execute = require('../lib/execute');
const beaver = require('../lib');

const { spec } = beaver;

spec('execute', (unit) => {
  unit('should return true for succeeding executable', () => {
    const succeedingExecutable = () => assert.equal(1, 1);
    assert(execute(succeedingExecutable));
  });

  unit('should return false for failing executable', () => {
    const failingExecutable = () => assert.equal(0, 1);
    assert.equal(false, execute(failingExecutable));
  });

  unit('should be able to execute async functions', () => {
    const failingExecutable = () => Promise.resolve(() => assert.equal(0, 1));
    assert.equal(false, execute(failingExecutable));
  });
});
