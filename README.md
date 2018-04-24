# Kavun

[![Build Status](https://travis-ci.org/SengitU/kavun.svg?branch=master)](https://travis-ci.org/SengitU/kavun)

Kavun is a light weight spec runner library for Javascript.

### Usage Examples

#### Unit

A sync example for unit

```js
const assert = require('assert');
const { unit } = require('kavun');

unit('Example unit', () => {
  const expected = 2;
  const actual = 2;
  assert.equal(actual, expected);
});
```

An async example with async/await

```js
const assert = require('assert');
const { unit } = require('kavun');

unit('Example async unit with async / await', async () => {
  const actual = () => new Promise(resolve => resolve(true));
  const expected = true;
  const result = await actual();
  
  assert.equal(expected, result);
});
```

An async example with Promise, don't forget to return the `promise`

```js
const assert = require('assert');
const { unit } = require('kavun');

unit('Example async unit with async / await', async () => {
  const actual = () => new Promise(resolve => resolve(true));
  const expected = true;
  
  return actual().then(result => assert.equal(expected, result));
});
```

#### Spec

```js
const assert = require('assert');
const { spec, unit } = require('kavun');

spec('Example Spec', () => {
  unit('unit', () => {
    const expected = 2;
    const actual = 2;
    assert.equal(actual, expected);
  });

  spec('Async', () => {
    unit('with async / await', async () => {
      const actual = () => new Promise(resolve => resolve(true));
      const expected = true;

      const result = await actual();

      assert.equal(expected, result)
    });
  });
});

```

Npm registry will be added soon.

### Contribution

Project requires NodeJS version 9 to be installed

Install NodeJS 9 and then run following command to install dependencies;

`npm i`

Use following command to run the tests;

`npm test`

### Install/setup, via nix

The project can be built and run locally using nix, to reproduce the environment.
1) Make sure to have nix installed (see [nixos.org/nix][nix]) and then
1) `cd <project-dir>`
1) run `nix-shell` and you should have the environment up and running
1) install all node modules using `npm install`
1) prove that it works, `npm test`
1) now you have a shell with a deterministic environment (incl. node version)

[nix]: http://nixos.org/nix/
