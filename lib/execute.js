const AssertionError = require("assert").AssertionError;

const formatAssertionError = ({ actual, expected, operator, name }) => {
  const errorName = name.substring(0, name.indexOf(' '));

  return `${errorName}: ${JSON.stringify(actual)} ${operator} ${JSON.stringify(expected)}`;
}

const execute = async (executable) => {
  try {
    await executable.apply();
    return { result: true };
  } catch (error) {
    let errorMessage;
    
    if (error instanceof AssertionError) {
      errorMessage = formatAssertionError(error);
    } else {
      errorMessage = error;
    }

    return {
      result: false,
      errorMessage
    };
  }
};

module.exports = execute;