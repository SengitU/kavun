const memory = [];

const _startTimer = (id, cache = memory) => {
  cache[id] = process.hrtime();
};

const _stopTimer = (id, cache = memory) => {
  const timeDiff = process.hrtime(cache[id]);
  return parseMiliseconds(timeDiff);
};

const parseMiliseconds = ([seconds, nanoseconds]) => {
  const secondsToMiliseconds = second => second * Math.pow(10, 3);
  const nanosecondsToMiliseconds = nanosecond => nanosecond * Math.pow(10, -6);

  return secondsToMiliseconds(seconds) + nanosecondsToMiliseconds(nanoseconds);
};

let uuidCounter = 0;
export const startTimer = () => {
  _startTimer(++uuidCounter);
  return () => _stopTimer(uuidCounter);
};
