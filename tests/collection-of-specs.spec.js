/*
 * No spec, no unit
 * 1 unit
 */

const assert = require('assert');

class SpecCollector {
  constructor() {
    this.numberOfUnits = 0;
  }

  unit() {
    this.numberOfUnits++;
  }
}

{
  const specCollector = new SpecCollector();
  specCollector.unit('1 unit', () => {});

  assert.equal(specCollector.numberOfUnits, 1);
}

{
  const specCollector = new SpecCollector();
  specCollector.unit('1 unit', () => {});
  specCollector.unit('1 unit', () => {});

  assert.equal(specCollector.numberOfUnits, 2);
}

{
  let numberOfUnits = 0;
  const spec = (description, specCallback) => { specCallback() };
  const unit = () => { numberOfUnits++ };
  spec('spec with one unit', () => {
    unit('1 unit', () => {});
  });

  assert.equal(numberOfUnits, 1);
}

{
  let numberOfUnits = 0;
  let numberOfSpecs = 0;
  const spec = (description, specCallback) => { numberOfSpecs++; specCallback(); };
  const unit = () => { numberOfUnits++ };
  spec('spec with one unit', () => {
    unit('1 unit', () => {});
  });

  assert.equal(numberOfSpecs, 1);
}
