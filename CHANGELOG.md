# Ideas
- [ ] provide `it.only` and `describe.only` which add only those tests to the tests to run, really handy
- [ ] add a `--bail` option, which stops test execution after the first failure
- [ ] remove sinon by internal, simple spy, see #6
 
# Currently in the works

- [x] refactor test file loaders, so we can pass filter criteria as params
- [ ] pass test-file-name filter criteria as params (instead of hard-coding `.spec` as it is now)
- [x] provide `it` and `describe`, and use it at least internally everywhere
- [x] provide `xit` and `xdescribe`
- [x] move to pure `import` (using esm) to not need `require` and be browser compatible
- [x] remove the dependency on uuid, and fix the timetracking for each test (it used to use the same timer for multiple tests)
- [ ] write tenets for kavun
- [x] make the reporter configurable
- [ ] build a minimal reporter