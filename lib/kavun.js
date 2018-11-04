#!/usr/bin/env node

import uuidv4 from "uuid/v4";
import { startTimer } from "./utils/time-tracker";
import runner from './runner';
import { unitCollector } from './index';
import { loadTestFiles } from './test-file-loader';

const path = process.argv[2];

const processId = uuidv4();
startTimer(processId);
loadTestFiles(require, `${process.cwd()}/${path}`);
runner(unitCollector, processId);
