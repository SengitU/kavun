const assert = require('assert');

const unit = (test) => {
  try {
    test.apply();
    return true;
  } catch(error) {
    return false;
  }
};

assert.equal(
  true,
  // Should return true
  unit(() => {
    assert.equal(1, 1)
  })
);

assert.equal(
  false,
  // Should return false
  unit(() => {
    assert.equal(0, 1)
  })
);