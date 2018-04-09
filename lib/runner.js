const execute = require('./execute');
const consoleReporter = require('./reporters/console-reporter');

const executeUnit = async ({ description, executable }, {reporter, executor}) => {
  const result = await executor(executable);

  reporter.step(description, result);

  return result;
};

const runner = (executables, dependencies) => {
  // TODO: Add some syntactic sugar
  const executor = (dependencies && dependencies.execute) || execute;
  const reporter = (dependencies && dependencies.reporter) || consoleReporter;
  const unitPromises = [];

  executables.map( definition => {
    const { type } = definition;

    if(type === 'spec') {
      const { description, tests } = definition;

      reporter.log(description);

      unitPromises.push(...tests.map(test => executeUnit(test, {reporter, executor})));

    } else if(type === 'unit') {
      unitPromises.push(executeUnit(definition, {reporter, executor}));
    }
  });

  return Promise.all(unitPromises).then(results => {
    let failures = 0;
    let successes = 0;

    results.forEach((result) => result ? successes++: failures++);

    reporter.result(failures, successes);
  });
};

module.exports = runner;