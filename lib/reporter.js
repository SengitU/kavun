import { ConsoleReporter } from './reporters/console-reporter.js';
import { MinimalConsoleReporter } from './reporters/minimal-console.js';

export const createReporter = (name) => {
  if (name === 'minimal') return new MinimalConsoleReporter();
  return new ConsoleReporter();
};