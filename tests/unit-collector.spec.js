const assert = require('assert');
const { spec, unit } = require('../lib');
const SpecCollector = require('../lib/unit-collector');

spec('A `SpecCollector`', () => {
  spec('provides statistics', () => {
    spec('the number of units (via `numberOfUnits`), when provided', () => {
      unit('1 unit, it finds 1 unit.', () => {
        const specCollector = new SpecCollector();
        specCollector.addUnit('1 unit', () => {});
    
        assert.equal(specCollector.numberOfUnits, 1);
      });
    
      unit('multiple units, it finds them.', () => {
        const specCollector = new SpecCollector();
        specCollector.addUnit('1 unit', () => {});
        specCollector.addUnit('1 unit', () => {});
    
        assert.equal(specCollector.numberOfUnits, 2);
      });
    
      unit('unit inside spec, it finds the unit.', () => {
        const specCollector = new SpecCollector();
        specCollector.addSpec('spec with one unit', () => {
          specCollector.addUnit('1 unit', () => {});
        });
    
        assert.equal(specCollector.numberOfUnits, 1);
      });
    });
  
    spec('the number of specs (via `numberOfSpecs`), when provided', () => {
      unit('a unit inside a spec, it finds the spec.', () => {
        const specCollector = new SpecCollector();
        specCollector.addSpec('spec with one unit', () => {
          specCollector.addUnit('1 unit', () => {});
        });
    
        assert.equal(specCollector.numberOfSpecs, 1);
      });
      
      unit('a unit nested inside two specs, it finds two specs.', () => {
        const specCollector = new SpecCollector();
        specCollector.addSpec('spec with one spec and unit', () => {
          specCollector.addSpec('spec with one unit', () => {
            specCollector.addUnit('1 unit', () => {});
          });
        });
    
        assert.equal(specCollector.numberOfSpecs, 2);
      });
    });
  });

  unit('when a spec throws, it lets the error bubble up', () => {
    const specCollector = new SpecCollector();

    const fn = () => {
      specCollector.addSpec('spec that throws', () => {
        throw Error();
      });
    };
    assert.throws(fn);
  });

  unit('collects descriptions', () => {
    const specCollector = new SpecCollector();
    const desc = 'description';

    specCollector.addUnit(desc, () => {});

    const hasUnitDescription = unit => {
      assert.equal(unit.description, desc);
    };
    specCollector.withEachUnit(hasUnitDescription);
  });

  unit('collects empty descriptions', () => {
    const specCollector = new SpecCollector();
    const emptyDesc = '';

    specCollector.addUnit(emptyDesc, () => {});

    const hasUnitDescription = unit => {
      assert.equal(unit.description, emptyDesc);
    };
    specCollector.withEachUnit(hasUnitDescription);
  });

  unit('collects functions', () => {
    const specCollector = new SpecCollector();
    const referenceFunction = () => {};

    specCollector.addUnit('', referenceFunction);

    const hasUnitFunction = unit => {
      assert.equal(unit.testFunction, referenceFunction);
    };
    specCollector.withEachUnit(hasUnitFunction);
  });

  unit('collects unit (description+fn).', () => {
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

  unit('collects timeout option for units.', () => {
    const specCollector = new SpecCollector();
    const description = 'my desc';
    const timeout = 1000;
    const referenceFunction = () => {};

    specCollector.addUnit(description, referenceFunction, { timeout });

    const doWith = (unit) => {
      assert(unit.description, description);
      assert(unit.testFunction, referenceFunction);
      assert(unit.timeout, timeout);
    };
    specCollector.withEachUnit(doWith);
  });

  unit('collects specs.', () => {
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