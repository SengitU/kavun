const assert = require('assert');
const createSpec = require('../lib/spec');
const beaver = require('../lib/index');

const { spec } = beaver;

spec('createSpec', (unit) => {
  unit('Should create necessary executable format', () => {
    const description = 'test';
    const test = () => {};
    const specCallback = (unit) => { unit(description, test) };

    assert.deepEqual(createSpec(description, specCallback), {
      type: 'spec',
      description,
      tests: [{
        type: 'unit',
        description,
        executable: test
      }]
    });
  });
});
