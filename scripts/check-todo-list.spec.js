import { it, describe } from '../lib';
import assert from 'assert';

const parseChangelog = () => {
  return { version: -1, items: [] };
};

describe('Parse a CHANGELOG.md', () => {
  it('WHEN empty return no info', () => {
    const empty = '';
    assert.deepEqual(parseChangelog(empty), { version: -1, items: [] });
  });
});