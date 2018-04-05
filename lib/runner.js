const execute = require('./execute');

const executeUnit = ({ description, executable }, {reporter, execute}) => {
  const result = execute(executable);

  reporter.step(description, result);

  return result;
};

const runner = (executables, dependencies) => {
  const execute = dependencies.execute || execute;
  const reporter = dependencies.reporter;

  let failures = 0;
  let successes = 0;

  executables.map( definition => {
    if(definition.type === 'spec') {
      const { specDescription, tests } = definition;

      reporter.step(specDescription);

      const results = tests.map(test => executeUnit(test, {reporter, execute}));

      //TODO Find a better way
      results.map((result) => result ? successes++: failures++);

    } else if(definition.type === 'unit') {
      const result = executeUnit(definition, {reporter, execute});

      //TODO Remove duplication
      result ? successes++: failures++
    }
  });

  reporter.result(failures, successes);
};

module.exports = runner;