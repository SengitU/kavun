const assert = require('assert');
const execute = require('../lib/execute');
const { spec, unit } = require('../lib');

spec('execute', () => {
  unit('should return true for succeeding executable', async () => {
    const succeedingExecutable = () => assert.equal(1, 1);
    await execute(succeedingExecutable).then(res => assert(res));
  });

  unit('should return expected and actual values for failing executable', async () => {
    const failingExecutable = () => assert.equal(0, 1);
    const failureObj = {
      expected: 1,
      actual: 0
    };
    await execute(failingExecutable).then(res => assert.deepEqual(failureObj, res));
  });

  unit('should be able to execute async functions', async () => {
    const failingExecutable = () => new Promise((resolve) => resolve(assert.equal(0, 1)));
    const failureObj = {
      expected: 1,
      actual: 0
    };
    await execute(failingExecutable).then(res => assert.deepEqual(failureObj, res));
  });
});
