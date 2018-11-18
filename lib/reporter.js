import { ConsoleReporter } from './reporters/console-reporter.js';

export const createReporter = (name) => {
  return new ConsoleReporter();
};