const assert = require('assert');
const execute = require('../lib/execute');
const beaver = require('../lib');

const { spec, unit } = beaver;

spec('execute', () => {
  unit('should return true for succeeding executable', async () => {
    const succeedingExecutable = () => assert.equal(1, 1);
    await execute(succeedingExecutable).then(res => assert(res));
  });

  unit('should return false for failing executable', async () => {
    const failingExecutable = () => assert.equal(0, 1);
    await execute(failingExecutable).then(res => assert.equal(false, res));
  });

  unit('should be able to execute async functions', async () => {
    const failingExecutable = () => new Promise((resolve) => resolve(assert.equal(0, 1)));
    await execute(failingExecutable).then(res => assert.equal(false, res));
  });
});
