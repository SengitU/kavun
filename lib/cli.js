#!/usr/bin/env node

const runner = require('./runner');
const { unitCollector } = require('./index');
const fileLoader = require('./file-loader');

const loader = fileLoader(require);
const path = process.argv[2];

if(path === undefined) {
  loader.load(`${process.cwd()}/tests`);
} else {
  loader.load(`${process.cwd()}/${path}`);
}

runner(unitCollector);
