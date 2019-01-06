# Kavun

[![Build Status](https://travis-ci.org/sengitu/kavun.svg?branch=master)](https://travis-ci.org/sengitu/kavun)

Kavun is a lightweight spec runner library for Javascript. See the [ADRs][adrs] and [tenets](#tenets) below for understanding what drives and steers this project.

[adrs]: ./docs/adr

## The Real Kavun

The project is named after my elder cat Kavun.

![](kavun_tiny.png)

## Installation

`npm install kavun`

### Usage Examples

* Run the tests just for one file do  
  `kavun test-files.spec.js`
* or multiple files   
  `kavun test1.spec.js 2.spec.js test/3.spec.js`
* or for all `.js` files (use you command line's file grep features, e.g. `*` or `**` etc.)  
  `kavun *.js`
* for all files found in root and up to 2 sub-directories, ending in `.js`  
  `kavun {,**,**/**}/*.js`
* and mix any of the above  
  `kavun test-files.spec.js {,**,**/**}/*.js`

Kavun does not contain any file-grep functionality. Use your command line's 
grep and/or file finding features. This was done to remove kavun's complexity.

### Parameters

The command line takes:
1) any number of files (no directories!) to run as parameters
1) `--reporter` which might be `console` or `minimal`

### Unit

A sync example for unit

```js
import assert from 'assert';
import { it } from 'kavun';

it('Example `it`', () => {
  const expected = 2;
  const actual = 2;
  assert.equal(actual, expected);
});
```

An async example with async/await

```js
import assert from 'assert';
import { it } from 'kavun';

it('Example async `it` with async / await', async () => {
  const actual = () => new Promise(resolve => resolve(true));
  const expected = true;
  const result = await actual();
  
  assert.equal(expected, result);
});
```

An async example with Promise, don't forget to return the `promise`

```js
import assert from 'assert';
import { it } from 'kavun';

it('Example async `it` with async / await', () => {
  const actual = () => new Promise(resolve => resolve(true));
  const expected = true;
  
  return actual().then(result => assert.equal(expected, result));
});
```

### Timeout

Timeout for each spec is 1500 miliseconds by default. To increase this amount, timeout attribute inside of the options object should be provided to the `unit`, as shown in the example;

```js
it('Example `it` with extended timeout', async () => {
  const actual = () => new Promise(resolve => setTimeout(() => resolve(true), 1700));
  const expected = true;

  const result = await actual();
  assert.equal(expected, result);
}, { timeout: 2000 });
```

### Spec

```js
import assert from 'assert';
import { describe, it } from 'kavun';

describe('Example Spec', () => {
  it('unit', () => {
    const expected = 2;
    const actual = 2;
    assert.equal(actual, expected);
  });

  describe('Async', () => {
    it('with async / await', async () => {
      const actual = () => new Promise(resolve => resolve(true));
      const expected = true;

      const result = await actual();

      assert.equal(expected, result)
    });
  });
});

```
## Tenets
1) In doubt solve it without a new dependency.
2) In doubt don't add a new feature, rather remove one.
3) Prefer speed.
4) Be compatible to mocha-style test libs, allowing well written tests overrules.

## Development

The following describes how to (help) develop this code.

## Setup and run

Project requires NodeJS to be installed.

- `cd <here>`
- (if you want a reproducable env using nix) run `nix-shell`
- `npm i` to install
- `npm test` to run all the tests
- develop ...

## Install/setup, via nix

The project can be built and run locally using nix, to reproduce the environment.
1) Make sure to have nix installed (see [nixos.org/nix][nix]) and then
1) `cd <project-dir>`
1) run `nix-shell` and you should have the environment up and running
1) install all node modules using `npm install`
1) prove that it works, `npm test`
1) now you have a shell with a deterministic environment (incl. node version)

[nix]: http://nixos.org/nix/

## Releasing

You want to know if you are ready to release a new version. 
Run `npm run releasable --silent`, this starts a script that checks the [CHANGELOG.md](./CHANGELOG.md), which
is your to-do list! What, to-do list? Yes. See below how and why?

To release a new version run `npm run release` (not `npm version`!), this will include the
checks described and do the release and versioning (read more below).

## Recommended Development Process

After all changes, before releasing, we always want to get some kind of list of what we did, a changelog.
Creating a changelog after building the next cool feature is quite tedious, even scripts that run
through commit messages (even when they have a certain format), is just not to the point, because
it starts from the code. Not from the user! Let's turn it around.

Just like in TDD, where I write first a test for what we are planning to code, I started to go one level
up and describe the user's feature first. I start writing things in the changelog, prefixed with the
github style checkboxes `[ ]` (for unchecked) and once I finished the thing I change it to `[x]`.

In the beginning this felt quite strange. But once I got used to it, 
the plan for the next version (see [Versioning](#versioning) below) had 
always been in the [CHANGELOG.md](./CHANGELOG.md) and I "just" had to work it off. Technical things, like
refactoring, etc. went into the commits, but never into the changelog, they naturally don't belong there
anyways. Meanwhile, the changelog lines even become my commit messages, once I really start or finish
building the feature. I tick the feature/task off in the changelog and one can even see in the commits
when a certain feature was done.

Here is the process in bullet points:
1) Write out all planned features, to-dos in the [CHANGELOG.md](./CHANGELOG.md)
1) Make each one line, and prefix this line with `[ ]`
1) The headline of this section, is the next (major) version number, e.g. `# v1.0.0`
1) (Every item, you plan for some future version put it either above the headline of the next version or in your issue tracker)
1) Work off one feature/to-do at a time
1) Tick off the line in the changelog and commit it
1) When all items are done release, using `npm run release`

Tip: If you write less features/to-dos per version, you can release more often, get faster feedback
and can stay focused. Don't overestimate your speed, add less features, and you will ship happier.

## Versioning

Semantic versioning looks nice on paper, but every change is essentially an external API change, if it is
for speed, compatibility or any other change that might be "invisible" (to tests). The browsers and many software vendors
have gone towards major-only versioning. Therefore I simplified the versioning process too, just use
major versions and provide a proper changelog, that a user can understand.
