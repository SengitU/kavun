import assert from 'assert';
import { buildSpy } from '../../tests/utils.js';
import { describe, it } from '../../lib';
import { _reporter } from './console-reporter.js';

const outputDevice = {
  log: buildSpy()
};
const mockedReporter = _reporter(outputDevice);

describe('Reporter', () => {
  describe('Log', () => {
    it('should print exactly', () => {
      const description = 'test';
      mockedReporter.log(description, true);

      assert(outputDevice.log.calledWith('test'))
    });
  });

  describe('New Line', () => {
    it('should move to the new line', () => {
      mockedReporter.newLine();

      assert.equal(true, outputDevice.log.calledWith('\n'));
    });
  });

  describe('Step', () => {
    it('should add check mark and elapsed time for succeeded tests', () => {
      const description = 'test';
      const elapsedTime = 123.1221;
      mockedReporter.step(description, true, elapsedTime);

      assert(outputDevice.log.calledWith('test => ✓ in 123.12ms'))
    });

    it("should add cross mark and elapsed time for failed tests", () => {
      const description = "test";
      const elapsedTime = 123.1221;
      mockedReporter.step(description, false, elapsedTime);

      assert(outputDevice.log.calledWith("test => x in 123.12ms"));
    });
  });

  describe('Result', () => {
    it('should print number of successes and failures with elapsed time', () => {
      const elapsedTime = 123.1221;
      mockedReporter.result(3, 5, elapsedTime);

      assert(outputDevice.log.calledWith('3 failed, 5 succeeded in 123.12ms'))
    });
  });
});
