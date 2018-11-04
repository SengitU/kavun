class UnitCollector {
  constructor() {
    this._numberOfSuites = 0;
    this.tests = [];
    this._activeSuites = [];
  }

  get numberOfTests() {
    return this.tests.length;
  }
  get numberOfSuites() {
    return this._numberOfSuites;
  }

  addUnit(description, testFunction, options = {}) {
    this.tests.push({description, testFunction, specs: [...this._activeSuites], timeout: options.timeout});
  }

  addSpec(description, specCallback) {
    this._activeSuites.push(description);
    specCallback();
    this._numberOfSuites++;
    this._activeSuites.pop();
  }

  withEachUnit(doWith) {
    this.tests.forEach(doWith);
  }
}

module.exports = UnitCollector;