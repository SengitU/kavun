const execute = require('./execute');
const consoleReporter = require('./reporters/console-reporter');
const { totalExecutionTime } = require("./utils/time-tracker");

const executeUnit = async ({ description, testFunction, specs }, {reporter, executor}) => {
  const { result, errorMessage, elapsedTime } = await executor(testFunction);

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

const runner = (unitCollector, dependencies) => {
  // TODO: Add some syntactic sugar
  const executor = (dependencies && dependencies.execute) || execute;
  const reporter = (dependencies && dependencies.reporter) || consoleReporter;
  const processInterface = (dependencies && dependencies.process) || process;
  let unitPromises = [];

  unitCollector.withEachUnit(unit => {
    unitPromises.push(executeUnit(unit, {reporter, executor}));
  });

  return Promise.all(unitPromises).then(results => {
    let failures = 0;
    let successes = 0;

    results.forEach((result) => result === true ? successes++: failures++);

    reporter.newLine();
    reporter.result(failures, successes, totalExecutionTime());
    reporter.newLine();

    if (failures === 0) {
      processInterface.exit(0);
    } else {
      processInterface.exit(1);
    }
  });
};

module.exports = runner;