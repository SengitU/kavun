const reporter = (outputDevice) => {
  const successSign = '✓';
  const failureSign = 'x';

  const log = (description) => outputDevice.log(description);

  const step = (description, result) => {
    const sign = result ? successSign : failureSign;

    log(`${description} => ${sign}`);
  };

  const result = (failed, succeeded) => log(`${failed} failed, ${succeeded} succeeded`);

  const newLine = () => log('\n');

  return {
    step,
    result,
    log,
    newLine
  }
};

module.exports = reporter;