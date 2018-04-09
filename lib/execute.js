const execute = async (executable) => {
  try {
    await executable.apply();
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = execute;