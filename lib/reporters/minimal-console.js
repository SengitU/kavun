export class MinimalConsole {
  constructor(printer = console) {
    this._log = (...args) => printer.log(...args);
  }
  fail(errorMessage) {
    this._log(errorMessage);
  }
  oneStep() {}
  pass() {}
  final(failures, passes, elapsedTime) {
    this._log(`${failures} failed, ${passes} succeeded in ${elapsedTime.toFixed(2)}ms`);
  }
}
