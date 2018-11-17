import sinon from 'sinon';
import assert from 'assert';
import { buildSpy } from './utils.js';
import { describe, it } from '../lib';
import { runner } from '../lib/runner';
import { UnitCollector } from '../lib/unit-collector';

const reporter = {
  step: sinon.spy(),
  result: sinon.spy(),
  log: buildSpy(),
  newLine: buildSpy(),
  
  fail: sinon.spy(),
  final: sinon.spy(),
};

const process = { exit: sinon.spy() };
const noop = () => {};

const clearMocks = () => process.exit.resetHistory();

const run = (unitCollector, execute) =>
  runner({ reporter }, { unitCollector, stopTimer: noop }, { execute, process });

describe('Runner', () => {
  it('should execute single executable and report results for steps and overall to reporter', async () => {
    const unitCollector = new UnitCollector();
    const description = 'test';
    const testFunction = () => {};
    const execute = () => ({result: true});

    unitCollector.addUnit(description, testFunction);

    await run(unitCollector, execute);

    assert(reporter.step.calledWith(description, true));
    assert(reporter.final.calledWith(0, 1));
  });

  it('should execute a spec of executables and report results for steps and overall to reporter', async () => {
    const unitCollector = new UnitCollector();
    const specDescription = 'spec';
    const unitDescription = 'unit';
    const testFunction = () => {};
    const execute = () => ({result: true});

    unitCollector.addSpec(specDescription, () => {
      unitCollector.addUnit(unitDescription, testFunction);
      unitCollector.addUnit(unitDescription, testFunction);
    });

    await run(unitCollector, execute);

    assert(reporter.step.calledWith(`${specDescription} ${unitDescription}`, true));
    assert(reporter.final.calledWith(0, 2));
  });

  it('should be able to execute asynchronous executables and report results for steps and overall to reporter', async () => {
    const unitCollector = new UnitCollector();
    const specDescription = 'spec';
    const unitDescription = 'unit';
    const testFunction = () => {};
    const execute = () => Promise.resolve({result: true});

    unitCollector.addSpec(specDescription, () => {
      unitCollector.addUnit(unitDescription, testFunction);
      unitCollector.addUnit(unitDescription, testFunction);
    });

    await run(unitCollector, execute);

    assert(reporter.step.calledWith(`${specDescription} ${unitDescription}`, true));
    assert(reporter.final.calledWith(0, 2));
  });

  it('Should be able to report expected and actual values for failing cases', async () => {
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

    await run(unitCollector, execute);

    assert(reporter.fail.calledWith(failureObj.description));
  });

  it("should exit process with the code 0 if tests are passed", async () => {
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

    await run(unitCollector, execute);

    assert(process.exit.calledWith(0));
  });

  it("should exit process with the code 1 if any test is failed", async () => {
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

    await run(unitCollector, execute);

    assert(process.exit.calledWith(1));
  });

});
