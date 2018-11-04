import { AssertionError } from "assert";
import uuidv4 from "uuid/v4";
import { startTimer, stopTimer } from "./utils/time-tracker";

const formatAssertionError = ({ actual, expected, operator, name }) => {
  const errorName = name.substring(0, name.indexOf(' '));

  return `${errorName}: ${JSON.stringify(actual)} ${operator} ${JSON.stringify(expected)}`;
};

export const execute = async (executable, timeout = 1500) => {
  const executionId = uuidv4();
  startTimer(executionId);
  try {
    await Promise.race([
      executable(),
      new Promise((resolve, reject) => setTimeout(() => reject(`TimeoutError: Execution exceeded ${timeout}ms`), timeout))
    ]);
    return { 
      result: true, 
      elapsedTime: stopTimer(executionId),
    };
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