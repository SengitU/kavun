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

module.exports = {
  getMessages,
  clear,
  apply
};