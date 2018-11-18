export const _reporter = (outputDevice) => {
  const successSign = '✓';
  const failureSign = 'x';

  const log = (message) => outputDevice.log(message);

  const step = (description, result, elapsedTime) => {
    const sign = result ? successSign : failureSign;

    log(`${description} => ${sign} in ${elapsedTime.toFixed(2)}ms`);
  };

  const result = (failed, succeeded, elapsedTime) =>
    log(`${failed} failed, ${succeeded} succeeded in ${elapsedTime.toFixed(2)}ms`);

  const newLine = () => log('\n');

  return {
    step,
    result,
    log,
    newLine
  }
};

export class ConsoleReporter {
  constructor() {
    this._reporter = _reporter(console);
  }
  fail(errorMessage) {
    this._reporter.newLine();
    this._reporter.log(errorMessage);
    this._reporter.newLine();
  }
  final(failures, passes, elapsedTime) {
    this._reporter.newLine();
    this._reporter.result(failures, passes, elapsedTime);
    this._reporter.newLine();
  }
  oneStep(specs, description, result, elapsedTime) {
    const allSpecs = specs.join(' ');
    const testDesc = (allSpecs ? allSpecs + ' ' : allSpecs) + description;
    this._reporter.step(testDesc, result, elapsedTime);
  }
}
