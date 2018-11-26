import assert from 'assert';
import { describe, it } from '../lib';
import { buildSpy } from './build-spy.js';
import { loadTestFiles } from '../lib/test-file-loader';

describe('The `FileLoader`', () => {
  it('WHEN given an no files, THEN loads no file', () => {
    const emptyDirectory = [];
    const loaderFn = buildSpy();
    loadTestFiles(loaderFn, emptyDirectory);
    assert.equal(loaderFn.wasCalled, false);
  });
  it('WHEN given a file, THEN loads just this file', () => {
    const loaderFn = buildSpy();
    loadTestFiles(loaderFn, ['file.js']);
    assert.equal(loaderFn.callCount, 1);
  });
  it('WHEN given many files, THEN loads all files', () => {
    const manyFiles = ['one.spec.js', 'two.spec.js'];
    const loaderFn = buildSpy();
    loadTestFiles(loaderFn, manyFiles);
    assert.equal(loaderFn.callCount, manyFiles.length);
  });
});
