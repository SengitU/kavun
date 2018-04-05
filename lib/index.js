const createUnit = require('./unit');
const createSpec = require('./spec');
const execute = require('./execute');
const runner = require('./runner');

const executables = [];
let executionTimer;

function triggerExecutionAfterTimeout() {
  const TIMEOUT_BEFORE_EXECUTION = 0;

  if(executionTimer) {
    clearTimeout(executionTimer);
  }

  executionTimer = setTimeout(runner, TIMEOUT_BEFORE_EXECUTION);
}

//TODO change according to executables.
const runner = () => {
  reporter(tests.map(execute));
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

function registerExecutablesAndTriggerExecution(executable) {
  executables.push(executable);
  triggerExecutionAfterTimeout();
}

const unit = (description, executable) => registerExecutablesAndTriggerExecution(createUnit(description, executable));

const spec = (description, specCallback) => {
  const specWithExecutables = createSpec(description, specCallback);

  registerExecutablesAndTriggerExecution(specWithExecutables);
};

module.exports = {
  unit,
  spec
};