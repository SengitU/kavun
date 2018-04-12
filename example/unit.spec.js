const assert = require('assert');
const { unit } = require('../lib');

unit('Example unit', () => {
  const expected = 2;
  const actual = 2;
  assert.equal(actual, expected);
});

unit('Example async unit with async / await', async () => {
  const actual = () => new Promise(resolve => resolve(true));
  const expected = true;

  const result = await actual();
  assert.equal(expected, result);
});

unit('Example async unit without async/await', () => {
  const actual = () => new Promise(resolve => resolve(true));
  const expected = true;

  return actual().then(result => assert.equal(expected, result));
});
