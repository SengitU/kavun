export class MinimalConsoleReporter {
  constructor(printer = console) {
    this._log = (...args) => printer.log(...args);
  }
  fail(errorMessage) {
    this._log(errorMessage);
  }
  oneStep() {}
  final(failures, passes, elapsedTime) {
    this._log(`${failures} failed, ${passes} succeeded in ${elapsedTime.toFixed(2)}ms`);
  }
}
