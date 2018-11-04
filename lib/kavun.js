#!/usr/bin/env node

const uuidv4 = require("uuid/v4");
const { startTimer } = require("./utils/time-tracker");

const processId = uuidv4();
startTimer(processId);

const runner = require('./runner');
const { unitCollector } = require('./index');
const { loadPotentialTestFiles } = require('./file-loader');

const path = process.argv[2];
loadPotentialTestFiles(require, `${process.cwd()}/${path}`);
runner(unitCollector, processId);
