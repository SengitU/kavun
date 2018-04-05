execute = (executable) => {
  try {
    executable.apply();
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = execute;