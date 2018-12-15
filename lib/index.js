import { UnitCollector } from './unit-collector';

const unitCollector = new UnitCollector();
const it = (...args) => unitCollector.addUnit(...args);
const describe = (...args) => unitCollector.addSpec(...args);
const noop = () => {};
const xit = noop;
const xdescribe = noop;

const unit = it;
const spec = describe;
export {
  it, 
  describe,
  xit,
  xdescribe,
  unitCollector,
  unit,
  spec,
};