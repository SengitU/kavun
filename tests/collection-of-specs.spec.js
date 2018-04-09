/*
 * - spec+unit structure should be collected
 */

const assert = require('assert');

class SpecCollector {
  constructor() {
    this.numberOfUnits = 0;
    this.numberOfSpecs = 0;
    this.unitDescriptions = [];
  }

  unit(description) {
    this.unitDescriptions.push(description);
    this.numberOfUnits++;
  }

  spec(description, specCallback) {
    specCallback();
    this.numberOfSpecs++;
  }

  hasDescription(descriptionToFind) {
    const foundDescription = this.unitDescriptions.find(item => item === descriptionToFind);
    return foundDescription === descriptionToFind;
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

{
  // SpecCollector collects descriptions
  const specCollector = new SpecCollector();
  const desc = 'description';

  specCollector.unit(desc, () => {});

  assert.equal(specCollector.hasDescription(desc), true);
}

{
  // SpecCollector collects empty descriptions
  const specCollector = new SpecCollector();
  const emptyDesc = '';

  specCollector.unit(emptyDesc, () => {});

  assert.equal(specCollector.hasDescription(emptyDesc), true);
}
