import assert from 'assert';
import { describe, it } from '../lib';

describe('Example Spec', () => {
  it('unit', () => {
    const expected = 2;
    const actual = 2;
    assert.equal(actual, expected);
  });

  describe('Async', () => {
    it('with async / await', async () => {
      const actual = () => new Promise(resolve => resolve(true));
      const expected = true;

      const result = await actual();

      assert.equal(expected, result)
    });

    it('without async/await', () => {
      const actual = () => new Promise(resolve => resolve(true));
      const expected = true;

      return actual().then(result => assert.equal(expected, result));
    });
  });
});
