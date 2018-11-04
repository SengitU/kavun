const AssertionError = require("assert").AssertionError;
const uuidv4 = require("uuid/v4");
const { startTimer, stopTimer } = require("./utils/time-tracker");

const formatAssertionError = ({ actual, expected, operator, name }) => {
  const errorName = name.substring(0, name.indexOf(' '));

  return `${errorName}: ${JSON.stringify(actual)} ${operator} ${JSON.stringify(expected)}`;
};

const execute = async (executable, timeout = 1500) => {
  const executionId = uuidv4();
  startTimer(executionId);
  try {
    await Promise.race([
      executable.apply(),
      new Promise((resolve, reject) => setTimeout(() => reject(`TimeoutError: Execution exceeded ${timeout}ms`), timeout))
    ]);
    return { result: true, elapsedTime: stopTimer(executionId) };
  } catch (error) {
    let errorMessage;
    
    if (error instanceof AssertionError) {
      errorMessage = formatAssertionError(error);
    } else {
      errorMessage = error;
    }

    return {
      result: false,
      errorMessage,
      elapsedTime: stopTimer(executionId)
    };
  }
};

module.exports = execute;