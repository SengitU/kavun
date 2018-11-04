import assert from 'assert';
import { describe, it, xit, xdescribe, unitCollector } from '../lib';

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