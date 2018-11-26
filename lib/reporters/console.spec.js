import assert from 'assert';
import { buildSpy } from '../build-spy.js';
import { describe, it } from '../../lib';
import { Console } from './console.js';

describe('Console Reporter', () => {
  it('renders `fail()`', () => {
    const log = buildSpy();
    const reporter = new Console({log});
    reporter.fail([], 'desc', 'error message', 42);
    assert.deepEqual(log.data.calledWith, [['desc => x in 42.00ms\nerror message']]);
  });
  it('renders `pass()`', () => {
    const log = buildSpy();
    const reporter = new Console({log});
    reporter.pass([], 'desc', 0);
    assert.deepEqual(log.data.calledWith, [["desc => ✓ in 0.00ms"]]);
  });
  it('renders `final()`', () => {
    const log = buildSpy();
    const reporter = new Console({log});
    reporter.final(23, 42, 10);
    assert.deepEqual(log.data.calledWith, [['23 failed, 42 succeeded in 10.00ms']]);
  });
});
