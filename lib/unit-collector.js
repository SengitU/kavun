class UnitCollector {
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

module.exports = UnitCollector;