import assert from 'assert';
import { it } from '../lib';

it('Example unit', () => {
  const expected = 2;
  const actual = 2;
  assert.equal(actual, expected);
});

it('Example async unit with async / await', async () => {
  const actual = () => new Promise(resolve => resolve(true));
  const expected = true;

  const result = await actual();
  assert.equal(expected, result);
});

it('Example async unit without async/await', () => {
  const actual = () => new Promise(resolve => resolve(true));
  const expected = true;

  return actual().then(result => assert.equal(expected, result));
});

it('Example unit with extended timeout', async () => {
  const actual = () => new Promise(resolve => setTimeout(() => resolve(true), 1700));
  const expected = true;

  const result = await actual();
  assert.equal(expected, result);
}, { timeout: 2000 });
