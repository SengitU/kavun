const runner = require('./runner');
const UnitCollector = require('./unit-collector');

const specCollector = new UnitCollector();

let executionTimer;

function triggerExecutionAfterTimeout() {
  const TIMEOUT_BEFORE_EXECUTION = 0;

  if(executionTimer) {
    clearTimeout(executionTimer);
  }

  executionTimer = setTimeout(() => runner(specCollector), TIMEOUT_BEFORE_EXECUTION);
}

const unit = (description, executable) =>
  triggerExecutionAfterTimeout(specCollector.addUnit(description, executable));

const spec = (description, specCallback) =>
  triggerExecutionAfterTimeout(specCollector.addSpec(description, specCallback));

module.exports = {
  unit,
  spec
};