import { reporter as consoleReporter } from './reporters/console-reporter.js';

export const createReporter = (name) => {
  return consoleReporter;
};