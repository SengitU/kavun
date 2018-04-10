const execute = require('./execute');
const consoleReporter = require('./reporters/console-reporter');

const executeUnit = async ({ description, testFunction, specs }, {reporter, executor}) => {
  const result = await executor(testFunction);

  if(specs.length > 0) {
    reporter.step(`${specs.join(' ')} ${description}`, result);
  } else {
    reporter.step(description, result);
  }

  return result;
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

    results.forEach((result) => result ? successes++: failures++);

    reporter.result(failures, successes);
  });
};

module.exports = runner;