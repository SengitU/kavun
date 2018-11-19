const testDescription = (specs, description) => {
  const allSpecs = specs.join(' ');
  return (allSpecs ? allSpecs + ' ' : allSpecs) + description;
};

export class Console {
  constructor(reporter = console) {
    this._print = (...args) => reporter.log(...args);
  }
  final(failures, passes, elapsedTime) {
    this._print(`${failures} failed, ${passes} succeeded in ${elapsedTime.toFixed(2)}ms`);
  }
  fail(specs, description, errorMessage, elapsedTime) {
    const testDesc = testDescription(specs, description);
    const failureSign = 'x';
    this._print(`${testDesc} => ${failureSign} in ${elapsedTime.toFixed(2)}ms\n${errorMessage}`);
  }
  pass(specs, description, elapsedTime) {
    const testDesc = testDescription(specs, description);
    const successSign = '✓';
    this._print(`${testDesc} => ${successSign} in ${elapsedTime.toFixed(2)}ms`);
  }
}
