const assert = require('assert');

const beaver = (() => {
  const execute = (test) => {
    try {
      test();
      return true;
    } catch(error) {
      return false;
    }
  };

  const unit = test => execute(test);

  const spec = (specCallback) => {
    const tests = [];
    const unit = (test) => tests.push(test);

    specCallback(unit);

    const testResults = tests.map(execute);

    if(testResults.indexOf(false) > -1) {
      return 'Some tests are failed';
    } else {
      return 'All tests passed';
    }
  };

  return {
    spec,
    unit
  }
})();


const { unit, spec } = beaver;

assert.equal(
  'All tests passed',
  spec((unit) => {
    unit(() => assert.equal(1, 1));
    unit(() => assert.equal(2, 2));
  })
);

assert.equal(
  'Some tests are failed',
  spec((unit) => {
    unit(() => assert.equal(0, 1));
    unit(() => assert.equal(2, 2));
  })
);

assert.equal(
  true,
  unit(() => assert.equal(1, 1))
);