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
const reportFinal = ({ reporter, failures, successes, elapsedTime }) => {
  reporter.newLine();
  reporter.result(failures, successes, elapsedTime);
  reporter.newLine();
};

const executeUnit = async ({ description, testFunction, specs, timeout }, {reporter, execute}) => {
  const { result, errorMessage, elapsedTime } = await execute(testFunction, timeout);
  reportStep({ reporter, specs, description, result, elapsedTime });
  if (!result) {
    reportFail({ reporter, errorMessage });
  }
  return result;
};

const productionDeps = {
  execute,
  reporter: consoleReporter,
  process,
};

const processTestResults = (results, processId, reporter, process) => {
  let failures = 0;
  let successes = 0;

  results.forEach((testPassed) => testPassed === true ? successes++ : failures++);
  const elapsedTime = stopTimer(processId);
  reportFinal({reporter, failures, successes, elapsedTime});

  if (failures === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
};

export const runner = (unitCollector, processId, dependencies = productionDeps) => {
  const { execute, reporter, process } = dependencies;
  const testResults = [];
  const runAndCollectTestResult = unit => testResults.push(executeUnit(unit, {reporter, execute}));
  unitCollector.withEachUnit(runAndCollectTestResult);
  return Promise
    .all(testResults)
    .then(results => processTestResults(results, processId, reporter, process))
  ;
};
