const assert = require('assert');
const sinon = require('sinon');
const { loadTestFiles } = require('../lib/test-file-loader');
const { spec, unit } = require('../lib/index');

const noop = () => {};
const loadAllFiles = (loaderMock, file, deps) => {
  const filesFilter = () => true;
  return loadTestFiles(loaderMock, file, filesFilter, {isFile: () => false, ...deps});
};

spec('FileLoader', () => {
  unit('should load given files', () => {
    const file = `${process.cwd()}/tests/test-file-loader.spec.js`;
    
    const loaderMock = sinon.spy();
    loadTestFiles(loaderMock, file);

    assert(loaderMock.calledWith(file));
  });
  unit('should be able to load all specs inside of the given path', () => {
    const dirName = (fileName) => `${__dirname}/${fileName}`;
    const loaderMock = sinon.spy();
    loadTestFiles(loaderMock, __dirname);

    assert(loaderMock.calledWith(dirName('execute.spec.js')));
    assert(loaderMock.calledWith(dirName('reporter.spec.js')));
    assert(loaderMock.calledWith(dirName('runner.spec.js')));
    assert(loaderMock.calledWith(dirName('unit-collector.spec.js')));
    assert(loaderMock.calledWith(dirName('test-file-loader.spec.js')));
  });
});

const { spec: describe, unit: it } = require('../lib/index');
describe('The `FileLoader`', () => {
  const buildSpy = () => {
    const calledWith = [];
    const spy = (...args) => {
      spy.wasCalled = true;
      spy.callCount++;
      calledWith.push(args);
    };
    spy.wasCalled = false;
    spy.callCount = 0;
    const dumbDeepCompare = (what, args) => ''+what === ''+args;
    spy.calledWith = (what) =>
      calledWith.map(args => dumbDeepCompare(what, args)).length > 0;
    return spy;
  };
  
  it('WHEN given an empty directory, THEN loads no file', () => {
    const emptyDirectory = [];
    const findFilesInDirectory = () => emptyDirectory;
    const loaderFn = buildSpy();

    loadAllFiles(loaderFn, 'irrelevant/dir-name', {findFilesInDirectory});

    assert.equal(loaderFn.wasCalled, false);
  });
  it('WHEN given a file, THEN loads just this file', () => {
    const findFilesInDirectory = noop;
    const isFile = () => true;
    const loaderFn = buildSpy();

    loadTestFiles(loaderFn, 'irrelevant/dir-name', () => true, {findFilesInDirectory, isFile});

    assert.equal(loaderFn.callCount, 1);
  });
  it('WHEN given a directory with files, THEN loads all files', () => {
    const dirWithFiles = ['one.spec.js', 'two.spec.js'];
    const findFilesInDirectory = () => dirWithFiles;
    const loaderFn = buildSpy();

    loadAllFiles(loaderFn, 'irrelevant/dir-name', {findFilesInDirectory});

    assert.equal(loaderFn.callCount, dirWithFiles.length);
  });
  it('WHEN given a directory with files AND a filter, THEN loads all files matching this filter', () => {
    const dirWithFiles = ['one.js', 'two.spec.js'];
    const findFilesInDirectory = () => dirWithFiles;
    const filesFilter = (fileName) => fileName === 'two.spec.js';
    const loaderFn = buildSpy();

    loadTestFiles(loaderFn, 'irrelevant/dir-name', filesFilter, {findFilesInDirectory, isFile: () => false});

    assert(loaderFn.calledWith('two.spec.js'));
  });
});
