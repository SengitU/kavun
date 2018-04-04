const tests = [];
let executionTimer;

function triggerExecutionAfterTimeout() {
  const TIMEOUT_BEFORE_EXECUTION = 0;

  if(executionTimer) {
    clearTimeout(executionTimer);
  }

  executionTimer = setTimeout(runner, TIMEOUT_BEFORE_EXECUTION);
}

const runner = () => reporter(tests.map(execute));

const execute = ({description, executable}) => {
  try {
    executable();
    console.log(`${description} => ✓`);
    return true;
  } catch(error) {
    console.log(`${description} => X`);
    return false;
  }
};

const reporter = (testResults) => {
  let failedTests = 0;
  let succeededTests = 0;
  testResults.forEach((test) => test ? succeededTests++ : failedTests++);

  if(testResults.indexOf(false) > -1) {
    console.log(`${failedTests} failure, ${succeededTests} pass`);
  } else {
    console.log('All tests passed');
  }
};

function registerTestAndTriggerExecution(description, executable) {
  tests.push({description, executable});
  triggerExecutionAfterTimeout();
}

const unit = (description, executable) => registerTestAndTriggerExecution(description, executable);
const spec = (description, specCallback) => {
  specCallback();
};

module.exports = {
  unit,
  spec
};