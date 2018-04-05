const execute = require('./execute');
const reporter = require('./reporter');

const consoleReporter = reporter(console);

const executeUnit = ({ description, executable }, {reporter, executor}) => {
  const result = executor(executable);

  reporter.step(description, result);

  return result;
};

const runner = (executables, dependencies) => {
  // TODO: Add some syntactic sugar
  const executor = (dependencies && dependencies.execute) || execute;
  const reporter = (dependencies && dependencies.reporter) || consoleReporter;

  let failures = 0;
  let successes = 0;

  executables.map( definition => {
    const { type } = definition;

    if(type === 'spec') {
      const { description, tests } = definition;

      reporter.log(description);

      const results = tests.map(test => executeUnit(test, {reporter, executor}));

      //TODO Find a better way
      results.map((result) => result ? successes++: failures++);

    } else if(type === 'unit') {
      const result = executeUnit(definition, {reporter, executor});

      //TODO Remove duplication
      result ? successes++: failures++
    }
  });

  reporter.result(failures, successes);
};

module.exports = runner;