class UnitCollector {
  constructor() {
    this._numberOfSpecs = 0;
    this.units = [];
    this._activeSpecs = [];
  }

  get numberOfUnits() {
    return this.units.length;
  }
  get numberOfSpecs() {
    return this._numberOfSpecs;
  }

  addUnit(description, testFunction, options = {}) {
    this.units.push({description, testFunction, specs: [...this._activeSpecs], timeout: options.timeout});
  }

  addSpec(description, specCallback) {
    this._activeSpecs.push(description);
    specCallback();
    this._numberOfSpecs++;
    this._activeSpecs.pop();
  }

  withEachUnit(doWith) {
    this.units.forEach(doWith);
  }
}

module.exports = UnitCollector;