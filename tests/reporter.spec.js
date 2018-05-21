const sinon = require('sinon');
const assert = require('assert');
const reporter = require('../lib/reporters/index');
const { spec, unit } = require('../lib');

const outputDevice = {
  log: sinon.spy()
};
const mockedReporter = reporter(outputDevice);

spec('Reporter', () => {
  spec('Log', () => {
    unit('should print exactly', () => {
      const description = 'test';
      mockedReporter.log(description, true);

      assert(outputDevice.log.calledWith('test'))
    });
  });

  spec('New Line', () => {
    unit('should move to the new line', () => {
      mockedReporter.newLine();

      assert.equal(true, outputDevice.log.calledWith('\n'));
    });
  });

  spec('Step', () => {
    unit('should add check mark and elapsed time for succeeded tests', () => {
      const description = 'test';
      const elapsedTime = 123.1221;
      mockedReporter.step(description, true, elapsedTime);

      assert(outputDevice.log.calledWith('test => ✓ in 123.12ms'))
    });

    unit("should add cross mark and elapsed time for failed tests", () => {
      const description = "test";
      const elapsedTime = 123.1221;
      mockedReporter.step(description, false, elapsedTime);

      assert(outputDevice.log.calledWith("test => x in 123.12ms"));
    });
  });

  spec('Result', () => {
    unit('should print number of successes and failures with elapsed time', () => {
      const elapsedTime = 123.1221;
      mockedReporter.result(3, 5, elapsedTime);

      assert(outputDevice.log.calledWith('3 failed, 5 succeeded in 123.12ms'))
    });
  });
});
