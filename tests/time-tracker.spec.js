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
  memory[id] = process.hrtime();
}

const stopTimer = (id) => {
  const stopTime = process.hrtime();
  const startTime = memory[id];
  return calculateElapsedTime(startTime, stopTime);
}

const calculateElapsedTime = ([startSeconds, startNanoseconds], [stopSeconds, stopNanoseconds]) => {
  const secondsToMiliseconds = (second) => startSeconds * Math.pow(10, 3);
  const nanosecondsToMiliseconds = (nanosecond) => nanosecond * Math.pow(10, -6);
  
  const startInMiliseconds = secondsToMiliseconds(startSeconds) + nanosecondsToMiliseconds(startNanoseconds);
  const stopInMiliseconds = secondsToMiliseconds(stopSeconds) + nanosecondsToMiliseconds(stopNanoseconds);

  return stopInMiliseconds - startInMiliseconds;
}


spec('TimeTracker', () => {
  spec('startTimer', () => {
    unit('should add provided key to the cache with start values', () => {
      const id = "random-id";
      
      startTimer(id);

      assert.notEqual(memory[id], undefined);
      assert.equal(memory[id].length, 2);
    });
  });

  spec("stopTimer", () => {
    unit('should return elapsed time in miliseconds', () => {
      const id = "random-id";

      const elapsedTime = stopTimer(id);
      console.log(elapsedTime)
      assert(elapsedTime > 0)
    });
  });
});
