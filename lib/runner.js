import { execute } from './execute';

const executeUnit = async ({ description, testFunction, specs, timeout }, {reporter, execute}) => {
  const { result, errorMessage, elapsedTime } = await execute(testFunction, timeout);
  reporter.pass(specs, description, elapsedTime);
  reporter.oneStep(specs, description, result, elapsedTime);
  if (!result) {
    reporter.fail(errorMessage);
  }
  return result;
};
const productionDeps = {
  execute,
  process,
};
const countResults = (results) => {
  let failures = 0;
  let passes = 0;
  results.forEach((testPassed) => testPassed === true ? passes++ : failures++);
  return { failures, passes };
};
export const runner = (config, { unitCollector, stopTimer }, dependencies = productionDeps) => {
  const { reporter } = config;
  const { execute, process } = dependencies;
  const testResults = [];
  const runAndCollectTestResult = unit => testResults.push(executeUnit(unit, {reporter, execute}));
  unitCollector.withEachUnit(runAndCollectTestResult);
  return Promise
    .all(testResults)
    .then(countResults)
    .then(({ failures, passes }) => {
      const elapsedTime = stopTimer();
      reporter.final(failures, passes, elapsedTime);
      const exitCode = failures === 0 ? 0 : 1; 
      process.exit(exitCode);
    })
  ;
};
