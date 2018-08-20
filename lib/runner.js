const execute = require('./execute');
const consoleReporter = require('./reporters/console-reporter');
const { stopTimer } = require("./utils/time-tracker");

const executeUnit = async ({ description, testFunction, specs, timeout }, {reporter, executor}) => {
  const { result, errorMessage, elapsedTime } = await executor(testFunction, timeout);

  if(specs.length > 0) {
    reporter.step(`${specs.join(' ')} ${description}`, result, elapsedTime);
  } else {
    reporter.step(description, result, elapsedTime);
  }

  if(!result) {
    reporter.newLine();
    reporter.log(errorMessage);
    reporter.newLine();
  }

  return result;
};

const runner = (unitCollector, processId, dependencies) => {
  // TODO: Add some syntactic sugar
  const executor = (dependencies && dependencies.execute) || execute;
  const reporter = (dependencies && dependencies.reporter) || consoleReporter;
  const processInterface = (dependencies && dependencies.process) || process;

  const testResults = [];
  const runAndCollectTestResult = unit => testResults.push(executeUnit(unit, {reporter, executor}));
  unitCollector.withEachUnit(runAndCollectTestResult);

  const processTestResults = results => {
    let failures = 0;
    let successes = 0;

    results.forEach((testPassed) => testPassed === true ? successes++: failures++);

    reporter.newLine();
    reporter.result(failures, successes, stopTimer(processId));
    reporter.newLine();

    if (failures === 0) {
      processInterface.exit(0);
    } else {
      processInterface.exit(1);
    }
  };

  return Promise.all(testResults)
    .then(processTestResults);
};

module.exports = runner;
