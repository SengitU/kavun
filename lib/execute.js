import { AssertionError } from "assert";
import { newStartTimer } from "./utils/time-tracker";

const formatAssertionError = ({ actual, expected, operator, name }) => {
  const errorName = name.substring(0, name.indexOf(' '));
  return `${errorName}: ${JSON.stringify(actual)} ${operator} ${JSON.stringify(expected)}`;
};

const pass = (elapsedTime) => ({
  result: true, 
  elapsedTime,
});
const failure = (errorMessage, elapsedTime) => ({
  result: false,
  errorMessage,
  elapsedTime,
});
export const execute = async (executable, timeout = 1500) => {
  const stopTimer = newStartTimer();
  const elapsedTime = () => stopTimer();
  const timeoutFn = () => 
    new Promise((resolve, reject) => 
      setTimeout(() => reject(`TimeoutError: Execution exceeded ${timeout}ms`), timeout))
  ;
  try {
    await Promise.race([executable(), timeoutFn()]);
    return pass(elapsedTime());
  } catch (error) {
    const finalError = error instanceof AssertionError ? formatAssertionError(error) : error;
    return failure(finalError, elapsedTime());
  }
};