export class MinimalConsole {
  constructor(printer = console) {
    this._log = (...args) => printer.log(...args);
  }
  fail(specs, description, errorMessage, elapsedTime) {
    const failureSign = 'x';
    this._log(`${[...specs, description]} => ${failureSign} in ${elapsedTime.toFixed(2)}ms\n${errorMessage}`);
  }
  oneStep() {}
  pass() {}
  final(failures, passes, elapsedTime) {
    this._log(`${failures} failed, ${passes} succeeded in ${elapsedTime.toFixed(2)}ms`);
  }
}
