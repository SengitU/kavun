import assert from 'assert';
import { buildSpy } from '../../tests/utils.js';
import { describe, it } from '../../lib';
import { ConsoleReporter } from './console-reporter.js';

describe('Console Reporter', () => {
  it('renders `fail()`', () => {
    const log = buildSpy();
    const reporter = new ConsoleReporter({log});
    reporter.fail('error message');
    assert.deepEqual(log.data.calledWith, [['\nerror message\n']]);
  });
  describe('renders `oneStep()`', () => {
    it('for a failure', () => {
      const log = buildSpy();
      const reporter = new ConsoleReporter({log});
      reporter.oneStep([], 'desc', false, 0);
      assert.deepEqual(log.data.calledWith, [["desc => x in 0.00ms"]]);
    });
    it('for a passed test', () => {
      const log = buildSpy();
      const reporter = new ConsoleReporter({log});
      reporter.oneStep([], 'desc', true, 0);
      assert.deepEqual(log.data.calledWith, [["desc => ✓ in 0.00ms"]]);
    });
  });
});
