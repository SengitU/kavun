const assert = require('assert');

const spec = (test) => {
  try {
    test.apply();
    console.log('Success')
  } catch(error) {
    console.log('Failure')
  }
};

// Should success
spec(() => {
  assert.equal(1, 1)
});

// Should fail
spec(() => {
  assert.equal(0, 1)
});