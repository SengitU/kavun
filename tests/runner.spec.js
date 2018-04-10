const sinon = require('sinon');
const assert = require('assert');
const runner = require('../lib/runner');
const UnitCollector = require('../lib/unit-collector');
const beaver = require('../lib');

const { spec, unit } = beaver;

const reporter = {
  step: sinon.spy(),
  result: sinon.spy()
};

spec('Runner', () => {
  unit('should execute single executable and report results for steps and overall to reporter', async () => {
    const unitCollector = new UnitCollector();
    const description = 'test';
    const testFunction = () => {};
    const execute = () => true;

    unitCollector.addUnit(description, testFunction);

    await runner(unitCollector, { reporter, execute });

    assert(reporter.step.calledWith(description, true));
    assert(reporter.result.calledWith(0, 1));
  });

  unit('should execute a spec of executables and report results for steps and overall to reporter', async () => {
    const unitCollector = new UnitCollector();
    const specDescription = 'spec';
    const unitDescription = 'unit';
    const testFunction = () => {};
    const execute = () => true;

    unitCollector.addSpec(specDescription, () => {
      unitCollector.addUnit(unitDescription, testFunction);
      unitCollector.addUnit(unitDescription, testFunction);
    });

    await runner(unitCollector, { reporter, execute });

    assert(reporter.step.calledWith(`${specDescription} ${unitDescription}`, true));
    assert(reporter.result.calledWith(0, 2));
  });

  unit('should be able to execute asynchronous executables and report results for steps and overall to reporter', async () => {
    const unitCollector = new UnitCollector();
    const specDescription = 'spec';
    const unitDescription = 'unit';
    const testFunction = () => {};
    const execute = () => Promise.resolve(true);

    unitCollector.addSpec(specDescription, () => {
      unitCollector.addUnit(unitDescription, testFunction);
      unitCollector.addUnit(unitDescription, testFunction);
    });

    await runner(unitCollector, { reporter, execute });

    assert(reporter.step.calledWith(`${specDescription} ${unitDescription}`, true));
    assert(reporter.result.calledWith(0, 2));
  });


});
