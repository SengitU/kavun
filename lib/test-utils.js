export const noop = () => {};
export const buildSpy = () => {
  const calledWith = [];
  const spy = (...args) => {
    spy.wasCalled = true;
    spy.callCount++;
    calledWith.push(args);
  };
  spy.data = {};
  spy.wasCalled = false;
  spy.callCount = 0;
  const dumbDeepCompare = (what, args) => ''+what === ''+args;
  spy.calledWith = (...what) =>
    calledWith.filter(args => dumbDeepCompare(what, args)).length > 0;
  spy.data.calledWith = calledWith;
  return spy;
};
