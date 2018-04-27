const AssertionError = require("assert").AssertionError;

const formatAssertionError = ({ actual, expected, operator, name }) => {
  const errorName = name.substring(0, name.indexOf(' '));

  return description = `${errorName}: ${JSON.stringify(actual)} ${operator} ${JSON.stringify(expected)}`;
}

const execute = async (executable) => {
  try {
    await executable.apply();
    return { result: true };
  } catch (error) {
    let description;
    
    if (error instanceof AssertionError) {
      description = formatAssertionError(error);
    } else {
      description = error;
    }

    return {
      result: false,
      description
    };
  }
};

module.exports = execute;