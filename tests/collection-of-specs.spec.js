/*
 * - spec+unit structure should be collected
 * - if code inside specCallback throws, ensure still works
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
  // Providing 1 unit, SpecCollector finds 1 unit.
  const specCollector = new SpecCollector();
  specCollector.unit('1 unit', () => {});

  assert.equal(specCollector.numberOfUnits, 1);
}

{
  // Providing multiple units, SpecCollector finds them.
  const specCollector = new SpecCollector();
  specCollector.unit('1 unit', () => {});
  specCollector.unit('1 unit', () => {});

  assert.equal(specCollector.numberOfUnits, 2);
}

{
  // Providing unit inside spec, SpecCollector finds the unit.
  const specCollector = new SpecCollector();
  specCollector.spec('spec with one unit', () => {
    specCollector.unit('1 unit', () => {});
  });

  assert.equal(specCollector.numberOfUnits, 1);
}

{
  // Providing unit inside spec, SpecCollector finds the spec.
  const specCollector = new SpecCollector();
  specCollector.spec('spec with one unit', () => {
    specCollector.unit('1 unit', () => {});
  });

  assert.equal(specCollector.numberOfSpecs, 1);
}

{
  // When code inside spec throws, specCollector should stop.
  const specCollector = new SpecCollector();

  const fn = () => {
    specCollector.spec('spec with one unit', () => {
      throw Error();
    });
  };
  assert.throws(fn);
}