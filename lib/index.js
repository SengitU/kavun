const runner = require('./runner');
const UnitCollector = require('./unit-collector');

const specCollector = new UnitCollector();

const executables = [];
let executionTimer;

function triggerExecutionAfterTimeout() {
  const TIMEOUT_BEFORE_EXECUTION = 0;

  if(executionTimer) {
    clearTimeout(executionTimer);
  }

  executionTimer = setTimeout(() => runner(specCollector), TIMEOUT_BEFORE_EXECUTION);
}

function registerExecutablesAndTriggerExecution(executable) {
  executables.push(executable);
  triggerExecutionAfterTimeout();
}

const unit = (description, executable) =>
  registerExecutablesAndTriggerExecution(specCollector.addUnit(description, executable));

const spec = (description, specCallback) =>
  registerExecutablesAndTriggerExecution(specCollector.addSpec(description, specCallback));

module.exports = {
  unit,
  spec
};