const reporter = (outputDevice) => {
  const successSign = '✓';
  const failureSign = 'x';

  const step = (description, result) => {
    const sign = result ? successSign : failureSign;

    outputDevice.debug(`${description} => ${sign}`);
  };

  const result = (failed, succeeded) => outputDevice.log(`${failed} failed, ${succeeded} succeeded`);

  return {
    step,
    result
  }
};

module.exports = reporter;