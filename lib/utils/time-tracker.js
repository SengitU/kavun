const memory = [];

const startTimer = (id, cache = memory) => {
  cache[id] = process.hrtime();
};

const stopTimer = (id, cache = memory) => {
  const stopTime = process.hrtime();
  const startTime = cache[id];
  return calculateElapsedTime(startTime, stopTime);
};

const calculateElapsedTime = ([startSeconds, startNanoseconds], [stopSeconds, stopNanoseconds]) => {
  const secondsToMiliseconds = second => startSeconds * Math.pow(10, 3);
  const nanosecondsToMiliseconds = nanosecond => nanosecond * Math.pow(10, -6);

  const startInMiliseconds = secondsToMiliseconds(startSeconds) + nanosecondsToMiliseconds(startNanoseconds);
  const stopInMiliseconds = secondsToMiliseconds(stopSeconds) + nanosecondsToMiliseconds(stopNanoseconds);

  return stopInMiliseconds - startInMiliseconds;
};

const totalExecutionTime = () => calculateElapsedTime([0, 0], process.hrtime());

module.exports = {
  startTimer,
  stopTimer,
  totalExecutionTime
};