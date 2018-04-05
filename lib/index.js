const createUnit = require('./unit');
const createSpec = require('./spec');
const runner = require('./runner');

const executables = [];
let executionTimer;

function triggerExecutionAfterTimeout() {
  const TIMEOUT_BEFORE_EXECUTION = 0;

  if(executionTimer) {
    clearTimeout(executionTimer);
  }

  executionTimer = setTimeout(() => runner(executables), TIMEOUT_BEFORE_EXECUTION);
}

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