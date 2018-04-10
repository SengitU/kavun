const execute = require('./execute');
const consoleReporter = require('./reporters/console-reporter');

const executeUnit = async ({ description, testFunction, specs }, {reporter, executor}) => {
  const result = await executor(testFunction);
  const isTestPassed = result === true;

  if(specs.length > 0) {
    reporter.step(`${specs.join(' ')} ${description}`, isTestPassed);
  } else {
    reporter.step(description, isTestPassed);
  }

  if(!isTestPassed) {
    reporter.log(`\tActual: ${result.actual}, Expected: ${result.expected}`);
  }

  return isTestPassed;
};

const runner = (specCollector, dependencies) => {
  // TODO: Add some syntactic sugar
  const executor = (dependencies && dependencies.execute) || execute;
  const reporter = (dependencies && dependencies.reporter) || consoleReporter;
  let unitPromises = [];

  specCollector.withEachUnit(unit => {
    unitPromises.push(executeUnit(unit, {reporter, executor}));
  });

  return Promise.all(unitPromises).then(results => {
    let failures = 0;
    let successes = 0;

    results.forEach((result) => result === true ? successes++: failures++);

    reporter.newLine();
    reporter.result(failures, successes);
  });
};

module.exports = runner;