import assert from 'assert';
import { describe, it } from '../lib/index.js';
import SpecCollector from '../lib/unit-collector';

const noop = () => {};

describe('A `SpecCollector`', () => {
  it('when a spec throws, it lets the error bubble up', () => {
    const specCollector = new SpecCollector();
    const fn = () => {
      specCollector.addSpec('spec that throws', () => {
        throw Error();
      });
    };
    assert.throws(fn);
  });

  describe('collecting tests (tests) via `addUnit()`', () => {
    const addUnit = (desc, testFn = noop, options = {}) => {
      const specCollector = new SpecCollector();
      specCollector.addUnit(desc, testFn, options);
      return specCollector;
    };
    const valuesForAttribute = (specCollector, attribute) => {
      const values = [];
      specCollector.withEachUnit(unit => values.push(unit[attribute]));
      return values;
    };
    const descriptionsOf = (specCollector) =>
      valuesForAttribute(specCollector, 'description');
    const testFunctionsOf = (specCollector) =>
      valuesForAttribute(specCollector, 'testFunction');
    const timeoutsOf = (specCollector) =>
      valuesForAttribute(specCollector, 'timeout');

    it('stores the unit`s description', () => {
      const desc = 'description';
      const specCollector = addUnit(desc);
      assert.deepEqual(descriptionsOf(specCollector), [desc]);
    });
  
    it('stores empty descriptions', () => {
      const emptyDesc = '';
      const specCollector = addUnit(emptyDesc);
      assert.deepEqual(descriptionsOf(specCollector), [emptyDesc]);
    });
  
    it('stores the unit`s function', () => {
      const referenceFunction = () => {};
      const specCollector = addUnit('', referenceFunction);
      assert.deepEqual(testFunctionsOf(specCollector), [referenceFunction]);
    });
  
    it('stores unit`s description and function', () => {
      const description = 'my desc';
      const referenceFunction = () => {};
      const specCollector = addUnit(description, referenceFunction);
      assert.deepEqual(descriptionsOf(specCollector), [description]);
      assert.deepEqual(testFunctionsOf(specCollector), [referenceFunction]);
    });
  
    it('stores timeout option for tests', () => {
      const description = 'my desc';
      const timeout = 1000;
      const referenceFunction = () => {};
      const specCollector = addUnit(description, referenceFunction, { timeout });
      assert.deepEqual(descriptionsOf(specCollector), [description]);
      assert.deepEqual(testFunctionsOf(specCollector), [referenceFunction]);
      assert.deepEqual(timeoutsOf(specCollector), [timeout]);
    });
  });
  
  describe('collecting specs (suites) via `addSpec()`', () => {
    it('stores specs', () => {
      const specCollector = new SpecCollector();
      const description = 'unit';
      specCollector.addSpec('spec', () => {
        specCollector.addSpec('spec1', () => {
          specCollector.addUnit(description, noop);
        });
      });
      specCollector.withEachUnit(unit => {
        assert(unit.specs, ['spec', 'spec1']);
        assert(unit.description, description);
        assert(unit.testFunction, noop);
      });
    });
  });
  
  describe('provides statistics', () => {
    describe('the number of tests (via `numberOfTests`), when provided', () => {
      it('1 unit, it finds 1 unit.', () => {
        const specCollector = new SpecCollector();
        specCollector.addUnit('1 unit', () => {});
        assert.equal(specCollector.numberOfTests, 1);
      });
    
      it('multiple tests, it finds them.', () => {
        const specCollector = new SpecCollector();
        specCollector.addUnit('1 unit', () => {});
        specCollector.addUnit('1 unit', () => {});
        assert.equal(specCollector.numberOfTests, 2);
      });
    
      it('unit inside spec, it finds the unit.', () => {
        const specCollector = new SpecCollector();
        specCollector.addSpec('spec with one unit', () => {
          specCollector.addUnit('1 unit', () => {});
        });
        assert.equal(specCollector.numberOfTests, 1);
      });
    });
  
    describe('the number of specs (via `numberOfSuites`), when provided', () => {
      it('a unit inside a spec, it finds the spec.', () => {
        const specCollector = new SpecCollector();
        specCollector.addSpec('spec with one unit', () => {
          specCollector.addUnit('1 unit', () => {});
        });
        assert.equal(specCollector.numberOfSuites, 1);
      });
      
      it('a unit nested inside two specs, it finds two specs.', () => {
        const specCollector = new SpecCollector();
        specCollector.addSpec('spec with one spec and unit', () => {
          specCollector.addSpec('spec with one unit', () => {
            specCollector.addUnit('1 unit', () => {});
          });
        });
        assert.equal(specCollector.numberOfSuites, 2);
      });
    });
  });
  
  describe('API, implementation specifics', () => {
    it('`numberOfSuites` can`t be modified', () => {
      const specCollector = new SpecCollector();
      specCollector.addSpec('', () => {});
      try { // make sure to catch errors, in case the setting of a getter throws :)
        specCollector.numberOfSuites = 0;
      } catch (e) {}
      assert.equal(specCollector.numberOfSuites, 1);
    });
  });
});
