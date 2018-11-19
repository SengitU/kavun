export class Console {
  constructor(reporter = console) {
    this._print = (...args) => reporter.log(...args);
  }
  fail(errorMessage) {
    this._print(errorMessage);
  }
  final(failures, passes, elapsedTime) {
    this._print(`${failures} failed, ${passes} succeeded in ${elapsedTime.toFixed(2)}ms`);
  }
  oneStep(specs, description, result, elapsedTime) {
    const allSpecs = specs.join(' ');
    const testDesc = (allSpecs ? allSpecs + ' ' : allSpecs) + description;
    
    const successSign = '✓';
    const failureSign = 'x';
    const sign = result ? successSign : failureSign;
    this._print(`${testDesc} => ${sign} in ${elapsedTime.toFixed(2)}ms`);
  }
  pass(specs, description, elapsedTime) {
    const allSpecs = specs.join(' ');
    const testDesc = (allSpecs ? allSpecs + ' ' : allSpecs) + description;
    
    const successSign = '✓';
    this._print(`${testDesc} => ${successSign} in ${elapsedTime.toFixed(2)}ms`);
  }
}
