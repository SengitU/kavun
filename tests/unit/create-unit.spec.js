const assert = require('assert');
const createUnit = require('../../lib/unit');
// const beaver = require('../../lib');

// const { spec } = beaver;

// spec('createUnit', (unit) => {
//   unit('Should create necessary executable format', () => {
    const description = 'test';
    const test = () => {};

    assert.deepEqual(createUnit(description, test), {type: 'unit', description, executable: test});
  // });
// });
