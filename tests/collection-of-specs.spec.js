/*
 * No spec, no unit
 * 1 unit
 */

const assert = require('assert');

class SpecCollector {
  constructor() {
    this.numberOfUnits = 0;
    this.numberOfSpecs = 0;
  }

  unit() {
    this.numberOfUnits++;
  }

  spec(description, specCallback) {
    specCallback();
    this.numberOfSpecs++;
  }

}

{
  const {unit} = new SpecCollector();
  unit('1 unit', () => {});

  assert.equal(specCollector.numberOfUnits, 1);
}

{
  const specCollector = new SpecCollector();
  specCollector.unit('1 unit', () => {});
  specCollector.unit('1 unit', () => {});

  assert.equal(specCollector.numberOfUnits, 2);
}

{
  const specCollector = new SpecCollector();
  specCollector.spec('spec with one unit', () => {
    specCollector.unit('1 unit', () => {});
  });

  assert.equal(specCollector.numberOfUnits, 1);
}

{
  const specCollector = new SpecCollector();
  specCollector.spec('spec with one unit', () => {
    specCollector.unit('1 unit', () => {});
  });

  assert.equal(specCollector.numberOfSpecs, 1);
}
