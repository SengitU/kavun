#!/usr/bin/env node

import { join } from 'path';
import { startTimer } from './utils/time-tracker';
import { runner } from './runner';
import { unitCollector } from './index';
import { loadTestFiles } from './test-file-loader';
import { createReporter } from './reporter.js';

const path = process.argv[2];
const reporterName = process.argv[3] || 'console';

const config = { reporter: createReporter(reporterName) };
const stopTimer = startTimer();
loadTestFiles(require, join(process.cwd(), path));
runner(config, { unitCollector, stopTimer });
