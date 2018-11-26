import {describe, it} from '../lib';
import assert from 'assert';

const todoItems = (content) => {
  return content
    .split('\n')
    .filter(line => line.startsWith('- [ ] '))
    .map(line => line.substr(6))
    ;
};

const parseChangelog = (changelogContent) => {
  if (changelogContent) {
    const versions = changelogContent.split('# version');
    const firstVersionParagraph = versions[1];
    const version = firstVersionParagraph.split('\n')[0];
    return { version, items: todoItems(firstVersionParagraph) };
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
    it('AND many items THEN return the version, and only the todo-items', () => {
      const empty = '# version 2\n- [ ] one item\n- [x] two items\n- [ ] three items';
      assert.deepEqual(parseChangelog(empty), { version: 2, items: ['one item', 'three items'] });
    });
    it('AND items, surrounded by lots of empty lines (as a markdown files them might contain)', () => {
      const empty = '\n\n# version 2\n\n- [ ] one item\n- [ ] two items\n- [ ] three items\n\n';
      assert.deepEqual(parseChangelog(empty), { version: 2, items: ['one item', 'two items', 'three items'] });
    });
  });
  describe('WHEN it contains multiple "version lines"', () => {
    it('AND items THEN return only the first version found', () => {
      const empty = '# version 2\n- [ ] one item\n'+
                    '# version 1\n- [ ] 2nd item';
      assert.deepEqual(parseChangelog(empty), { version: 2, items: ['one item'] });
    });
    it('AND no items THEN return only the first version', () => {
      const empty = '# version 2\n- [x] one item\n'+
                    '# version 1\n- [ ] 2nd item';
      assert.deepEqual(parseChangelog(empty), { version: 2, items: [] });
    });
    it('AND many items are to do THEN return only the first version and it`s todos', () => {
      const empty = '# version 2\n- [ ] 1st item\n- [x] one item\n'+
                    '# version 1\n- [ ] 2nd item';
      assert.deepEqual(parseChangelog(empty), { version: 2, items: ['1st item'] });
    });
  });
});