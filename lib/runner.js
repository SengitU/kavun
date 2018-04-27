const execute = require('./execute');
const consoleReporter = require('./reporters/console-reporter');

const executeUnit = async ({ description, testFunction, specs }, {reporter, executor}) => {
  const spec = await executor(testFunction);

  if(specs.length > 0) {
    reporter.step(`${specs.join(' ')} ${description}`, spec.result);
  } else {
    reporter.step(description, spec.result);
  }

  if(!spec.result) {
    reporter.newLine();
    reporter.log(spec.description);
    reporter.newLine();
  }

  return spec.result;
};

const runner = (unitCollector, dependencies) => {
  // TODO: Add some syntactic sugar
  const executor = (dependencies && dependencies.execute) || execute;
  const reporter = (dependencies && dependencies.reporter) || consoleReporter;
  let unitPromises = [];

  unitCollector.withEachUnit(unit => {
    unitPromises.push(executeUnit(unit, {reporter, executor}));
  });

  return Promise.all(unitPromises).then(results => {
    let failures = 0;
    let successes = 0;

    results.forEach((result) => result === true ? successes++: failures++);

    reporter.newLine();
    reporter.result(failures, successes);
    reporter.newLine();
  });
};

module.exports = runner;