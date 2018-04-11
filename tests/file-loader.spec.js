const assert = require('assert');
const sinon = require('sinon');
const fileLoader = require('../lib/file-loader');
const { spec, unit } = require('../lib/index');

const loaderMock = sinon.spy();
const mockLoader = fileLoader(loaderMock);

spec('FileLoader', () => {
  unit('should load given files', () => {
    const firstFile = `${__dirname}/test-files/1.spec.js`;
    const secondFile = `${__dirname}/test-files/2.spec.js`;

    mockLoader.loadPaths([firstFile, secondFile]);

    assert(loaderMock.calledWith(firstFile));
    assert(loaderMock.calledWith(secondFile));
  });

  unit('should be able to load all specs', () => {
    const dirName = (fileName) => `${__dirname}/${fileName}`;
    mockLoader.loadAll();

    assert(loaderMock.calledWith(dirName('execute.spec.js')));
    assert(loaderMock.calledWith(dirName('reporter.spec.js')));
    assert(loaderMock.calledWith(dirName('runner.spec.js')));
    assert(loaderMock.calledWith(dirName('unit-collector.spec.js')));
    assert(loaderMock.calledWith(dirName('file-loader.spec.js')));
    assert(loaderMock.calledWith(dirName('integration/spec/failure.spec.js')));
    assert(loaderMock.calledWith(dirName('integration/spec/success.spec.js')));
    assert(loaderMock.calledWith(dirName('integration/unit/success.spec.js')));
    assert(loaderMock.calledWith(dirName('integration/unit/failure.spec.js')));
  });

});