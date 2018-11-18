import assert from 'assert';
import { buildSpy } from '../../tests/utils.js';
import { describe, it } from '../../lib';
import { MinimalConsoleReporter } from './minimal-console.js';

describe('Console Reporter', () => {
  it('renders `fail()`', () => {
    const log = buildSpy();
    const reporter = new MinimalConsoleReporter({log});
    reporter.fail('error message');
    assert.deepEqual(log.data.calledWith, [['error message']]);
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
    assert.deepEqual(log.data.calledWith, [['23 failed, 42 succeeded in 10.00ms']]);
  });
});
