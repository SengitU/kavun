import assert from 'assert';
import { describe, it } from '../lib';
const { startTimer, stopTimer } = require("../lib/utils/time-tracker");

const memory = {};

describe('TimeTracker', () => {
  describe('startTimer', () => {
    it('should add provided key to the cache with start values', () => {
      const id = "random-id";
      
      startTimer(id, memory);

      assert.notEqual(memory[id], undefined);
      assert.equal(memory[id].length, 2);
    });
  });

  describe("stopTimer", () => {
    it('should return elapsed time in miliseconds', () => {
      const id = "random-id";

      const elapsedTime = stopTimer(id, memory);

      assert(elapsedTime > 0)
    });
  });
});
