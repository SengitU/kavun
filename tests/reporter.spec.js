const sinon = require('sinon');
const assert = require('assert');
const reporter = require('../lib/reporters/index');
const beaver = require('../lib');

const { spec } = beaver;

// Output device is normally console
const outputDevice = {
  log: sinon.spy()
};
const mockedReporter = reporter(outputDevice);

spec('Reporter log', (unit) => {
  unit('should print exactly', () => {
    const description = 'test';
    mockedReporter.log(description, true);

    assert(outputDevice.log.calledWith('test'))
  });
});


spec('Reporter step', (unit) => {
  unit('should add check mark for succeeded tests', () => {
    const description = 'test';
    mockedReporter.step(description, true);

    assert(outputDevice.log.calledWith('test => ✓'))
  });

  unit('should add cross mark for failed tests', () => {
    const description = 'test';
    mockedReporter.step(description, false);

    assert(outputDevice.log.calledWith('test => x'))
  });
});

spec('Reporter result', (unit) => {
  unit('should print number of successes and failures', () => {
    mockedReporter.result(3, 5);

    assert(outputDevice.log.calledWith('3 failed, 5 succeeded'))
  });
});
