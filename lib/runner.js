import { execute } from './execute';
import { reporter as consoleReporter } from './reporters/console-reporter';
import { stopTimer } from "./utils/time-tracker";

const reportStep = ({ reporter, specs, description, result, elapsedTime }) => {
  const allSpecs = specs.join(' ');
  const testDesc = (allSpecs ? allSpecs + ' ' : allSpecs) + description;
  reporter.step(testDesc, result, elapsedTime);
};
const reportFail = ({ reporter, errorMessage }) => {
  reporter.newLine();
  reporter.log(errorMessage);
  reporter.newLine();
};

const executeUnit = async ({ description, testFunction, specs, timeout }, {reporter, executor}) => {
  const { result, errorMessage, elapsedTime } = await executor(testFunction, timeout);
  reportStep({ reporter, specs, description, result, elapsedTime });
  if (!result) {
    reportFail({ reporter, errorMessage });
  }
  return result;
};

export const runner = (unitCollector, processId, dependencies) => {
  // TODO: Add some syntactic sugar
  const executor = (dependencies && dependencies.execute) || execute;
  const reporter = (dependencies && dependencies.reporter) || consoleReporter;
  const processInterface = (dependencies && dependencies.process) || process;

  const testResults = [];
  const runAndCollectTestResult = unit => testResults.push(executeUnit(unit, {reporter, executor}));
  unitCollector.withEachUnit(runAndCollectTestResult);

  const processTestResults = results => {
    let failures = 0;
    let successes = 0;

    results.forEach((testPassed) => testPassed === true ? successes++: failures++);

    reporter.newLine();
    reporter.result(failures, successes, stopTimer(processId));
    reporter.newLine();

    if (failures === 0) {
      processInterface.exit(0);
    } else {
      processInterface.exit(1);
    }
  };

  return Promise
    .all(testResults)
    .then(processTestResults)
  ;
};
