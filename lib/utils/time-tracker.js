let uuidCounter = 0;
const memory = [];

const _startTimer = (id) => {
  memory[id] = process.hrtime();
};

const _stopTimer = (id) => {
  const timeDiff = process.hrtime(memory[id]);
  return parseMiliseconds(timeDiff);
};

const parseMiliseconds = ([seconds, nanoseconds]) => {
  const secondsToMiliseconds = second => second * Math.pow(10, 3);
  const nanosecondsToMiliseconds = nanosecond => nanosecond * Math.pow(10, -6);
  return secondsToMiliseconds(seconds) + nanosecondsToMiliseconds(nanoseconds);
};

export const startTimer = () => {
  ++uuidCounter;
  _startTimer(uuidCounter);
  return ((id) => () => _stopTimer(id))(uuidCounter);
};
