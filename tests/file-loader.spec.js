const assert = require('assert');
const sinon = require('sinon');
const fileLoader = require('../lib/file-loader');
const { spec, unit } = require('../lib/index');

const loaderMock = sinon.spy();
const mockLoader = fileLoader(loaderMock);

spec('FileLoader', () => {
  unit('should load given files', () => {
    const file = `${process.cwd()}/tests/file-loader.spec.js`;
    
    mockLoader.load(file);

    assert(loaderMock.calledWith(file));
  });

  unit('should be able to load all specs inside of the given path', () => {
    const dirName = (fileName) => `${__dirname}/${fileName}`;
    mockLoader.load(__dirname);

    assert(loaderMock.calledWith(dirName('execute.spec.js')));
    assert(loaderMock.calledWith(dirName('reporter.spec.js')));
    assert(loaderMock.calledWith(dirName('runner.spec.js')));
    assert(loaderMock.calledWith(dirName('unit-collector.spec.js')));
    assert(loaderMock.calledWith(dirName('file-loader.spec.js')));
  });
});