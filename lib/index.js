const beaver = (() => {
  const tests = [];
  let executionTimer;

  function triggerExecutionAfterTimeout() {
    const TIMEOUT_BEFORE_EXECUTION = 0;

    if(executionTimer) {
      clearTimeout(executionTimer);
    }

    executionTimer = setTimeout(runner, TIMEOUT_BEFORE_EXECUTION);
  }

  function registerTestAndTriggerExecution(test) {
    tests.push(test);
    triggerExecutionAfterTimeout();
  }

  const runner = () => {
    const testResults = tests.map(execute);

    if(testResults.indexOf(false) > -1) {
      console.log('Some tests failed');
    } else {
      console.log('All tests passed');
    }
  };

  const execute = (test) => {
    try {
      test();
      return true;
    } catch(error) {
      return false;
    }
  };

  const unit = test => registerTestAndTriggerExecution(test);

  const spec = (specCallback) => specCallback();

  return {
    spec,
    unit
  }
})();

module.exports = beaver;