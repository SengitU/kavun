const assert = require("assert");
const { spec, unit } = require("../lib/index");

/*
 * Time Tracker
 * 
 * startTimer
 * stopTimer
 * 
 */

const memory = [];

const startTimer = (id) => {
  memory[id] = {
    start: process.hrtime()
  }
}

spec('TimeTracker', () => {
  spec('startTimer', () => {
    unit('should add provided key cache with start values', () => {
      const id = "random-id";
      
      startTimer(id);

      assert.notEqual(memory[id].start, undefined);
      assert.equal(memory[id].start.length, 2);
    });
  });
});
