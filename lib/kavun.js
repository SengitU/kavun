#!/usr/bin/env node

import { join } from 'path';
import { startTimer } from './utils/time-tracker';
import { runner } from './runner';
import { unitCollector } from './index';
import { loadTestFiles } from './test-file-loader';
import { createReporter } from './reporter.js';

const DEFAULT_REPORTER_NAME = 'console';

const path = process.argv[2];
const reporterName = process.argv[3] || DEFAULT_REPORTER_NAME;

const config = { reporter: createReporter(reporterName) };
const stopTimer = startTimer();
loadTestFiles(require, join(process.cwd(), path));
runner(config, { unitCollector, stopTimer });
