const beaver = require('../../lib');
const logMock = require('../../utils/log-mock');
const assert = require('assert');

const { spec, unit } = beaver;

logMock.apply();

spec("equality spec", () => {
  unit("1 should equal 1", () => assert.equal(1, 1));
  unit("2 should equal 2", () => assert.equal(2, 2));
});

spec("yet another equality spec", () => {
  unit("3 should equal 3", () => assert.equal(3, 3));
  unit("4 should equal 4", () => assert.equal(4, 4));
});

setTimeout(() => {
  assert.deepEqual(logMock.getMessages(), [
    "equality spec",
    "  1 should equal 1",
    "  2 should equal 2",
    "yet another equality spec",
    "  3 should equal 3",
    "  4 should equal 4"
  ]);
}, 0);
