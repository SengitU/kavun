import { it, describe } from '../lib';
import assert from 'assert';

const parseChangelog = (changelogContent) => {
  if (changelogContent) {
    const version = changelogContent.split('# version')[1].split('\n')[0];
    const [, ...items] = changelogContent.split('\n- [ ] ');
    return { version, items };
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
      const empty = '# version 1\n- [ ] one item';
      assert.deepEqual(parseChangelog(empty), { version: 1, items: ['one item'] });
    });
    it('AND many items THEN return the version, and the items', () => {
      const empty = '# version 2\n- [ ] one item\n- [ ] two items\n- [ ] three items';
      assert.deepEqual(parseChangelog(empty), { version: 2, items: ['one item', 'two items', 'three items'] });
    });
  });
});