const assert = require('assert');
const path = require('path');
const { spec: describe, unit: it } = require('../index');
const { findFilesInDirectory } = require('./find-files-in-directory.js');

describe('Find files in directory', () => {
  it('WHEN directory is invalid, THEN find no files', () => {
    const filesFound = findFilesInDirectory('invalid dir');
    assert.deepEqual([], filesFound);
  });
  it('WHEN this directory is given, THEN find at least one file', () => {
    const filesFound = findFilesInDirectory(__dirname);
    assert(filesFound.length > 1);
  });
  it('WHEN the parent directory is given, THEN find more files than inside this directory', () => {
    const filesFoundInsideParentDir = findFilesInDirectory(path.join(__dirname, '..'));
    const filesFoundInsideThisDir = findFilesInDirectory(__dirname);
    assert(filesFoundInsideParentDir.length > filesFoundInsideThisDir.length);
  });
});
