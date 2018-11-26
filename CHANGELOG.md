# Ideas
- [ ] provide `it.only` and `describe.only` which add only those tests to the tests to run, really handy
- [ ] add a `--bail` option, which stops test execution after the first failure
- [ ] move `buildSpy()` into it's own npm module (maybe "kavun-spy")
- [ ] move tests inside lib directory, close to the source
- [ ] move the time tracking into the reporter, if the reporter wants to do anything fancy with the time, it needs to be in control and a test runner just runs tests does NOT measure or alike
- [ ] show a stacktrace that contains the failing test (currently its always just `runner.js`) (why? e.g. so it can be clicked on in IDEs) 
- [ ] write tenets for kavun (like: no unnecessary dependency, as fast as possible, )
 
# version 2.0
- [x] remove sinon by internal, simple spy, see #6
- [x] refactor test file loaders, so we can pass filter criteria as params
- [x] pass any number of file names of tests that shall be loaded 
- [x] provide `it` and `describe`, and use it at least internally everywhere
- [x] provide `xit` and `xdescribe`
- [x] move to pure `import` (using esm) to not need `require` and be browser compatible
- [x] remove the dependency on uuid, and fix the timetracking for each test (it used to use the same timer for multiple tests)
- [x] make the reporter configurable
- [x] build a minimal reporter
- [x] BUG: kavun was not installable anymore, fixed