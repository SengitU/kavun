#!/usr/bin/env node

import { join } from 'path';
import { startTimer } from './utils/time-tracker';
import { runner } from './runner';
import { unitCollector } from './index';
import { loadTestFiles } from './test-file-loader';
import { reporter } from './reporters/console-reporter';

const path = process.argv[2];

const config = { reporter };
const stopTimer = startTimer();
loadTestFiles(require, join(process.cwd(), path));
runner(config, { unitCollector, stopTimer });
