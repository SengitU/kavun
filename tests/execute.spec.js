const assert = require('assert');
const execute = require('../lib/execute');
const { spec, unit } = require('../lib');

spec('execute', () => {
  unit('should return true for succeeding executable', async () => {
    const succeedingExecutable = () => assert.equal(1, 1);
    await execute(succeedingExecutable).then(res => assert(res.result));
  });

  unit("should return elapsedTime for succeeding executable", async () => {
    const succeedingExecutable = () => assert.equal(1, 1);
    const { elapsedTime } = await execute(succeedingExecutable);

    assert.notEqual(elapsedTime, undefined)
  });

  unit("should return elapsedTime for failing executable", async () => {
    const failingExecutable = () => assert.equal(1, 0);
    const { elapsedTime } = await execute(failingExecutable);

    assert.notEqual(elapsedTime, undefined);
  });

  spec('Assertion Error', () => {
    unit('should return expected and actual values for failing executable', async () => {
      const failingExecutable = () => assert.equal(0, 1);
      const failureObj = {
        result: false,
        errorMessage: `AssertionError: 0 == 1`
      };
      const { result: actualResult, errorMessage: actualErrorMessage } = await execute(failingExecutable);
      
      assert.equal(actualResult, failureObj.result);
      assert.equal(actualErrorMessage, failureObj.errorMessage);
    });
  
    unit('should be able to execute async functions', async () => {
      const failingExecutable = () => new Promise((resolve) => resolve(assert.equal(0, 1)));
      const failureObj = {
        result: false,
        errorMessage: `AssertionError: 0 == 1`
      };
      const { result: actualResult, errorMessage: actualErrorMessage } = await execute(failingExecutable);
      
      assert.equal(actualResult, failureObj.result);
      assert.equal(actualErrorMessage, failureObj.errorMessage);
    });
  });

  spec('Other Errors', () => {
    unit('should return description and stack trace', async () => {
      const referrenceErrorExecutable = () => assert(notDefined);
      const failureObj = {
        result: false,
        errorMessage: 'ReferenceError: notDefined is not defined'
      }
      const { result: actualResult } = await execute(referrenceErrorExecutable);
      
      assert.equal(actualResult, failureObj.result);
    });
  });
});
