export const _reporter = (outputDevice) => {
  const successSign = '✓';
  const failureSign = 'x';

  const log = (message) => outputDevice.log(message);

  const step = (description, result, elapsedTime) => {
    const sign = result ? successSign : failureSign;

    log(`${description} => ${sign} in ${elapsedTime.toFixed(2)}ms`);
  };

  const result = (failed, succeeded, elapsedTime) =>
    log(`${failed} failed, ${succeeded} succeeded in ${elapsedTime.toFixed(2)}ms`);

  const newLine = () => log('\n');

  return {
    step,
    result,
    log,
    newLine
  }
};

export const reporter = _reporter(console);
