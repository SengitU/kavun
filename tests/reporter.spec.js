const sinon = require('sinon');
const assert = require('assert');
const reporter = require('../lib/reporter');

// Output device is normally console
const outputDevice = {
  debug: sinon.spy(),
  log: sinon.spy()
};
const mockedReporter = reporter(outputDevice);

(() => {
  // spec('Reporter', (unit) => {
  //   unit('should add check mark for succeeded tests', () => {
      const description = 'test';
      mockedReporter.step(description, true);

      assert(outputDevice.debug.calledWith('test => ✓'))
  //   });
  // });
})();

(() => {
  // spec('Reporter', (unit) => {
  //   unit('should add cross mark for failed tests', () => {
  const description = 'test';
  mockedReporter.step(description, false);

  assert(outputDevice.debug.calledWith('test => x'))
  //   });
  // });
})();

(() => {
  // spec('Reporter', (unit) => {
  //   unit('should print number of successes and failures', () => {=
  mockedReporter.result(3, 5);

  assert(outputDevice.log.calledWith('3 failed, 5 succeeded'))
  //   });
  // });
})();