let logs = [];

const originalLog = console.log;

const apply = () => {
  console.log = (log) => {
    originalLog(log);

    logs.push(log);
  }
};

const clear = () => {
  console.log = originalLog;
  logs = [];
};

const getMessages = () => [...logs];

const toHaveBeenCalledWith = (expression) => {
  const result = logs.find(log => log.indexOf(expression) > -1);

  return !!result;
};

module.exports = {
  getMessages,
  clear,
  apply,
  toHaveBeenCalledWith
};