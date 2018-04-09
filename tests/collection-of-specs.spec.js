/*
 * - spec+unit structure should be collected
 */

const assert = require('assert');

class SpecCollector {
  constructor() {
    this.numberOfSpecs = 0;
    this.units = [];
  }

  get numberOfUnits() {
    return this.units.length;
  }

  unit(description, testFunction) {
    this.units.push({description, testFunction});
  }

  spec(description, specCallback) {
    specCallback();
    this.numberOfSpecs++;
  }

  withEachUnit(doWith) {
    this.units.forEach(doWith);
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

  const hasUnitDescription = unit => {
    assert.equal(unit.description, desc);
  };
  specCollector.withEachUnit(hasUnitDescription);
}

{
  // SpecCollector collects empty descriptions
  const specCollector = new SpecCollector();
  const emptyDesc = '';

  specCollector.unit(emptyDesc, () => {});

  const hasUnitDescription = unit => {
    assert.equal(unit.description, emptyDesc);
  };
  specCollector.withEachUnit(hasUnitDescription);
}

{
  // SpecCollector collects functions
  const specCollector = new SpecCollector();
  const referenceFunction = () => {};

  specCollector.unit('', referenceFunction);

  const hasUnitFunction = unit => {
    assert.equal(unit.testFunction, referenceFunction);
  };
  specCollector.withEachUnit(hasUnitFunction);
}

{
  // SpecCollector collects unit (description+fn).
  const specCollector = new SpecCollector();
  const description = 'my desc';
  const referenceFunction = () => {};

  specCollector.unit(description, referenceFunction);

  const doWith = (unit) => {
    assert(unit.description, description);
    assert(unit.testFunction, referenceFunction);
  };
  specCollector.withEachUnit(doWith);
}
