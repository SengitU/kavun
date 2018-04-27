const assert = require('assert');
const execute = require('../lib/execute');
const { spec, unit } = require('../lib');

spec('execute', () => {
  unit('should return true for succeeding executable', async () => {
    const succeedingExecutable = () => assert.equal(1, 1);
    await execute(succeedingExecutable).then(res => assert(res.result));
  });

  spec('Assertion Error', () => {
    unit('should return expected and actual values for failing executable', async () => {
      const failingExecutable = () => assert.equal(0, 1);
      const failureObj = {
        result: false,
        description: `AssertionError: 0 == 1`
      };
      await execute(failingExecutable).then(res => assert.deepEqual(failureObj, res));
    });
  
    unit('should be able to execute async functions', async () => {
      const failingExecutable = () => new Promise((resolve) => resolve(assert.equal(0, 1)));
      const failureObj = {
        result: false,
        description: `AssertionError: 0 == 1`
      };
      await execute(failingExecutable).then(res => assert.deepEqual(failureObj, res));
    });
  });

  spec('Other Errors', () => {
    unit('should return description and stack trace', async () => {
      const referrenceErrorExecutable = () => assert(notDefined);
      const failureObj = {
        result: false,
        reason: 'ReferenceError: notDefined is not defined'
      }
      const actualFailureObj = await execute(referrenceErrorExecutable);
      
      assert.equal(failureObj.result, actualFailureObj.result);
    });
  });
});
