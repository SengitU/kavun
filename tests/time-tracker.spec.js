const assert = require("assert");
const { startTimer, stopTimer } = require("../lib/utils/time-tracker");
const { spec, unit } = require("../lib/index");

const memory = {};

spec('TimeTracker', () => {
  spec('startTimer', () => {
    unit('should add provided key to the cache with start values', () => {
      const id = "random-id";
      
      startTimer(id, memory);

      assert.notEqual(memory[id], undefined);
      assert.equal(memory[id].length, 2);
    });
  });

  spec("stopTimer", () => {
    unit('should return elapsed time in miliseconds', () => {
      const id = "random-id";

      const elapsedTime = stopTimer(id, memory);

      assert(elapsedTime > 0)
    });
  });
});
