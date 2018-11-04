const UnitCollector = require('./unit-collector');

const unitCollector = new UnitCollector();
const it = (...args) => unitCollector.addUnit(...args);
const describe = (...args) => unitCollector.addSpec(...args);
const noop = () => {};

const legacyExports = {unit: it, spec: describe};
module.exports = {
  it, 
  describe,
  xit: noop,
  xdescribe: noop,
  unitCollector,
  ...legacyExports,
};