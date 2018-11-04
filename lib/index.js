const UnitCollector = require('./unit-collector');

const unitCollector = new UnitCollector();
const it = (...args) => unitCollector.addUnit(...args);
const describe = (...args) => unitCollector.addSpec(...args);

const legacyExports = {unit: it, spec: describe};
module.exports = {
  it, 
  describe,
  unitCollector,
  ...legacyExports,
};