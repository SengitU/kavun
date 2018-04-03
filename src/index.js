const assert = require('assert');

const beaver = (() => {
  const tests = {};

  let currentSpecId = 0;

  const execute = (test) => {
    try {
      test();
      return true;
    } catch(error) {
      return false;
    }
  };

  // No more standalone, executable units anymore 🤦‍
  const unit = test => tests[currentSpecId].push(test);
  
  const spec = (specCallback) => {
    tests[currentSpecId] = [];

    specCallback();

    const testResults = tests[currentSpecId].map(test => execute(test));

    currentSpecId += 1;

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
  spec(() => {
    unit(() => assert.equal(1, 1));
    unit(() => assert.equal(2, 2));
  })
);

assert.equal(
  'Some tests are failed',
  spec(() => {
    unit(() => assert.equal(0, 1));
    unit(() => assert.equal(2, 2));
  })
);