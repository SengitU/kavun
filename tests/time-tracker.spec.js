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

const stopTimer = (id) => {
  memory[id] = {
    stop: process.hrtime()
  }
}

spec('TimeTracker', () => {
  spec('startTimer', () => {
    unit('should add provided key cache with start values', () => {
    unit('should add provided key to the cache with start values', () => {
      const id = "random-id";
      
      startTimer(id);

      assert.notEqual(memory[id].start, undefined);
      assert.equal(memory[id].start.length, 2);
    });
  });

  spec("stopTimer", () => {
    unit("should add end values to the provided key in the cache", () => {
      const id = "random-id";

      stopTimer(id);

      assert.notEqual(memory[id].stop, undefined);
      assert.equal(memory[id].stop.length, 2);
    });
});
