/*
 * - spec+unit structure should be collected
 */

const assert = require('assert');
const { spec, unit } = require('../lib');

class SpecCollector {
  constructor() {
    this.numberOfSpecs = 0;
    this.units = [];
    this._activeSpecs = [];
  }

  get numberOfUnits() {
    return this.units.length;
  }

  addUnit(description, testFunction) {
    this.units.push({description, testFunction, specs: [...this._activeSpecs]});
  }

  addSpec(description, specCallback) {
    this._activeSpecs.push(description);
    specCallback();
    this.numberOfSpecs++;
    this._activeSpecs.pop();
  }

  withEachUnit(doWith) {
    this.units.forEach(doWith);
  }
}



spec('SpecCollector', () => {
  unit('Providing 1 unit, SpecCollector finds 1 unit.', () => {
    const specCollector = new SpecCollector();
    specCollector.addUnit('1 unit', () => {});

    assert.equal(specCollector.numberOfUnits, 1);
  });



  unit('Providing multiple units, SpecCollector finds them.', () => {
    const specCollector = new SpecCollector();
    specCollector.addUnit('1 unit', () => {});
    specCollector.addUnit('1 unit', () => {});

    assert.equal(specCollector.numberOfUnits, 2);
  });

  unit('Providing unit inside spec, SpecCollector finds the unit.', () => {
    const specCollector = new SpecCollector();
    specCollector.addSpec('spec with one unit', () => {
      specCollector.addUnit('1 unit', () => {});
    });

    assert.equal(specCollector.numberOfUnits, 1);
  });

  unit('Providing unit inside spec, SpecCollector finds the spec.', () => {
    const specCollector = new SpecCollector();
    specCollector.addSpec('spec with one unit', () => {
      specCollector.addUnit('1 unit', () => {});
    });

    assert.equal(specCollector.numberOfSpecs, 1);
  });

  unit('When code inside spec throws, specCollector should stop.', () => {
    const specCollector = new SpecCollector();

    const fn = () => {
      specCollector.addSpec('spec with one unit', () => {
        throw Error();
      });
    };
    assert.throws(fn);
  });

  unit('SpecCollector collects descriptions', () => {
    const specCollector = new SpecCollector();
    const desc = 'description';

    specCollector.addUnit(desc, () => {});

    const hasUnitDescription = unit => {
      assert.equal(unit.description, desc);
    };
    specCollector.withEachUnit(hasUnitDescription);
  });

  unit('SpecCollector collects empty descriptions', () => {
    const specCollector = new SpecCollector();
    const emptyDesc = '';

    specCollector.addUnit(emptyDesc, () => {});

    const hasUnitDescription = unit => {
      assert.equal(unit.description, emptyDesc);
    };
    specCollector.withEachUnit(hasUnitDescription);
  });

  unit('SpecCollector collects functions', () => {
    const specCollector = new SpecCollector();
    const referenceFunction = () => {};

    specCollector.addUnit('', referenceFunction);

    const hasUnitFunction = unit => {
      assert.equal(unit.testFunction, referenceFunction);
    };
    specCollector.withEachUnit(hasUnitFunction);
  });

  unit('SpecCollector collects unit (description+fn).', () => {
    const specCollector = new SpecCollector();
    const description = 'my desc';
    const referenceFunction = () => {};

    specCollector.addUnit(description, referenceFunction);

    const doWith = (unit) => {
      assert(unit.description, description);
      assert(unit.testFunction, referenceFunction);
    };
    specCollector.withEachUnit(doWith);
  });

  unit('SpecCollector collects specs.', () => {
    const specCollector = new SpecCollector();

    const noop = () => {};
    const description = 'unit';
    specCollector.addSpec('spec', () => {
      specCollector.addSpec('spec1', () => {
        specCollector.addUnit(description, noop);
      });
    });

    const doWith = (unit) => {
      assert(unit.specs, ['spec', 'spec1']);
      assert(unit.description, description);
      assert(unit.testFunction, noop);
    };
    specCollector.withEachUnit(doWith);
  });
});