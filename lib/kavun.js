#!/usr/bin/env node

import { join } from 'path';
import { startTimer } from './utils/time-tracker';
import { runner } from './runner';
import { unitCollector } from './index';
import { loadTestFiles } from './test-file-loader';
import { createReporter } from './reporter.js';

const DEFAULT_REPORTER_NAME = 'console';

import { default as parseArgs } from 'minimist';
const parsedArgs = parseArgs(process.argv.slice(2), {
  boolean: ['bail'], 
  alias: {R: 'reporter'}, 
  string: ['reporter'],
  default: {'reporter': DEFAULT_REPORTER_NAME}
});

const config = { reporter: createReporter(parsedArgs.reporter) };
const stopTimer = startTimer();
const fileNamesWithCompletePath = parsedArgs._.map(fileName => join(process.cwd(), fileName));
loadTestFiles(require, fileNamesWithCompletePath);
runner(config, { unitCollector, stopTimer });
