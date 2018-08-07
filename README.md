# Kavun

[![Build Status](https://travis-ci.org/SengitU/kavun.svg?branch=master)](https://travis-ci.org/SengitU/kavun)

Kavun is a light weight spec runner library for Javascript.

## The Real Kavun

The project is named after my elder cat Kavun.

![Kavun](kavun_tiny.jpg)

## Installation

`npm install kavun`

### Usage Examples

### Unit

A sync example for unit

```jskavun.jpg
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

unit('Example async unit with async / await', () => {
  const actual = () => new Promise(resolve => resolve(true));
  const expected = true;
  
  return actual().then(result => assert.equal(expected, result));
});
```

### Timeout

Timeout for each spec is 1500 miliseconds by default. To increase this amount, timeout attribute inside of the options object should be provided to the `unit`, as shown in the example;

```js
unit('Example unit with extended timeout', async () => {
  const actual = () => new Promise(resolve => setTimeout(() => resolve(true), 1700));
  const expected = true;

  const result = await actual();
  assert.equal(expected, result);
}, { timeout: 2000 });
```

### Spec

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

## Contribution

Project requires NodeJS version 9 to be installed

Install NodeJS 9 and then run following command to install dependencies;

`npm i`

Use following command to run the tests;

`npm test`

## Install/setup, via nix

The project can be built and run locally using nix, to reproduce the environment.
1) Make sure to have nix installed (see [nixos.org/nix][nix]) and then
1) `cd <project-dir>`
1) run `nix-shell` and you should have the environment up and running
1) install all node modules using `npm install`
1) prove that it works, `npm test`
1) now you have a shell with a deterministic environment (incl. node version)

[nix]: http://nixos.org/nix/
