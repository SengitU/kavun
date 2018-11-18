import assert from 'assert';
import { buildSpy } from '../../tests/utils.js';
import { describe, it } from '../../lib';
import { ConsoleReporter } from './console-reporter.js';

describe('Console Reporter', () => {
  it('renders `fail()`', () => {
    const log = buildSpy();
    const reporter = new ConsoleReporter({log});
    reporter.fail('error message');
    
    assert(log.calledWith('\nerror message\n'));
  });
  });
});
