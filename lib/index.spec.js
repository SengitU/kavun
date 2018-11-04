const assert = require('assert');
const { describe, it, xit, xdescribe, unitCollector } = require('../lib');

describe('Kavun', () => {
  it('provides `xit` which adds no new test', () => {
    const numberOfUnitsBefore = unitCollector.numberOfTests;
    xit();
    assert.equal(numberOfUnitsBefore, unitCollector.numberOfTests);
  });
  it('provides `xdescribe` which adds no new test suite', () => {
    const numberOfUnitsBefore = unitCollector.numberOfSuites;
    xdescribe();
    assert.equal(numberOfUnitsBefore, unitCollector.numberOfSuites);
  });
});