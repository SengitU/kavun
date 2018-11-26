import { it, describe } from '../lib';
import assert from 'assert';

describe('Parse a CHANGELOG.md', () => {
  it('WHEN empty return no info', () => {
    const empty = '';
    assert.equal(parseChangelog(empty), { version: -1, items: [] });
  });
});