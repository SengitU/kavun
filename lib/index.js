const UnitCollector = require('./unit-collector');

const unitCollector = new UnitCollector();

module.exports = {
  unit: (...args) => unitCollector.addUnit(...args),
  spec: (...args) => unitCollector.addSpec(...args),
  unitCollector
};