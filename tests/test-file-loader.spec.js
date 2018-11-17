import assert from 'assert';
import { describe, it } from '../lib';
import { noop, buildSpy } from '../tests/utils.js';
import { loadTestFiles } from '../lib/test-file-loader';

describe('FileLoader (slow tests)', () => {
  it('WHEN given a file, THEN loads just this file', () => {
    const file = `${process.cwd()}/tests/test-file-loader.spec.js`;
    const loaderMock = buildSpy();
    loadTestFiles(loaderMock, file);
    assert(loaderMock.calledWith(file));
  });
  it('WHEN given a path, THEN it loads all files in there', () => {
    const dirName = (fileName) => `${__dirname}/${fileName}`;
    const loaderMock = buildSpy();
    loadTestFiles(loaderMock, __dirname);
    assert(loaderMock.calledWith(dirName('execute.spec.js')));
    assert(loaderMock.calledWith(dirName('runner.spec.js')));
    assert(loaderMock.calledWith(dirName('unit-collector.spec.js')));
    assert(loaderMock.calledWith(dirName('test-file-loader.spec.js')));
  });
});

describe('The `FileLoader`', () => {
  const defaultDeps = {
    findFilesInDirectory: noop,
    isFile: () => false,
  };
  const load = (loaderFn, deps) => {
    const fileFilter = () => true;
    loadTestFiles(loaderFn, 'irrelevant/dir-name', fileFilter, {...defaultDeps, ...deps});
  };

  it('WHEN given an empty directory, THEN loads no file', () => {
    const emptyDirectory = [];
    const findFilesInDirectory = () => emptyDirectory;
    const loaderFn = buildSpy();
    load(loaderFn, {findFilesInDirectory});
    assert.equal(loaderFn.wasCalled, false);
  });
  it('WHEN given a file, THEN loads just this file', () => {
    const isFile = () => true;
    const loaderFn = buildSpy();
    load(loaderFn, {isFile});
    assert.equal(loaderFn.callCount, 1);
  });
  it('WHEN given a directory with files, THEN loads all files', () => {
    const dirWithFiles = ['one.spec.js', 'two.spec.js'];
    const findFilesInDirectory = () => dirWithFiles;
    const loaderFn = buildSpy();
    load(loaderFn, {findFilesInDirectory});
    assert.equal(loaderFn.callCount, dirWithFiles.length);
  });
  it('WHEN given a directory with files AND a filter, THEN loads all files matching this filter', () => {
    const dirWithFiles = ['one.js', 'two.spec.js'];
    const findFilesInDirectory = () => dirWithFiles;
    const filesFilter = (fileName) => fileName === 'two.spec.js';
    const loaderFn = buildSpy();
    loadTestFiles(loaderFn, 'irrelevant/dir-name', filesFilter, {...defaultDeps, findFilesInDirectory});
    assert(loaderFn.calledWith('two.spec.js'));
  });
});
