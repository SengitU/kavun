import assert from 'assert';
import { buildSpy } from '../../tests/utils.js';
import { describe, it, xdescribe, xit } from '../../lib';

class MinimalConsoleReporter {
  constructor(printer = console) {
    this._log = (...args) => printer.log(...args);
  }
  fail() {
    this._log('F');
  }
  oneStep() {}
  final(failures, passes, elapsedTime) {
    this._log(`\n${failures} failed, ${passes} succeeded in ${elapsedTime.toFixed(2)}ms\n`);
  }
}

describe('Console Reporter', () => {
  it('renders `fail()`', () => {
    const log = buildSpy();
    const reporter = new MinimalConsoleReporter({log});
    reporter.fail('error message');
    assert.deepEqual(log.data.calledWith, [['F']]);
  });
  describe('renders `oneStep()`', () => {
    it('for a failure print nothing', () => {
      const log = buildSpy();
      const reporter = new MinimalConsoleReporter({log});
      reporter.oneStep([], 'desc', false, 0);
      assert.deepEqual(log.data.calledWith, []);
    });
    it('for a passed test print nothing', () => {
      const log = buildSpy();
      const reporter = new MinimalConsoleReporter({log});
      reporter.oneStep([], 'desc', true, 0);
      assert.deepEqual(log.data.calledWith, []);
    });
  });
  it('renders `final()`', () => {
    const log = buildSpy();
    const reporter = new MinimalConsoleReporter({log});
    reporter.final(23, 42, 10);
    assert.deepEqual(log.data.calledWith, [['\n23 failed, 42 succeeded in 10.00ms\n']]);
  });
});
