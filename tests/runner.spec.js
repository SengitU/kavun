const sinon = require('sinon');
const assert = require('assert');
const runner = require('../lib/runner');
const beaver = require('../lib');

const { spec } = beaver;

const reporter = {
  step: sinon.spy(),
  result: sinon.spy(),
  log: sinon.spy()
};

spec('runner', (unit) => {
  unit('should execute single executable and report results for steps and overall to reporter', async () => {
    const description = 'test';
    const executable = () => {};
    const executables = [{type: 'unit', description, executable }];
    const execute = () => Promise.resolve(true);

    await runner(executables, { reporter, execute });

    assert(reporter.step.calledWith(description, true));
    assert(reporter.result.calledWith(0, 1));
  });

  unit('should execute a spec of executables and report results for steps and overall to reporter', async () => {
    const specDescription = 'spec';
    const unitDescription = 'unit';
    const executable = () => {};
    const executables = [{type: 'spec', description: specDescription, tests: [
        {type: 'unit', description: unitDescription, executable },
        {type: 'unit', description: unitDescription, executable }
      ]}];
    const execute = () => Promise.resolve(true);

    await runner(executables, { reporter, execute });

    assert(reporter.log.calledWith(specDescription));
    assert(reporter.step.calledWith(unitDescription, true));
    assert(reporter.result.calledWith(0, 2));
  });

  unit('should be able to execute asynchronous executables and report results for steps and overall to reporter', async () => {
    const specDescription = 'spec';
    const unitDescription = 'unit';
    const executable = () => {};
    const executables = [{type: 'spec', description: specDescription, tests: [
        {type: 'unit', description: unitDescription, executable },
        {type: 'unit', description: unitDescription, executable }
      ]}];
    const execute = () => Promise.resolve(true);

    await runner(executables, { reporter, execute });

    assert(reporter.log.calledWith(specDescription));
    assert(reporter.step.calledWith(unitDescription, true));
    assert(reporter.result.calledWith(0, 2));
  });


});
