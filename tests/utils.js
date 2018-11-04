const noop = () => {};
const buildSpy = () => {
  const calledWith = [];
  const spy = (...args) => {
    spy.wasCalled = true;
    spy.callCount++;
    calledWith.push(args);
  };
  spy.wasCalled = false;
  spy.callCount = 0;
  const dumbDeepCompare = (what, args) => ''+what === ''+args;
  spy.calledWith = (what) =>
    calledWith.filter(args => dumbDeepCompare(what, args)).length > 0;
  return spy;
};

module.exports = { noop, buildSpy };