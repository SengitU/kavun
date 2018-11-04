const assert = require('assert');
const sinon = require('sinon');
const { loadPotentialTestFiles } = require('../lib/file-loader');
const { spec, unit } = require('../lib/index');

const loadAllFiles = (loaderMock, file, deps) => {
  const filesFilter = () => true;
  return loadPotentialTestFiles(loaderMock, file, {filesFilter, ...deps})
};

spec('FileLoader', () => {
  unit('should load given files', () => {
    const file = `${process.cwd()}/tests/file-loader.spec.js`;
    
    const loaderMock = sinon.spy();
    loadPotentialTestFiles(loaderMock, file);

    assert(loaderMock.calledWith(file));
  });
  unit('should load given files, with injected deps', () => {
    const file = '/any/file-loader.spec.js';
    const findFilesInDirectory = () => [file];

    const loaderMock = sinon.spy();
    loadAllFiles(loaderMock, file, {findFilesInDirectory});

    assert(loaderMock.calledWith(file));
  });

  unit('should be able to load all specs inside of the given path', () => {
    const dirName = (fileName) => `${__dirname}/${fileName}`;
    const loaderMock = sinon.spy();
    loadPotentialTestFiles(loaderMock, __dirname);

    assert(loaderMock.calledWith(dirName('execute.spec.js')));
    assert(loaderMock.calledWith(dirName('reporter.spec.js')));
    assert(loaderMock.calledWith(dirName('runner.spec.js')));
    assert(loaderMock.calledWith(dirName('unit-collector.spec.js')));
    assert(loaderMock.calledWith(dirName('file-loader.spec.js')));
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

    loadPotentialTestFiles(loaderFn, 'irrelevant/dir-name', {findFilesInDirectory, filesFilter});

    assert(loaderFn.calledWith('two.spec.js'));
  });
});
