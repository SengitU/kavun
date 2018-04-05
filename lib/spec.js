const createUnit = require('./unit');

const createSpec = (description, specCallback) => {
  const specDefinition = {type: 'spec', description, tests: []};
  const unit = (description, executable) => specDefinition.tests.push(createUnit(description, executable));

  specCallback(unit);

  return specDefinition;
};

module.exports = createSpec;