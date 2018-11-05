#!/usr/bin/env node

import { join } from 'path';
import { startTimer } from './utils/time-tracker';
import { runner } from './runner';
import { unitCollector } from './index';
import { loadTestFiles } from './test-file-loader';

const path = process.argv[2];

const stopTimer = startTimer();
loadTestFiles(require, join(process.cwd(), path));
runner(unitCollector, stopTimer);
