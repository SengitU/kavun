const sinon = require('sinon');
const assert = require('assert');
const runner = require('../lib/runner');
const UnitCollector = require('../lib/unit-collector');
const { spec, unit } = require('../lib');

const reporter = {
  step: sinon.spy(),
  result: sinon.spy(),
  log: sinon.spy(),
  newLine: sinon.spy()
};

const process = { exit: sinon.spy() }

const clearMocks = () => process.exit.resetHistory();

spec('Runner', () => {
  unit('should execute single executable and report results for steps and overall to reporter', async () => {
    const unitCollector = new UnitCollector();
    const description = 'test';
    const testFunction = () => {};
    const execute = () => ({result: true});

    unitCollector.addUnit(description, testFunction);

    await runner(unitCollector, { reporter, execute, process });

    assert(reporter.step.calledWith(description, true));
    assert(reporter.result.calledWith(0, 1));
  });

  unit('should execute a spec of executables and report results for steps and overall to reporter', async () => {
    const unitCollector = new UnitCollector();
    const specDescription = 'spec';
    const unitDescription = 'unit';
    const testFunction = () => {};
    const execute = () => ({result: true});

    unitCollector.addSpec(specDescription, () => {
      unitCollector.addUnit(unitDescription, testFunction);
      unitCollector.addUnit(unitDescription, testFunction);
    });

    await runner(unitCollector, { reporter, execute, process });

    assert(reporter.step.calledWith(`${specDescription} ${unitDescription}`, true));
    assert(reporter.result.calledWith(0, 2));
  });

  unit('should be able to execute asynchronous executables and report results for steps and overall to reporter', async () => {
    const unitCollector = new UnitCollector();
    const specDescription = 'spec';
    const unitDescription = 'unit';
    const testFunction = () => {};
    const execute = () => Promise.resolve({result: true});

    unitCollector.addSpec(specDescription, () => {
      unitCollector.addUnit(unitDescription, testFunction);
      unitCollector.addUnit(unitDescription, testFunction);
    });

    await runner(unitCollector, { reporter, execute, process });

    assert(reporter.step.calledWith(`${specDescription} ${unitDescription}`, true));
    assert(reporter.result.calledWith(0, 2));
  });

  unit('Should be able to report expected and actual values for failing cases', async () => {
    const unitCollector = new UnitCollector();
    const specDescription = 'spec';
    const unitDescription = 'unit';
    const failureObj = {
      result: false,
      errorMessage: 'AssertionError: 0 == 1'
    };
    const testFunction = () => {};
    const execute = () => (failureObj);

    unitCollector.addSpec(specDescription, () => {
      unitCollector.addUnit(unitDescription, testFunction);
    });

    await runner(unitCollector, { reporter, execute, process });

    assert(reporter.log.calledWith(failureObj.description));
  });

  unit("should exit process with the code 0 if tests are passed", async () => {
    clearMocks();

    const unitCollector = new UnitCollector();
    const specDescription = "spec";
    const unitDescription = "unit";
    const successSpec = { result: true };
    const testFunction = () => {};
    const execute = () => successSpec;

    unitCollector.addSpec(specDescription, () => {
      unitCollector.addUnit(unitDescription, testFunction);
    });

    await runner(unitCollector, { reporter, execute, process });

    assert(process.exit.calledWith(0));
  });

  unit("should exit process with the code 1 if any test is failed", async () => {
    clearMocks();

    const unitCollector = new UnitCollector();
    const specDescription = "spec";
    const unitDescription = "unit";
    const failureObj = { result: false, description: "AssertionError: 0 == 1" };
    const testFunction = () => {};
    const execute = () => failureObj;

    unitCollector.addSpec(specDescription, () => {
      unitCollector.addUnit(unitDescription, testFunction);
    });

    await runner(unitCollector, { reporter, execute, process });

    assert(process.exit.calledWith(1));
  });

});
