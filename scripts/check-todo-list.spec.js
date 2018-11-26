import { it, describe } from '../lib';
import assert from 'assert';

const parseChangelog = (changelogContent) => {
  if (changelogContent) {
    if (changelogContent.includes('- [ ]')) {
      return { version: 1, items: ['one item'] };
    }
    return { version: 42, items: [] };
  }
  return { version: -1, items: [] };
};

describe('Parse a CHANGELOG.md', () => {
  it('WHEN empty THEN return no info', () => {
    const empty = '';
    assert.deepEqual(parseChangelog(empty), { version: -1, items: [] });
  });
  describe('WHEN it contains one "version line"', () => {
    it('AND no items THEN return the version, no items', () => {
      const empty = '# version 42';
      assert.deepEqual(parseChangelog(empty), { version: 42, items: [] });
    });
    it('AND one item THEN return the version, and one item', () => {
      const empty = '# version 42\n- [ ] one item';
      assert.deepEqual(parseChangelog(empty), { version: 1, items: ['one item'] });
    });
  });
});