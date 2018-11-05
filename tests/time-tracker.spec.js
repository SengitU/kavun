import assert from 'assert';
import { describe, it } from '../lib';
import { startTimer, stopTimer, newStartTimer } from '../lib/utils/time-tracker';

describe('TimeTracker', () => {
  it('`startTimer()` returns a function (`stopTimer`)', () => {
    const stopTimer = newStartTimer();
    assert.equal(typeof stopTimer, 'function');
  });
  it('calling `startTimer()` twice returns a different function every time', () => {
    const stopTimer1 = newStartTimer();
    const stopTimer2 = newStartTimer();
    assert.notEqual(stopTimer1, stopTimer2);
  });
  describe('newStopTimer', () => {
    it('should return elapsed time in miliseconds', () => {
      const stopTimer = newStartTimer();
      const elapsedTime = stopTimer();
      assert(elapsedTime > 0)
    });
  });
});
