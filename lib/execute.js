const execute = async (executable) => {
  try {
    await executable.apply();
    return true;
  } catch ({actual, expected}) {
    return {actual, expected};
  }
};

module.exports = execute;