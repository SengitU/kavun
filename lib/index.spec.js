const assert = require('assert');
const execute = require('../lib/execute');
const { describe, it, xit, xdescribe, unitCollector } = require('../lib');

describe('Kavun', () => {
  it('provides `xit` which adds no new test', () => {
    const numberOfUnitsBefore = unitCollector.numberOfUnits;
    xit();
    assert.equal(numberOfUnitsBefore, unitCollector.numberOfUnits);
  });
  it('provides `xdescribe` which adds no new test suite', () => {
    const numberOfUnitsBefore = unitCollector.numberOfSpecs;
    xdescribe();
    assert.equal(numberOfUnitsBefore, unitCollector.numberOfSpecs);
  });
});