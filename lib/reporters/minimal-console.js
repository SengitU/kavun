export class MinimalConsoleReporter {
  constructor(printer = console) {
    this._log = (...args) => printer.log(...args);
  }
  fail(errorMessage) {
    this._log(`\n${errorMessage}\n`);
  }
  oneStep() {}
  final(failures, passes, elapsedTime) {
    this._log(`\n${failures} failed, ${passes} succeeded in ${elapsedTime.toFixed(2)}ms\n`);
  }
}
