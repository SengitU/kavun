const runner = require('./runner');
const UnitCollector = require('./unit-collector');

const unitCollector = new UnitCollector();

let executionTimer;

function triggerExecutionAfterTimeout() {
  const TIMEOUT_BEFORE_EXECUTION = 0;

  if(executionTimer) {
    clearTimeout(executionTimer);
  }

  executionTimer = setTimeout(() => runner(unitCollector), TIMEOUT_BEFORE_EXECUTION);
}

const unit = (description, executable) =>
  triggerExecutionAfterTimeout(unitCollector.addUnit(description, executable));

const spec = (description, specCallback) =>
  triggerExecutionAfterTimeout(unitCollector.addSpec(description, specCallback));

module.exports = {
  unit,
  spec
};